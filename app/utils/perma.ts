// src/app/utils/perma.ts (또는 .js)
// ---------------------------------------------------------
// PERMA 설문 점수 계산 유틸리티
// - Likert 1~5 점수 입력(일부 문항은 역채점)
// - 미응답 처리 정책(0/최소/중간/제외) 선택 가능
// - 영역별 합계, 코드화(P/E/S/M/A vs N/D/I/U/L), 전체 백분율 계산
// ---------------------------------------------------------

import permaData from "@/app/data/perma.json"; // ✅ 설문 문항이 들어있는 JSON을 가져옵니다.

// [양성/음성 코드 표기 규칙]
// - 각 PERMA 영역에 대해 "긍정"일 때와 "부정"일 때의 코드를 명시합니다.
export const CODE_POS = { P: "P", E: "E", S: "S", M: "M", A: "A" } as const;
export const CODE_NEG = { P: "N", E: "D", S: "I", M: "U", A: "L" } as const;

/**
 * 🔧 데이터 안전화(sanitizing)
 * - 입력 JSON(permaData) 중 S 영역의 7번 문항(S7)은 무조건 reverse=false로 고정합니다.
 * - 이유: 데이터 소스에서 역채점 플래그가 잘못 들어오는 경우가 있어 의도치 않은 계산을 방지합니다.
 */
const permaSafe = {
  ...permaData,
  S: (permaData.S || []).map((q: any) =>
    q?.id === "S7" ? { ...q, reverse_score: false } : q
  ),
};

// TypeScript에서 사용할 키 타입("P" | "E" | "S" | "M" | "A")
type PermaKey = keyof typeof permaSafe;

/**
 * 영역별 "합격선" 같은 중간값(MIDPOINT)
 * - 합계가 이 값 이상이면 긍정 코드(CODE_POS), 미만이면 부정 코드(CODE_NEG)를 부여합니다.
 * - 예: P 영역은 2문항이므로 최소 2, 최대 10점. 여기서 6점을 기준(2~5 = 부정, 6~10 = 긍정)
 * - S 영역은 문항 수가 많아 기준이 18점(7~17 = 부정, 18~35 = 긍정)
 */
const GROUP_MIDPOINT: Record<PermaKey, number> = {
  P: 6, // 2문항 * 3(중간값) = 6
  E: 6,
  S: 18, // 7문항 * 3 = 21이 일반적이지만, 기존 로직 유지를 위해 18을 사용
  M: 6,
  A: 6,
};

/**
 * 1~5 Likert 점수 유효성 보정
 * - 설문에서 숫자가 아닌 값이 들어오거나 범위를 벗어나면 안전하게 1~5로 맞춥니다.
 * - NaN이면 NaN을 반환해 이후 로직에서 "미응답"으로 처리할 수 있게 합니다.
 */
function normalizeLikert(n: unknown) {
  const num = Number(n);
  if (!Number.isFinite(num)) return NaN;
  if (num < 1) return 1;
  if (num > 5) return 5;
  return num;
}

/**
 * 역채점(reverse scoring)
 * - reverse=true면 실제 점수 = (6 - 원점수)
 *   예) 1↔5, 2↔4, 3↔3 로 뒤집힘
 * - reverse=false면 원점수 그대로 사용
 */
function scoredValue(raw: unknown, reverse?: boolean) {
  const v = normalizeLikert(raw);
  if (Number.isNaN(v)) return NaN; // 미응답/이상치
  return reverse ? 6 - v : v;
}

/**
 * 미응답 처리 정책
 * - "zero": 미응답은 0점으로 계산(합계만 올바르게 맞출 때)
 * - "min" : 미응답을 최소점 1점으로 처리(보수적 가중)
 * - "mid" : 미응답을 중간점 3점으로 처리(중립 가중)
 * - "skip": 미응답을 아예 제외(기본값, answered 개수에만 반영)
 */
type MissingPolicy = "zero" | "min" | "mid" | "skip";

/**
 * 특정 영역의 문항 배열을 순회하며 합계(sum)와 실제 응답 수(answered)를 계산합니다.
 * - 역채점/미응답 정책을 모두 반영합니다.
 */
