import React from "react";

interface ProgressBarProps {
  value?: number;
  max?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function CyberpunkProgressBar({
  value = 0,
  max = 100,
  showPercentage = false,
  showLabel = false,
  label = "PROGRESS",
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);

  return (
    <div className="cyberpunk-progress-container">
      {/* 터미널 스타일 라벨 영역 */}
      {showLabel && (
        <div className="cyberpunk-progress-label">
          <span className="terminal-bracket">[</span>
          <span className="terminal-text">{label}</span>
          <span className="terminal-bracket">]</span>
          {showPercentage && (
            <span className="cyberpunk-percentage">
              {displayValue.toString().padStart(3, "0")}%
            </span>
          )}
        </div>
      )}

      {/* 사이버펑크 진행바 컨테이너 */}
      <div className="cyberpunk-bar-container">
        {/* 터미널 배경 트랙 */}
        <div className="cyberpunk-track">
          {/* 네온 진행바 */}
          <div
            className={`cyberpunk-fill ${animated ? "cyberpunk-animated" : ""}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`터미널 ${label}: ${displayValue}%`}
          >
            {/* 사이버펑크 글로우 효과 */}
            <div className="cyberpunk-glow" />

            {/* 터미널 스캔 효과 */}
            {animated && <div className="cyberpunk-scan" />}
          </div>
        </div>
      </div>

      {/* 독립 퍼센티지 표시 */}
      {showPercentage && !showLabel && (
        <div className="cyberpunk-percentage-only">
          {displayValue.toString().padStart(3, "0")}%
        </div>
      )}

      <style jsx>{`
        /* ─────────────── 사이버펑크 터미널 진행바 메인 컨테이너 ─────────────── */
        .cyberpunk-progress-container {
          font-family: "Courier New", ui-monospace, SFMono-Regular, Menlo,
            monospace;
          color: #bbffdd;
          font-size: 12px;
          margin: 0;
          padding: 0;
          height: 40px;
          min-height: 40px;
          max-height: 40px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }

        /* ─────────────── 터미널 스타일 라벨 ─────────────── */
        .cyberpunk-progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          height: 16px;
          min-height: 16px;
          flex-shrink: 0;
        }

        /* 터미널 브래킷 스타일 (홈페이지와 동일) */
        .terminal-bracket {
          color: #a7ffd8;
          font-weight: 600;
          text-shadow: 0 0 3px #00ffaa, 0 0 8px #00ff88,
            0 0 20px rgba(0, 255, 100, 0.6), 2px 2px 3px #000000,
            -2px -2px 2px #000000, 2px -2px 2px #000000, -2px 2px 2px #000000;
        }

        /* 터미널 텍스트 스타일 (홈페이지와 동일) */
        .terminal-text {
          color: #bbffdd;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 0 3px #00ffaa, 0 0 8px #00ff88,
            0 0 20px rgba(0, 255, 100, 0.6), 2px 2px 3px #000000,
            -2px -2px 2px #000000, 2px -2px 2px #000000, -2px 2px 2px #000000;
        }

        /* 사이버펑크 퍼센티지 표시 (홈페이지 dim-note 스타일) */
        .cyberpunk-percentage,
        .cyberpunk-percentage-only {
          color: #a7ffd8;
          font-weight: 900;
          opacity: 0.9;
          text-shadow: 0 0 2px #00ffaa, 0 0 6px #00ff88, 1px 1px 2px #000000,
            -1px -1px 1px #000000;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .cyberpunk-percentage-only {
          text-align: center;
          margin-top: 2px;
          height: 14px;
          min-height: 14px;
          flex-shrink: 0;
        }

        /* ─────────────── 사이버펑크 진행바 메인 컨테이너 ─────────────── */
        .cyberpunk-bar-container {
          position: relative;
          width: 100%;
          height: 12px;
          min-height: 12px;
          max-height: 12px;
          flex-shrink: 0;
        }

        /* 터미널 스타일 진행바 트랙 */
        .cyberpunk-track {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(0, 12, 6, 0.8);
          border: 2px solid rgba(0, 255, 140, 0.4);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 255, 120, 0.15),
            inset 0 0 30px rgba(0, 60, 30, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(3px);
        }

        /* 사이버펑크 진행바 채움 */
        .cyberpunk-fill {
          position: relative;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(0, 68, 0, 0.9) 0%,
            rgba(0, 136, 0, 0.9) 50%,
            rgba(187, 255, 221, 0.9) 100%
          );
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(0, 255, 140, 0.3),
            inset 0 0 20px rgba(0, 90, 60, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.8);
        }

        /* 애니메이션이 활성화된 진행바 */
        .cyberpunk-fill.cyberpunk-animated {
          background: linear-gradient(
            90deg,
            rgba(0, 68, 0, 0.9) 0%,
            rgba(0, 102, 0, 0.9) 25%,
            rgba(0, 136, 0, 0.9) 50%,
            rgba(167, 255, 216, 0.9) 75%,
            rgba(187, 255, 221, 0.9) 100%
          );
          background-size: 200% 100%;
          animation: cyberpunk-shimmer 2s ease-in-out infinite;
        }

        /* 사이버펑크 글로우 효과 */
        .cyberpunk-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(187, 255, 221, 0.3) 0%,
            rgba(187, 255, 221, 0.1) 50%,
            rgba(187, 255, 221, 0.3) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* 터미널 스캔 효과 */
        .cyberpunk-scan {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(187, 255, 221, 0.6),
            transparent
          );
          animation: cyberpunk-scan 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 3;
        }

