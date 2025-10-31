// src/app/utils/flow.ts

/** 가능한 스테이지 타입 정의 */
export type Stage = "intro" | "permaTest" | "unconsciousTest" | "results";

/**
 * 주어진 현재 단계(currentStage)에 따라 다음 단계를 반환합니다.
 * @param currentStage 현재 테스트 단계
 * @returns 다음 단계 문자열
 */
export function nextStageAfter(currentStage: Stage): Stage {
  switch (currentStage) {
    case "intro":
      return "permaTest";
    // case "permaTest":
    //   return "unconsciousTest";
    case "permaTest":
      return "results";
    // case "unconsciousTest":
    //   return "results";
    default:
      return "results";
  }
}
