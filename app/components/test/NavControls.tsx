// import React from "react";

// type NavControlsProps = {
//   canPrev: boolean;
//   canNext: boolean;
//   isLast: boolean;
//   onPrev: () => void;
//   onNext: () => void;
//   onFinish: () => void;
// };

// function NavControls({
//   canPrev,
//   canNext,
//   isLast,
//   onPrev,
//   onNext,
//   onFinish,
// }: NavControlsProps) {
//   return (
//     <div className="nav-controls-container">
//       {/* 이전 단계 버튼 */}
//       <button
//         type="button"
//         className="nav-button nav-button-prev"
//         onClick={onPrev}
//         disabled={!canPrev}
//         aria-label="이전 현실 인식 질문"
//       >
//         <span className="button-text">
//           <span className="button-bracket">[</span>
//           <span className="button-key">이전</span>
//           <span className="button-bracket">]</span>
//         </span>
//       </button>

//       {/* 다음 또는 완료 버튼 */}
//       {isLast ? (
//         <button
//           type="button"
//           className="nav-button nav-button-finish"
//           onClick={onFinish}
//           disabled={!canNext}
//           aria-label="현실 접속 완료"
//         >
//           <span className="button-text">
//             <span className="button-bracket">[</span>
//             <span className="button-key">완료</span>
//             <span className="button-bracket">]</span>
//           </span>
//         </button>
//       ) : (
//         <button
//           type="button"
//           className="nav-button nav-button-next"
//           onClick={onNext}
//           disabled={!canNext}
//           aria-label="다음 현실 인식 질문"
//         >
//           <span className="button-text">
//             <span className="button-bracket">[</span>
//             <span className="button-key">다음</span>
//             <span className="button-bracket">]</span>
//           </span>
//         </button>
//       )}

//       <style jsx>{`
//         /* 기본 컨테이너 */
//         .nav-controls-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 20px;
//           height: 60px;
//           min-height: 60px;
//           max-height: 60px;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         /* 버튼 기본 */
//         .nav-button {
//           background: none;
//           border: none;
//           color: #00ff00;
//           font-family: "Courier New", monospace;
//           font-weight: 700;
//           font-size: 16px;
//           letter-spacing: 2px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           width: 60px;
//           height: 50px;
//           min-width: 60px;
//           max-width: 60px;
//           min-height: 50px;
//           max-height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-shadow: 0 0 5px #00aa00, 0 0 10px #008800, 1px 1px 0px #000;
//         }

//         /* 텍스트 구조 */
//         .button-text {
//           display: inline-block;
//           font-size: 16px;
//           line-height: 1;
//         }

//         .button-bracket {
//           color: #00cccc;
//           font-size: 16px;
//         }

//         .button-key {
//           color: #ffff00;
//           font-weight: 900;
//           font-size: 18px;
//           text-shadow: 0 0 8px #ffff00, 0 0 15px #cccc00;
//         }

//         /* 버튼 상태 */
//         .nav-button:disabled {
//           color: #004400;
//           text-shadow: 0 0 2px #002200;
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .nav-button:hover:not(:disabled),
//         .nav-button:focus:not(:disabled) {
//           transform: scale(1.1);
//         }

//         /* 색상 변형 */
//         .nav-button-prev .button-key {
//           color: #00ffcc;
//           text-shadow: 0 0 6px #00ffcc, 0 0 12px #00ccaa;
//         }

//         .nav-button-next .button-key {
//           color: #ffff00;
//           text-shadow: 0 0 10px #ffff00, 0 0 20px #cccc00;
//         }

//         .nav-button-finish .button-key {
//           color: #ffaa00;
//           text-shadow: 0 0 12px #ffaa00, 0 0 24px #ff8800;
//         }

//         /* 태블릿 이상 - 세로 비율 3배 축소 */
//         @media (min-width: 768px) {
//           .nav-controls-container {
//             gap: 25px;
//             height: 20px;
//             min-height: 20px;
//             max-height: 20px;
//           }

//           .nav-button {
//             width: 70px;
//             height: 18px;
//             min-width: 70px;
//             max-width: 70px;
//             min-height: 18px;
//             max-height: 18px;
//           }

//           .button-text {
//             font-size: 14px;
//           }

//           .button-bracket {
//             font-size: 14px;
//           }

//           .button-key {
//             font-size: 16px;
//           }
//         }

//         /* 데스크톱 - 동일 비율 유지, 살짝 확대 */
//         @media (min-width: 1024px) {
//           .nav-controls-container {
//             gap: 30px;
//             height: 23px;
//             min-height: 23px;
//             max-height: 23px;
//           }

//           .nav-button {
//             width: 80px;
//             height: 20px;
//             min-width: 80px;
//             max-width: 80px;
//             min-height: 20px;
//             max-height: 20px;
//           }

//           .button-text {
//             font-size: 15px;
//           }

//           .button-bracket {
//             font-size: 15px;
//           }

//           .button-key {
//             font-size: 17px;
//           }
//         }

//         /* 모바일 (기본 유지) */
//         @media (max-width: 767px) {
//           .nav-controls-container {
//             gap: 15px;
//             height: 55px;
//             min-height: 55px;
//             max-height: 55px;
//           }

//           .nav-button {
//             width: 55px;
//             height: 45px;
//             min-width: 55px;
//             max-width: 55px;
//             min-height: 45px;
//             max-height: 45px;
//           }

//           .button-text {
//             font-size: 14px;
//           }

//           .button-bracket {
//             font-size: 14px;
//           }

//           .button-key {
//             font-size: 16px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default React.memo(NavControls);