        /* ─────────────── 사이버펑크 애니메이션 ─────────────── */
        @keyframes cyberpunk-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes cyberpunk-scan {
          0% {
            left: -50%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: -50%;
          }
        }

        /* ─────────────── 반응형 디자인 (홈페이지 스타일 적용) ─────────────── */

        /* 태블릿 이상 */
        @media (min-width: 768px) {
          .cyberpunk-progress-container {
            font-size: 14px;
            height: 50px;
            min-height: 50px;
            max-height: 50px;
          }

          .cyberpunk-bar-container {
            height: 16px;
            min-height: 16px;
            max-height: 16px;
          }

          .cyberpunk-progress-label {
            margin-bottom: 6px;
            height: 20px;
            min-height: 20px;
          }

          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            font-size: 13px;
          }

          .cyberpunk-percentage-only {
            height: 16px;
            min-height: 16px;
          }

          .cyberpunk-track {
            border-radius: 6px;
          }

          .cyberpunk-fill {
            border-radius: 4px;
          }
        }

        /* 대형 화면 */
        @media (min-width: 1024px) {
          .cyberpunk-progress-container {
            font-size: 16px;
            height: 60px;
            min-height: 60px;
            max-height: 60px;
          }

          .cyberpunk-bar-container {
            height: 20px;
            min-height: 20px;
            max-height: 20px;
          }

          .cyberpunk-progress-label {
            height: 24px;
            min-height: 24px;
          }

          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            font-size: 15px;
          }

          .cyberpunk-percentage-only {
            height: 18px;
            min-height: 18px;
          }

          .cyberpunk-fill {
            box-shadow: 0 0 25px rgba(0, 255, 140, 0.4),
              inset 0 0 25px rgba(0, 90, 60, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.8);
          }

          .terminal-text {
            letter-spacing: 2px;
          }

          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            letter-spacing: 2px;
          }
        }

        /* 모바일 최적화 */
        @media (max-width: 767px) {
          .cyberpunk-progress-container {
            font-size: 11px;
            height: 35px;
            min-height: 35px;
            max-height: 35px;
          }

          .cyberpunk-bar-container {
            height: 10px;
            min-height: 10px;
            max-height: 10px;
          }

          .cyberpunk-progress-label {
            margin-bottom: 3px;
            height: 14px;
            min-height: 14px;
          }

          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            font-size: 10px;
          }

          .cyberpunk-percentage-only {
            height: 12px;
            min-height: 12px;
            margin-top: 1px;
          }

          .terminal-text {
            letter-spacing: 0.5px;
          }

          /* 모바일에서 애니메이션 간소화 */
          .cyberpunk-scan {
            animation-duration: 4s;
          }

          .cyberpunk-fill.cyberpunk-animated {
            animation-duration: 3s;
          }
        }

        /* 초소형 모바일 */
        @media (max-width: 360px) {
          .cyberpunk-progress-container {
            font-size: 10px;
            height: 30px;
            min-height: 30px;
            max-height: 30px;
          }

          .cyberpunk-bar-container {
            height: 8px;
            min-height: 8px;
            max-height: 8px;
          }

          .cyberpunk-progress-label {
            height: 12px;
            min-height: 12px;
            flex-direction: column;
            align-items: flex-start;
            gap: 1px;
            margin-bottom: 2px;
          }

          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            font-size: 9px;
          }

          .cyberpunk-percentage-only {
            height: 10px;
            min-height: 10px;
          }
        }

        /* 가로 모드 최적화 */
        @media (orientation: landscape) and (max-height: 600px) {
          .cyberpunk-progress-container {
            height: 25px;
            min-height: 25px;
            max-height: 25px;
            font-size: 10px;
          }

          .cyberpunk-bar-container {
            height: 8px;
            min-height: 8px;
            max-height: 8px;
          }

          .cyberpunk-progress-label {
            height: 10px;
            min-height: 10px;
            margin-bottom: 2px;
          }

          .cyberpunk-percentage-only {
            height: 8px;
            min-height: 8px;
          }
        }

        /* ─────────────── 접근성 및 사용자 설정 고려 ─────────────── */

        /* 고대비 모드 */
        @media (prefers-contrast: high) {
          .cyberpunk-track {
            border-width: 3px;
            border-color: #bbffdd;
            background: #000;
          }

          .cyberpunk-fill {
            background: #bbffdd;
            box-shadow: none;
          }

          .cyberpunk-glow {
            display: none;
          }

          .terminal-text,
          .terminal-bracket,
          .cyberpunk-percentage,
          .cyberpunk-percentage-only {
            text-shadow: none;
          }
        }

        /* 모션 감소 선호 */
        @media (prefers-reduced-motion: reduce) {
          .cyberpunk-fill {
            transition: width 0.3s ease;
          }

          .cyberpunk-fill.cyberpunk-animated {
            animation: none;
            background: linear-gradient(
              90deg,
              rgba(0, 68, 0, 0.9) 0%,
              rgba(0, 136, 0, 0.9) 50%,
              rgba(187, 255, 221, 0.9) 100%
            );
          }

          .cyberpunk-scan {
            animation: none;
            display: none;
          }
        }

        /* 다크 모드 최적화 */
        @media (prefers-color-scheme: dark) {
          .cyberpunk-track {
            background: rgba(0, 8, 4, 0.9);
            box-shadow: 0 0 35px rgba(0, 255, 120, 0.2),
              inset 0 0 35px rgba(0, 60, 30, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.8);
          }
        }

        /* 터치 디바이스 최적화 */
        @media (hover: none) and (pointer: coarse) {
          .cyberpunk-progress-container {
            /* 터치 디바이스에서는 호버 효과 없음 */
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
