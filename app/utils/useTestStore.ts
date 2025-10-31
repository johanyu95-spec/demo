// // 새로고침해도 상태 유지 (sessionStorage 사용)
// "use client";

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// // 세션 스토리지에 저장될 키 (필요시 프로젝트 네임스페이스로 바꾸세요)
// export const STORAGE_KEY = "mx:psych:v1:state";

// // 스토어 타입(선택: TS일 때 유용)
// type Answers = {
//   perma: Record<string, unknown>;
//   unconscious: Record<string, unknown>;
// };

// type StoreState = {
//   currentStage: string;
//   currentIndex: number;
//   answers: Answers;
//   results: unknown;
//   // actions
//   setStage: (stage: string) => void;
//   setIndex: (i: number) => void;
//   saveAnswer: (stageKey: keyof Answers, qid: string, value: unknown) => void;
//   setResults: (res: unknown) => void;
//   resetAll: () => void;
//   clearStorage: () => void;
// };

// export const useTestStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       // ---- 상태 ----
//       currentStage: "intro",
//       currentIndex: 0,
//       answers: { perma: {}, unconscious: {} },
//       results: null,

//       // ---- 액션 ----
//       /**
//        * 스테이지 전환 시 현재 인덱스는 0으로 초기화
//        */
//       setStage: (stage) => set({ currentStage: stage, currentIndex: 0 }),

//       /**
//        * 현재 질문 인덱스 설정 (음수 방어)
//        */
//       setIndex: (i) => set({ currentIndex: Math.max(0, i) }),

//       /**
//        * 답안 저장
//        * - stageKey: "perma" | "unconscious"
//        * - qid: "a1" 같은 질문 ID
//        * - value: 사용자의 선택 값(숫자/문자 등)
//        */
//       saveAnswer: (stageKey, qid, value) =>
//         set((s) => ({
//           answers: {
//             ...s.answers,
//             [stageKey]: {
//               ...(s.answers[stageKey] || {}),
//               [qid]: value,
//             },
//           },
//         })),

//       /**
//        * 결과 객체 저장(서버 응답 등)
//        */
//       setResults: (res) => set({ results: res }),

//       /**
//        * 메모리 상태 초기화(스토리지에는 남아있음)
//        */
//       resetAll: () =>
//         set({
//           currentStage: "intro",
//           currentIndex: 0,
//           answers: { perma: {}, unconscious: {} },
//           results: null,
//         }),

//       /**
//        * 세션 스토리지까지 완전 초기화
//        * - 테스트 다시 시작할 때 깨끗한 상태가 필요하면 이걸 호출
//        */
//       clearStorage: () => {
//         if (typeof window !== "undefined") {
//           try {
//             sessionStorage.removeItem(STORAGE_KEY);
//           } catch {
//             // 브라우저 보안 정책/스토리지 오류 무시
//           }
//         }
//         set({
//           currentStage: "intro",
//           currentIndex: 0,
//           answers: { perma: {}, unconscious: {} },
//           results: null,
//         });
//       },
//     }),
//     {
//       name: STORAGE_KEY, // sessionStorage key
//       storage: createJSONStorage(() =>
//         typeof window !== "undefined" ? sessionStorage : ({} as Storage)
//       ),
//       /**
//        * 어떤 필드만 저장/복원할지 선택 (함수 제외)
//        * - 필요 없는 대용량/민감 정보는 제외 가능
//        */
//       partialize: (state) => ({
//         currentStage: state.currentStage,
//         currentIndex: state.currentIndex,
//         answers: state.answers,
//         results: state.results,
//       }),
//       version: 1,
//       migrate: (persisted, _version) => persisted,
//       /**
//        * 복원 시 훅(디버그용)
//        */
//       onRehydrateStorage: () => (state) => {
//         if (process.env.NODE_ENV !== "production") {
//           console.debug("[zustand] rehydrated:", state);
//         }
//       },
//     }
//   )
// );

