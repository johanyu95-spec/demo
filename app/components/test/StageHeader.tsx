"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

interface StageHeaderProps {
  currentIndex: number;
  total: number;
  language?: string;
}

export default function StageHeader({
  currentIndex,
  total,
  language = "SYSTEM: KOR",
}: StageHeaderProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const pct = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  return (
    <header className="matrix-header">
      {/* 고정 CRT 텍스처 */}
      <div className="matrix-overlay" />

      {/* 상단 정보 */}
      <div className="header-content">
        <span className="matrix-lang">{language}</span>
        <span className="matrix-time">{time}</span>
      </div>

      {/* 네온 진행바 */}
      <div className="matrix-progress">
        <ProgressBar
          value={pct}
          showLabel={false}
          showPercentage={false}
          animated
        />
        <div className="matrix-percent">{pct.toString().padStart(3, "0")}%</div>
      </div>

      <style jsx>{`
        /* 모바일 우선 */
        .matrix-header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 20, 10, 0.85),
            rgba(0, 0, 0, 0.95)
          );
          border-bottom: 1px solid rgba(0, 255, 120, 0.4);
          box-shadow: 0 0 8px rgba(0, 255, 100, 0.15);
          overflow: hidden;
        }

        /* 정적인 CRT 텍스처 */
        .matrix-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 255, 100, 0.08) 1px,
            rgba(0, 255, 100, 0.08) 3px
          );
          pointer-events: none;
          z-index: 1;
        }

        .header-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          color: #00ff88;
          font-family: "Courier New", monospace;
          font-weight: 600;
          text-shadow: 0 0 4px #00ff99, 0 0 10px #00ff66;
          letter-spacing: 1px;
        }

        .matrix-lang {
          font-size: 11px;
          animation: flicker 2s infinite ease-in-out alternate;
        }

        .matrix-time {
          font-size: 12px;
          animation: pulse 1.8s infinite alternate;
        }

        .matrix-progress {
          position: relative;
          z-index: 2;
          padding: 0 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .matrix-percent {
          color: #00ff99;
          font-family: "Courier New", monospace;
          font-size: 11px;
          font-weight: 700;
          text-shadow: 0 0 8px #00ffaa, 0 0 15px #00ff66;
          margin-top: 4px;
          animation: flicker 1.6s infinite alternate;
        }

        /* 태블릿 이상 — 세로 비율 3배 축소 */
        @media (min-width: 768px) {
          .header-content {
            padding: 4px 20px;
          }

          .matrix-progress {
            padding: 0 20px 6px;
          }

          .matrix-lang {
            font-size: 9px;
          }

          .matrix-time {
            font-size: 10px;
          }

          .matrix-percent {
            font-size: 9px;
            margin-top: 2px;
          }
        }

        /* 네온 효과 애니메이션 */
        @keyframes flicker {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse {
          0% {
            text-shadow: 0 0 5px #00ff66, 0 0 10px #00ff33;
          }
          100% {
            text-shadow: 0 0 10px #00ffaa, 0 0 20px #00ff88;
          }
        }
      `}</style>
    </header>
  );
}
