"use client";

import React from "react";

interface Question {
  id: string;
  text: string;
  options?: string[];
}

interface QuestionCardProps {
  question: Question;
  value?: number;
  onChange: (v: number) => void;
}

export default function CyberpunkQuestionCard({
  question,
  value,
  onChange,
}: QuestionCardProps) {
  if (!question) return null;

  // ✅ 5단계 슬라이더로 고정
  const options = [
    { value: 1, label: "전혀 그렇지 않다" },
    { value: 2, label: "그렇지 않다" },
    { value: 3, label: "보통이다" },
    { value: 4, label: "그렇다" },
    { value: 5, label: "매우 그렇다" },
  ];

  // 키보드 단축키 (1-5)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      const numKey = parseInt(key);

      // 1-5 키 처리
      if (numKey >= 1 && numKey <= 5) {
        const targetOption = options.find((opt) => opt.value === numKey);
        if (targetOption) {
          onChange(targetOption.value);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [options, onChange]);

  return (
    <div className="cyberpunk-question-card">
      {/* 고정 크기 질문 텍스트 영역 */}
      <div className="cyberpunk-question-content">
        <div className="question-text crt-text-strong">{question.text}</div>
      </div>

      {/* 고정 크기 선택지 영역 - 5단계 슬라이더 */}
      <div className="cyberpunk-options-container">
        <div className="slider-container">
          {/* 양끝 라벨 */}
          <div className="slider-labels">
            <div className="label-left crt-text-strong">전혀 그렇지 않다</div>
            <div className="label-right crt-text-strong">매우 그렇다</div>
          </div>

          <div className="slider-track">
            {/* 연결선 */}
            <div className="slider-line" />

            {/* 5단계 옵션 포인트들 */}
            {options.map((opt, index) => {
              const isSelected = value === opt.value;

              return (
                <div
                  key={opt.value}
                  className="slider-point-container"
                  style={{
                    left: `${(index / (options.length - 1)) * 100}%`,
                  }}
                >
                  <label
                    className={`slider-point ${isSelected ? "selected" : ""}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onChange(opt.value);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      className="slider-radio"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange(opt.value)}
                      aria-label={`${question.text} - 레벨 ${opt.value}: ${opt.label}`}
                    />

                    {/* 포인트 원형 */}
                    <div className="point-circle">
                      <div className="point-inner" />
                      <div className="point-glow" />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ─────────────── 사이버펑크 터미널 메인 카드 ─────────────── */
        .cyberpunk-question-card {
          font-family: "Courier New", ui-monospace, SFMono-Regular, Menlo,
            monospace;
          background: rgba(0, 12, 6, 0.6);
          border: 2px solid rgba(0, 255, 140, 0.4);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 0 30px rgba(0, 255, 120, 0.15),
            inset 0 0 30px rgba(0, 60, 30, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.6);
          color: #bbffdd;
          backdrop-filter: blur(6px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;

          /* ✅ 모바일 우선 반응형 크기 설정 */
          width: 90vw;
          max-width: 320px;
          height: 90vh;
          max-height: 320px;
          min-width: 280px;
          min-height: 280px;

          /* ✅ 중앙 정렬 - 일반적인 방법 */
          margin: 0 auto;
          position: relative;

          /* 홈페이지 스타일 애니메이션 */
          animation: crt-flicker 8s infinite;
        }

        /* ─────────────── 홈페이지 스타일 텍스트 클래스 ─────────────── */
        .crt-text-strong {
          color: #bbffdd !important;
          text-shadow: 0 0 3px #00ffaa, 0 0 8px #00ff88,
            0 0 20px rgba(0, 255, 100, 0.6), 2px 2px 3px #000000,
            -2px -2px 2px #000000, 2px -2px 2px #000000, -2px 2px 2px #000000;
          font-weight: 600;
        }

        .dim-note {
          color: #a7ffd8;
          opacity: 0.9;
          text-shadow: 0 0 2px #00ffaa, 0 0 6px #00ff88, 1px 1px 2px #000000,
            -1px -1px 1px #000000;
        }

        /* ─────────────── 고정 크기 질문 영역 ─────────────── */
        .cyberpunk-question-content {
          background: rgba(0, 12, 6, 0.4);
          border-radius: 4px;
          padding: 12px;
          border: 1px solid rgba(0, 255, 140, 0.2);
          backdrop-filter: blur(3px);
          margin-bottom: 12px;
          /* ✅ 헤더 제거로 늘어난 높이 - 기존 85px + 헤더 영역 57px = 142px */
          height: 142px;
          min-height: 142px;
          max-height: 142px;
          flex-shrink: 0;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .question-text {
          font-size: 12px;
          line-height: 1.4;
          text-align: center;
          font-weight: 600;
          word-break: keep-all;
          overflow-wrap: break-word;
          letter-spacing: 0.5px;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        /* ─────────────── 고정 크기 옵션 영역 ─────────────── */
        .cyberpunk-options-container {
          background: rgba(0, 12, 6, 0.4);
          border-radius: 4px;
          padding: 12px;
          border: 1px solid rgba(0, 255, 140, 0.2);
          backdrop-filter: blur(3px);
          /* ✅ 고정 높이 설정 - 남은 공간 모두 사용 */
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        /* ─────────────── 5단계 슬라이더 ─────────────── */
        .slider-container {
          padding: 0 8px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          /* 고정 높이 */
          height: 20px;
          min-height: 20px;
          flex-shrink: 0;
        }

        .label-left,
        .label-right {
          font-weight: 600;
          padding: 4px 6px;
          background: rgba(0, 12, 6, 0.4);
          border: 1px solid rgba(0, 255, 140, 0.2);
          border-radius: 4px;
          backdrop-filter: blur(3px);
          font-size: 9px;
          letter-spacing: 0.5px;
          /* 홈페이지 스타일 텍스트 */
          color: #bbffdd;
          text-shadow: 0 0 3px #00ffaa, 0 0 8px #00ff88,
            0 0 20px rgba(0, 255, 100, 0.6), 2px 2px 3px #000000,
            -2px -2px 2px #000000, 2px -2px 2px #000000, -2px 2px 2px #000000;
        }

        .slider-track {
          position: relative;
          /* ✅ 고정 높이 설정 */
          height: 50px;
          min-height: 50px;
          max-height: 50px;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .slider-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            rgba(255, 100, 100, 0.4) 0%,
            rgba(255, 165, 0, 0.4) 25%,
            rgba(255, 255, 0, 0.4) 50%,
            rgba(144, 238, 144, 0.4) 75%,
            rgba(0, 255, 140, 0.6) 100%
          );
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(0, 255, 140, 0.3);
          transform: translateY(-50%);
        }

        .slider-point-container {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .slider-point {
          position: relative;
          cursor: pointer;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          /* 터치 영역 확보 */
          min-width: 50px;
          min-height: 50px;
        }

        .slider-radio {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .point-circle {
          position: relative;
          width: 18px;
          height: 18px;
          background: rgba(0, 12, 6, 0.6);
          border: 2px solid rgba(0, 255, 140, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
          backdrop-filter: blur(3px);
          box-shadow: inset 0 0 15px rgba(0, 60, 30, 0.2);
        }

        .point-inner {
          width: 5px;
          height: 5px;
          background: rgba(0, 255, 140, 0.3);
          border-radius: 50%;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .point-glow {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(0, 255, 140, 0.2) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* ─────────────── 호버/포커스 효과 ─────────────── */
        .slider-point:hover .point-circle,
        .slider-point:focus .point-circle {
          border-color: rgba(0, 255, 140, 0.8);
          background: rgba(0, 12, 6, 0.8);
          box-shadow: 0 0 15px rgba(0, 200, 0, 0.6);
          transform: scale(1.1);
        }

        .slider-point:hover .point-glow,
        .slider-point:focus .point-glow {
          opacity: 1;
        }

        .slider-point:hover .point-inner,
        .slider-point:focus .point-inner {
          opacity: 0.8;
          background: rgba(0, 255, 140, 0.6);
        }

        /* ─────────────── 선택된 상태 ─────────────── */
        .slider-point.selected .point-circle {
          border-color: rgba(0, 255, 140, 1);
          background: rgba(0, 12, 6, 0.9);
          box-shadow: 0 0 25px rgba(0, 255, 0, 0.8),
            0 0 40px rgba(0, 200, 0, 0.4);
          transform: scale(1.2);
        }

        .slider-point.selected .point-inner {
          opacity: 1;
          background: #bbffdd;
          box-shadow: 0 0 15px #00ffaa;
          transform: scale(1.2);
        }

        .slider-point.selected .point-glow {
          opacity: 1;
        }

        /* ─────────────── 5단계별 색상 차별화 ─────────────── */
        .slider-point-container:nth-child(1) .point-circle {
          border-color: rgba(255, 100, 100, 0.6);
        }
        .slider-point-container:nth-child(1)
          .slider-point.selected
          .point-circle {
          border-color: rgba(255, 100, 100, 1);
          box-shadow: 0 0 25px rgba(255, 100, 100, 0.8);
        }

        .slider-point-container:nth-child(2) .point-circle {
          border-color: rgba(255, 165, 0, 0.6);
        }
        .slider-point-container:nth-child(2)
          .slider-point.selected
          .point-circle {
          border-color: rgba(255, 165, 0, 1);
          box-shadow: 0 0 25px rgba(255, 165, 0, 0.8);
        }

        .slider-point-container:nth-child(3) .point-circle {
          border-color: rgba(255, 255, 0, 0.6);
        }
        .slider-point-container:nth-child(3)
          .slider-point.selected
          .point-circle {
          border-color: rgba(255, 255, 0, 1);
          box-shadow: 0 0 25px rgba(255, 255, 0, 0.8);
        }

        .slider-point-container:nth-child(4) .point-circle {
          border-color: rgba(144, 238, 144, 0.6);
        }
        .slider-point-container:nth-child(4)
          .slider-point.selected
          .point-circle {
          border-color: rgba(144, 238, 144, 1);
          box-shadow: 0 0 25px rgba(144, 238, 144, 0.8);
        }

        .slider-point-container:nth-child(5) .point-circle {
          border-color: rgba(0, 255, 140, 0.6);
        }
        .slider-point-container:nth-child(5)
          .slider-point.selected
          .point-circle {
          border-color: rgba(0, 255, 140, 1);
          box-shadow: 0 0 25px rgba(0, 255, 140, 0.8);
        }

        /* ─────────────── CRT 애니메이션 (홈페이지 스타일) ─────────────── */
        @keyframes crt-flicker {
          0%,
          95%,
          97%,
          99%,
          100% {
            opacity: 1;
          }
          96% {
            opacity: 0.98;
          }
          98% {
            opacity: 0.97;
          }
        }

        @keyframes crt-flicker-slow {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        /* ─────────────── 스크롤바 스타일링 ─────────────── */
        .cyberpunk-question-content::-webkit-scrollbar {
          width: 4px;
        }

        .cyberpunk-question-content::-webkit-scrollbar-track {
          background: rgba(0, 12, 6, 0.3);
          border-radius: 2px;
        }

        .cyberpunk-question-content::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 140, 0.3);
          border-radius: 2px;
        }

        .cyberpunk-question-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 140, 0.5);
        }

        /* ─────────────── 반응형 디자인 (모바일 우선) ─────────────── */

        /* 태블릿 이상 */
        @media (min-width: 768px) {
          .cyberpunk-question-card {
            padding: 20px;
            border-radius: 12px;
            /* ✅ 태블릿 반응형 크기 */
            width: 80vw;
            max-width: 450px;
            height: 80vh;
            max-height: 400px;
            min-width: 400px;
            min-height: 350px;
          }

          .cyberpunk-question-content {
            height: 165px;
            min-height: 165px;
            max-height: 165px;
            padding: 15px;
            margin-bottom: 15px;
          }

          .question-text {
            font-size: 14px;
            line-height: 1.5;
          }

          .cyberpunk-options-container {
            padding: 15px;
          }

          .slider-container {
            padding: 0 15px;
          }

          .slider-track {
            height: 70px;
            min-height: 70px;
            max-height: 70px;
            margin-bottom: 15px;
          }

          .slider-labels {
            height: 25px;
            min-height: 25px;
            margin-bottom: 20px;
          }

          .label-left,
          .label-right {
            font-size: 10px;
            padding: 6px 8px;
          }

          .point-circle {
            width: 22px;
            height: 22px;
            border-width: 3px;
          }

          .point-inner {
            width: 7px;
            height: 7px;
          }

          .slider-point {
            min-width: 55px;
            min-height: 55px;
          }
        }

        /* 데스크톱 */
        @media (min-width: 1024px) {
          .cyberpunk-question-card {
            padding: 25px;
            /* ✅ 데스크톱 반응형 크기 */
            width: 70vw;
            max-width: 550px;
            height: 70vh;
            max-height: 480px;
            min-width: 500px;
            min-height: 420px;
          }

          .cyberpunk-question-content {
            height: 200px;
            min-height: 200px;
            max-height: 200px;
            padding: 20px;
            margin-bottom: 18px;
          }

          .question-text {
            font-size: 16px;
            letter-spacing: 1px;
          }

          .cyberpunk-options-container {
            padding: 20px;
          }

          .slider-container {
            padding: 0 25px;
          }

          .slider-track {
            height: 90px;
            min-height: 90px;
            max-height: 90px;
            margin-bottom: 20px;
          }

          .slider-labels {
            height: 30px;
            min-height: 30px;
            margin-bottom: 25px;
          }

          .label-left,
          .label-right {
            font-size: 11px;
            padding: 8px 10px;
            letter-spacing: 1px;
          }

          .point-circle {
            width: 26px;
            height: 26px;
            border-width: 3px;
          }

          .point-inner {
            width: 9px;
            height: 9px;
          }

          .slider-point {
            min-width: 60px;
            min-height: 60px;
          }
        }

        /* ─────────────── 초소형 모바일 (360px 이하) ─────────────── */
        @media (max-width: 360px) {
          .cyberpunk-question-card {
            padding: 12px;
            /* ✅ 초소형 모바일 반응형 크기 */
            width: 95vw;
            max-width: 290px;
            height: 85vh;
            max-height: 290px;
            min-width: 260px;
            min-height: 260px;
          }

          .cyberpunk-question-content {
            height: 127px;
            min-height: 127px;
            max-height: 127px;
            padding: 10px;
            margin-bottom: 10px;
          }

          .question-text {
            font-size: 11px;
            line-height: 1.3;
          }

          .cyberpunk-options-container {
            padding: 10px;
          }

          .slider-container {
            padding: 0 5px;
          }

          .slider-track {
            height: 45px;
            min-height: 45px;
            max-height: 45px;
            margin-bottom: 8px;
          }

          .slider-labels {
            height: 18px;
            min-height: 18px;
            margin-bottom: 12px;
          }

          .label-left,
          .label-right {
            font-size: 8px;
            padding: 3px 4px;
          }

          .point-circle {
            width: 16px;
            height: 16px;
          }

          .point-inner {
            width: 4px;
            height: 4px;
          }

          .slider-point {
            min-width: 45px;
            min-height: 45px;
          }
        }

        /* ─────────────── 가로 모드 최적화 ─────────────── */
        @media (orientation: landscape) and (max-height: 600px) {
          .cyberpunk-question-card {
            /* ✅ 가로 모드 반응형 크기 */
            width: 80vw;
            max-width: 400px;
            height: 90vh;
            max-height: 250px;
            min-width: 350px;
            min-height: 220px;
            padding: 10px;
          }

          .cyberpunk-question-content {
            height: 95px;
            min-height: 95px;
            max-height: 95px;
            padding: 8px;
            margin-bottom: 8px;
          }

          .question-text {
            font-size: 11px;
            line-height: 1.2;
          }

          .cyberpunk-options-container {
            padding: 8px;
          }

          .slider-track {
            height: 40px;
            min-height: 40px;
            max-height: 40px;
            margin-bottom: 5px;
          }

          .slider-labels {
            height: 15px;
            min-height: 15px;
            margin-bottom: 10px;
          }
        }

        /* ─────────────── 접근성 및 사용자 환경 설정 ─────────────── */
        @media (prefers-contrast: high) {
          .cyberpunk-question-card {
            border-width: 3px;
            border-color: #00ffaa;
            background: #000;
          }

          .cyberpunk-question-content,
          .cyberpunk-options-container {
            border-color: #00ffaa;
            background: rgba(0, 0, 0, 0.8);
          }

          .point-glow {
            display: none;
          }

          .crt-text-strong,
          .dim-note,
          .question-text,
          .label-left,
          .label-right {
            text-shadow: none;
          }

          .slider-point:focus {
            box-shadow: 0 0 0 3px #00ffbf;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .crt-flicker,
          .crt-flicker-slow {
            animation: none !important;
            opacity: 1 !important;
          }
        }

        /* ─────────────── 터치 디바이스 최적화 ─────────────── */
        @media (hover: none) and (pointer: coarse) {
          .slider-point {
            /* 터치 디바이스에서 충분한 터치 영역 확보 */
            min-width: 55px;
            min-height: 55px;
          }

          .slider-point:active .point-circle {
            transform: scale(0.9);
            background: rgba(0, 12, 6, 0.9);
          }

          .slider-point:active .point-inner {
            opacity: 1;
            background: rgba(0, 255, 140, 0.8);
          }

          /* 터치 하이라이트 제거 */
          .cyberpunk-question-card,
          .slider-point {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
