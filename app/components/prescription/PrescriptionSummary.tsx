// // src/components/prescription/PrescriptionSummary.tsx
// import React from "react";
// import { Field } from "./Field";
// import { Chips } from "./Chips";
// import { toList } from "@/app/utils/string";

// type PrescriptionSummaryProps = {
//   //   dear?: string | null;
//   //   diagnosis?: string | null;
//   movie?: string | null;
//   book?: string | null;
// };

// /**
//  * 핵심 요약 카드: 편지 헤더 / 진단 / 추천 미디어
//  */
// export function PrescriptionSummary({
//   //   dear,
//   //   diagnosis,
//   movie,
//   book,
// }: PrescriptionSummaryProps) {
//   const movies = toList(movie);
//   const books = toList(book);

//   return (
//     <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* <Field label="편지 머리말">{dear || "-"}</Field>

//       <Field label="치료적 진단 / 설명">{diagnosis || "-"}</Field> */}

//       <Field label="추천 미디어">
//         <div className="space-y-3">
//           <div>
//             <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
//               영화
//             </div>
//             <Chips items={movies} />
//           </div>
//           <div>
//             <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
//               도서
//             </div>
//             <Chips items={books} />
//           </div>
//         </div>
//       </Field>
//     </section>
//   );
// }