// 새로고침해도 상태 유지 (sessionStorage 사용)
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 세션 스토리지에 저장될 키 (필요시 프로젝트 네임스페이스로 바꾸세요)
export const STORAGE_KEY = "mx:psych:v1:state";

/** ✅ 각 섹션(예: "perma", "unconscious") 안에서
 *    질문ID -> 점수(number) 형태로 저장되도록 타입을 변경합니다. */
type AnswerGroup = Record<string, number>;
export type Answers = Record<string, AnswerGroup>;

type StoreState = {
  currentStage: string;
  currentIndex: number;
  answers: Answers;
  results: unknown;
  // actions
  setStage: (stage: string) => void;
  setIndex: (i: number) => void;
  saveAnswer: (stageKey: string, qid: string, value: number) => void;
  setResults: (res: unknown) => void;
  resetAll: () => void;
  clearStorage: () => void;
};

export const useTestStore = create<StoreState>()(
  persist(
    (set) => ({
      // ---- 상태 ----
      currentStage: "intro",
      currentIndex: 0,
      // ✅ 유연한 레코드 타입을 쓰되 초기엔 익숙한 두 키를 마련
      answers: { perma: {}, unconscious: {} },
      results: null,

      // ---- 액션 ----
      /** 스테이지 전환 시 현재 인덱스는 0으로 초기화 */
      setStage: (stage) => set({ currentStage: stage, currentIndex: 0 }),

      /** 현재 질문 인덱스 설정 (음수 방어) */
      setIndex: (i) => set({ currentIndex: Math.max(0, i) }),

      /** ✅ 답안 저장: 숫자 값만 허용 (빌드/런타임 모두 일관성) */
      saveAnswer: (stageKey, qid, value) =>
        set((s) => ({
          answers: {
            ...s.answers,
            [stageKey]: {
              ...(s.answers[stageKey] ?? {}),
              [qid]: value, // number
            },
          },
        })),

      /** 결과 객체 저장(서버 응답 등) */
      setResults: (res) => set({ results: res }),

      /** 메모리 상태 초기화(스토리지에는 남아있음) */
      resetAll: () =>
        set({
          currentStage: "intro",
          currentIndex: 0,
          answers: { perma: {}, unconscious: {} },
          results: null,
        }),

      /** 세션 스토리지까지 완전 초기화 */
      clearStorage: () => {
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem(STORAGE_KEY);
          } catch {
            // 브라우저 보안 정책/스토리지 오류 무시
          }
        }
        set({
          currentStage: "intro",
          currentIndex: 0,
          answers: { perma: {}, unconscious: {} },
          results: null,
        });
      },
    }),
    {
      name: STORAGE_KEY, // sessionStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : ({} as Storage)
      ),
      /** 필요한 필드만 저장/복원 */
      partialize: (state) => ({
        currentStage: state.currentStage,
        currentIndex: state.currentIndex,
        answers: state.answers,
        results: state.results,
      }),
      version: 2, // ✅ 스키마 변경했으니 버전 올립니다.
      /** ✅ 이전에 unknown으로 저장되었을 가능성 대비: 숫자로 정규화 */
      migrate: (persisted, _version) => {
        if (!persisted) return persisted as any;
        const p = persisted as any;
        if (p?.answers && typeof p.answers === "object") {
          const fixed: Answers = {};
          for (const k of Object.keys(p.answers)) {
            const group = p.answers[k] ?? {};
            const next: AnswerGroup = {};
            for (const qid of Object.keys(group)) {
              const v = group[qid];
              // number로 캐스팅 가능하면 숫자로, 아니면 제거/0처리 선택
              const n = typeof v === "number" ? v : Number(v);
              if (Number.isFinite(n)) next[qid] = n;
            }
            fixed[k] = next;
          }
          p.answers = fixed;
        }
        return p;
      },
      /** 복원 시 훅(디버그용) */
      onRehydrateStorage: () => (state) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[zustand] rehydrated:", state);
        }
      },
    }
  )
);
