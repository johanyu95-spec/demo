// // src/components/prescription/PrescriptionLetter.tsx
// import React from "react";

// type PrescriptionLetterProps = {
//   dear?: string | null;
//   letter?: string | null;
// };

// /**
//  * 편지 머리말 + 본문 섹션
//  */
// export function PrescriptionLetter({ dear, letter }: PrescriptionLetterProps) {
//   return (
//     <section>
//       <div className="mb-3 text-sm font-semibold text-gray-300">편지</div>

//       <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm">
//         <div className="prose prose-invert max-w-none leading-relaxed space-y-4">
//           {/* 머리말 (dear) */}
//           {dear ? (
//             <p className="italic text-emerald-300">{dear}</p>
//           ) : (
//             <p className="text-gray-400 italic">-</p>
//           )}

//           {/* 본문 (letter) */}
//           {letter ? (
//             <p className="whitespace-pre-wrap">{letter}</p>
//           ) : (
//             <p className="text-gray-400">편지 내용이 없습니다.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
