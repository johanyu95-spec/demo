"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTestStore } from "@/app/utils/useTestStore";
import permaData from "@/app/data/perma.json";
import StageHeader from "@/app/components/test/StageHeader";
import QuestionCard from "@/app/components/test/QuestionCard";
import { nextStageAfter } from "@/app/utils/flow";
import { computePermaScores } from "@/app/utils/perma";
import MatrixRain from "@/app/components/MatrixRain";

type Stage = "intro" | "permaTest" | "results";

type Question = {
  id: string;
  text: string;
  reverse_score?: boolean;
  options?: string[];
};

type PermaJson = Record<"P" | "E" | "S" | "M" | "A", Question[]>;

function flatten(obj: unknown): Question[] {
  if (Array.isArray(obj)) return obj as Question[];
  if (obj && typeof obj === "object")
    return Object.values(obj as Record<string, Question[]>).flat();
  return [];
}

// 현실 접속 단계
const steps = [
  "Access Contact",
  "Code authentication",
  "Connection command",
] as const;

export default function TestPage() {
  const router = useRouter();

  const {
    currentStage,
    currentIndex,
    setIndex,
    setStage,
    answers,
    saveAnswer,
    setResults,
  } = useTestStore();

  // ✅ 닉네임 확보 유틸 (세션 → 로컬 → 기본값)
  const nickname = useMemo(() => {
    try {
      const fromSession = sessionStorage.getItem("nickname");
      if (fromSession && fromSession.trim()) return fromSession.trim();
    } catch {}
    try {
      const fromLocal = localStorage.getItem("nickname");
      if (fromLocal && fromLocal.trim()) return fromLocal.trim();
    } catch {}
    return "anonymous";
  }, []);

  // 인트로 → 테스트 자동 진입
  useEffect(() => {
    if (currentStage === "intro") setStage("permaTest");
  }, [currentStage, setStage]);

  // PERMA 데이터 로드
  const bundle = useMemo(() => {
    if (currentStage === "permaTest")
      return { key: "perma", items: flatten(permaData as PermaJson) };
    return { key: null, items: [] };
  }, [currentStage]);

  const total = bundle.items.length;
  const q = bundle.items[currentIndex];
  const val =
    bundle.key && q?.id
      ? (answers[bundle.key]?.[q.id] as number | undefined)
      : undefined;

  // 다음 버튼 동작
  function onNext() {
    if (currentIndex < total - 1) return setIndex(currentIndex + 1);

    const next = nextStageAfter(currentStage as Stage);
    if (next === "results") {
      // ✅ 점수 계산
      const perma = computePermaScores(answers.perma || {});
      // ✅ 전역 결과 저장
      setResults({ perma, answersRaw: answers });

      // ✅ 코드 생성 (소문자)
      const codeStr = [
        perma.codes?.P,
        perma.codes?.E,
        perma.codes?.S,
        perma.codes?.M,
        perma.codes?.A,
      ]
        .join("")
        .toLowerCase();

      // ✅ 결과 페이지에서 안전하게 복구할 수 있도록 answers, nickname 스냅샷 백업
      try {
        sessionStorage.setItem("answers", JSON.stringify(answers ?? {}));
      } catch {}
      try {
        // 결과 페이지에서 session/local 둘 다 조회하므로 세션에도 저장
        if (nickname && nickname !== "anonymous") {
          sessionStorage.setItem("nickname", nickname);
        }
      } catch {}

      // ✅ nickname을 쿼리로도 함께 전달 (결과 페이지가 즉시 인식)
      router.push(
        `/result?code=${codeStr}&nickname=${encodeURIComponent(nickname)}`
      );
    } else {
      setStage(next as Stage);
    }
  }

  return (
    <main className="min-h-screen w-full overflow-y-auto bg-black font-mono crt-screen crt-flicker">
      {/* 매트릭스 배경 */}
      <MatrixRain />

      {/* CRT Layer */}
      <div className="crt-overlay" />
      <div className="scanlines" />
      <div className="crt-flicker-effect" />

      {/* 상단 상태 표시바 유지 */}
      <div className="absolute top-0 w-full z-20 p-3 backdrop-blur-sm">
        <StageHeader
          {...({ currentStage, currentIndex, total, steps } as any)}
        />
      </div>

      {/* 질문 중앙 고정 */}
      {q && (
        <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
          <QuestionCard
            question={q}
            value={val}
            onChange={(v: number) => {
              if (bundle.key) saveAnswer(bundle.key, q.id, v);
            }}
          />
        </div>
      )}

      {/* 버튼 하단 고정 */}
      <div className="absolute bottom-4 left-0 w-full px-5 z-10">
        <div className="flex justify-between gap-4">
          <button
            disabled={currentIndex === 0}
            onClick={() => setIndex(currentIndex - 1)}
          >
            이전
          </button>
          <button disabled={val === undefined || val === null} onClick={onNext}>
            {currentIndex === total - 1 ? "완료" : "다음"}
          </button>
        </div>
      </div>

      <style jsx>{`
        /* CRT 배경 */
        .crt-screen {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 15, 8, 0.7),
            rgba(0, 0, 0, 0.9)
          );
        }

        /* CRT Layer */
        .crt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 255, 140, 0.08) 1px,
            rgba(0, 255, 140, 0.08) 3px
          );
          z-index: 2;
          pointer-events: none;
        }

        .crt-flicker-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 255, 140, 0.02);
          animation: crt-flicker 0.15s infinite linear alternate;
          z-index: 3;
          pointer-events: none;
        }

        /* 버튼 */
        button {
          flex: 1;
          background: rgba(0, 12, 6, 0.6);
          border: 2px solid rgba(0, 255, 140, 0.4);
          color: #bbffdd;
          padding: 12px 18px;
          border-radius: 6px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.25s ease;
          font-weight: 600;
          text-shadow: 0 0 4px #00ffaa, 0 0 8px #00ff88;
        }

        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          border-color: rgba(0, 255, 140, 0.2);
        }

        button:not(:disabled):hover {
          border-color: rgba(0, 255, 140, 0.7);
          box-shadow: 0 0 20px rgba(0, 255, 120, 0.5);
          transform: scale(1.02);
        }

        @keyframes crt-flicker {
          0%,
          95%,
          97%,
          100% {
            opacity: 1;
          }
          96% {
            opacity: 0.98;
          }
          98% {
            opacity: 0.96;
          }
        }

        @media (max-width: 768px) {
          button {
            font-size: 12px;
            padding: 10px;
          }
        }
      `}</style>
    </main>
  );
}