function sumLikertByQuestions(
  answersObj: Record<string, unknown> | undefined,
  questions: Array<{ id: string; reverse_score?: boolean }>,
  missing: MissingPolicy
) {
  let sum = 0;
  let answered = 0;

  for (const q of questions) {
    const raw = answersObj?.[q.id]; // 사용자가 해당 문항에 기록한 응답값
    const val = scoredValue(raw, q.reverse_score === true);

    if (Number.isNaN(val)) {
      // 미응답/이상치 처리
      if (missing === "zero") {
        sum += 0;
      } else if (missing === "min") {
        sum += 1;
      } else if (missing === "mid") {
        sum += 3;
      } else if (missing === "skip") {
        // 'skip'이면 합계에 포함하지 않고 그냥 건너뜁니다.
        continue;
      }
      // 'skip'이 아닌 경우에는 answered 증가 X (실제 응답이 아니므로)
    } else {
      sum += val;
      answered += 1; // 실제로 응답한 문항 개수
    }
  }

  return { sum, answered };
}

/**
 * 동적 백분율(0~100) 계산
 * - answeredCount(실제 응답 문항 수)를 기준으로 최소/최대 가능한 점수를 잡고 그 사이에서의 상대 위치를 퍼센트로 환산합니다.
 *   * min = 1 * answeredCount
 *   * max = 5 * answeredCount
 * - 예) 4문항 응답했다면 최소 4점, 최대 20점 사이에서 현재 total이 어느 위치인지 계산
 */
function toPercent(total: number, answeredCount: number) {
  const min = 1 * answeredCount;
  const max = 5 * answeredCount;
  if (answeredCount <= 0) return 0; // 응답이 전혀 없으면 0%
  const raw = ((total - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, Math.round(raw))); // 0~100 범위로 클램프
}

/**
 * PERMA 점수 계산의 메인 함수
 * @param answersPerma - { [문항ID]: 점수 } 형태의 응답 객체
 * @param missing - 미응답 처리 정책("skip" | "zero" | "min" | "mid"), 기본은 "skip"
 * @returns {
 *   sums: 각 영역별 합계,
 *   codes: 각 영역의 코드(P/E/S/M/A 또는 N/D/I/U/L),
 *   total: 전체 합계,
 *   percent: 응답된 문항 기준 백분율(0~100),
 *   answered: 각 영역별 실제 응답 문항 수
 * }
 */
export function computePermaScores(
  answersPerma: Record<string, unknown> | undefined,
  missing: MissingPolicy = "skip" // ✅ 기본값: 미응답 제외
) {
  // 영역별 문항 배열 준비(역채점/데이터 안전화가 반영된 permaSafe 사용)
  const groups: Record<PermaKey, any[]> = {
    P: permaSafe.P,
    E: permaSafe.E,
    S: permaSafe.S,
    M: permaSafe.M,
    A: permaSafe.A,
  };

  // 영역별 합계와 응답수 초기화
  const sums: Record<PermaKey, number> = { P: 0, E: 0, S: 0, M: 0, A: 0 };
  const answered: Record<PermaKey, number> = { P: 0, E: 0, S: 0, M: 0, A: 0 };

  // 각 영역(P/E/S/M/A)을 돌며 합계와 응답수를 계산
  for (const k of Object.keys(groups) as PermaKey[]) {
    const { sum, answered: a } = sumLikertByQuestions(
      answersPerma,
      groups[k],
      missing
    );
    sums[k] = sum;
    answered[k] = a;
  }

  /**
   * 영역별 코드 부여
   * - 주의: 미응답이 많으면 합계가 낮게 나올 수 있으나, "기준값(GROUP_MIDPOINT)"은 고정된 절대값입니다.
   * - 따라서 응답이 적을수록 코드가 보수적으로(부정으로) 기울 수 있습니다.
   * - 이 동작은 "기존 로직 유지" 목적이며, 필요시 answered 비율을 반영하는 다른 전략으로 바꿀 수 있습니다.
   */
  const codes: Record<PermaKey, string> = { P: "", E: "", S: "", M: "", A: "" };
  for (const k of Object.keys(sums) as PermaKey[]) {
    codes[k] = sums[k] >= GROUP_MIDPOINT[k] ? CODE_POS[k] : CODE_NEG[k];
  }

  // 전체 합계(total)와 전체 응답수(answeredTotal)
  const total = (Object.values(sums) as number[]).reduce((a, b) => a + b, 0);
  const answeredTotal = (Object.values(answered) as number[]).reduce(
    (a, b) => a + b,
    0
  );

  // ✅ 실제 응답된 문항 수를 기준으로 백분위(percent) 계산
  const percent = toPercent(total, answeredTotal);

  return { sums, codes, total, percent, answered };
}
