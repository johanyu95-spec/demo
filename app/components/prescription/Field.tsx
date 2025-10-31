// // src/components/prescription/Field.tsx
// import React from "react";

// type FieldProps = {
//   label: string;
//   children: React.ReactNode;
//   muted?: boolean;
// };

// /**
//  * 라벨+내용 박스 (유리카드 스타일)
//  */
// export function Field({ label, children, muted = false }: FieldProps) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-sm">
//       <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
//         {label}
//       </div>
//       <div
//         className={`whitespace-pre-wrap leading-relaxed ${
//           muted ? "text-gray-400" : ""
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
