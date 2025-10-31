// // src/components/prescription/Chips.tsx
// import React from "react";

// type ChipsProps = {
//   items?: string[];
// };

// /**
//  * 칩 리스트 (Pill 스타일)
//  */
// export function Chips({ items = [] }: ChipsProps) {
//   if (!items?.length) {
//     return <span className="text-gray-400">-</span>;
//   }

//   return (
//     <div className="flex flex-wrap gap-2">
//       {items.map((x, i) => (
//         <span
//           key={`${x}-${i}`}
//           className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm"
//         >
//           {x}
//         </span>
//       ))}
//     </div>
//   );
// }
