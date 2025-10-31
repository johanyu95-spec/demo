// // src/app/components/DiagnosisCard.jsx
// "use client";
// import React from "react";

// export default function DiagnosisCard({ code, name, desc }) {
//   if (!code) return null;

//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-xs uppercase tracking-widest opacity-70">
//           PESMA Code
//         </span>
//         <span className="text-sm font-mono bg-black/30 px-2 py-1 rounded">
//           {code}
//         </span>
//       </div>

//       <h2 className="text-xl md:text-2xl font-bold mb-3">{name}</h2>
//       <p className="text-sm md:text-base leading-relaxed opacity-90">{desc}</p>
//     </div>
//   );
// }
