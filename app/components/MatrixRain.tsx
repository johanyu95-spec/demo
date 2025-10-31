// (수정완료) MatrixBackground.tsx - 검정 배경 + 네온그린 글자 애니메이션

"use client";
import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setup();
    window.addEventListener("resize", setup);

    const NEON = "#33FF66"; // 네온그린 유지
    const CHARS =
      "Que c'est d'elles seules que dépend tout le bien et le mal de cette vie. Au reste, l'âme peut avoir ses plaisirs à part. Mais pour ceux qui lui sont communs avec le corps, ils dépendent entièrement des passions : en sorte que les hommes qu'elles peuvent le plus émouvoir sont capables de goûter le plus de douceur en cette vie. Il est vrai qu'ils y peuvent aussi trouver le plus d'amertume lorsqu'ils ne les savent pas bien employer et que la fortune leur est contraire. Mais la sagesse est principalement utile en ce point, qu'elle enseigne à s'en rendre tellement maître et à les ménager avec tant d'adresse, que les maux qu'elles causent sont fort supportables, et même qu'on tire de la joie de tous.";

    const baseFont = Math.max(window.innerWidth / 26, 14);
    const layers = [
      { depth: 1, fontSize: baseFont * 0.9, speed: 0.24 },
      { depth: 2, fontSize: baseFont * 1.1, speed: 0.36 },
      { depth: 3, fontSize: baseFont * 1.35, speed: 0.5 },
    ];

    const dropsPerLayer = layers.map((layer) => {
      const cols = Math.floor(window.innerWidth / (layer.fontSize * 0.9));
      return Array(cols).fill(1);
    });

    let rafId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)"; // 잔상
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      layers.forEach((layer, li) => {
        ctx.font = `500 ${layer.fontSize}px monospace`; // 원래 두께로
        ctx.fillStyle = NEON;
        ctx.shadowColor = NEON;
        ctx.shadowBlur = 6 * layer.depth + 2; // 원래 그림자로

        dropsPerLayer[li].forEach((y, i) => {
          if (Math.random() > 0.66) {
            const t = CHARS[Math.floor(Math.random() * CHARS.length)];
            const x = i * layer.fontSize * 0.9;
            const jitter = (Math.random() - 0.5) * 0.8;
            ctx.fillText(t, x + jitter, y * layer.fontSize);
          }
          if (y * layer.fontSize > window.innerHeight && Math.random() > 0.97) {
            dropsPerLayer[li][i] = 0;
          }
          dropsPerLayer[li][i] += layer.speed * 0.72;
        });
      });
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "#000" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "normal",
        }}
      />

      {/* 중앙 필터 - 더 진한 비네팅 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0,0,0,0.1) 0%,
              rgba(0,0,0,0.5) 50%,
              rgba(0,0,0,0.9) 100%
            )
          `,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
