// // src/components/prescription/PrescriptionHeader.tsx
// import React from "react";
// import Link from "next/link";

// type PrescriptionHeaderProps = {
//   code: string;
//   name?: string | null;
//   concept?: string | null;
// };

// /**
//  * 처방 페이지 상단 헤더
//  */
// export function PrescriptionHeader({
//   code,
//   name,
//   concept,
// }: PrescriptionHeaderProps) {
//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//       <div className="space-y-2">
//         <div className="inline-flex items-center gap-2">
//           <span className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-sm font-mono">
//             {code}
//           </span>
//           <h1 className="text-2xl font-bold">{name || "상세 결과"}</h1>
//         </div>
//         {concept && <div className="text-md text-gray-400">{concept}</div>}
//       </div>

//       <div className="flex items-center gap-2">
//         <Link
//           href="/test"
//           className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
//         >
//           목록으로
//         </Link>
//       </div>
//     </div>
//   );
// }
