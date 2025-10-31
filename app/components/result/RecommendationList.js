// // src/app/components/RecommendationList.jsx
// "use client";
// import React, { useEffect, useMemo, useState } from "react";

// export default function RecommendationList({
//   items = [], // ✅ 기본값 빈 배열
//   defaultSelectedId,
//   onSelect,
//   showDetail = true,
//   renderDetail,
//   selectable = true,
// }) {
//   // ✅ 항상 훅을 호출 (조건문 밖에서)
//   const computedDefaultId = useMemo(
//     () => defaultSelectedId ?? items[0]?.id,
//     [defaultSelectedId, items]
//   );

//   const [selectedId, setSelectedId] = useState(computedDefaultId);

//   useEffect(() => {
//     setSelectedId(computedDefaultId);
//   }, [computedDefaultId]);

//   const selectedItem = useMemo(
//     () => items.find((it) => it.id === selectedId),
//     [items, selectedId]
//   );

//   const handleSelect = (id) => {
//     if (!selectable) return;
//     setSelectedId(id);
//     onSelect?.(id);
//   };

//   // ✅ 여기서 렌더링을 조건부로 막음 (Hook은 이미 다 호출된 상태)
//   if (!items.length) {
//     return <div className="text-gray-400 text-sm">추천 데이터가 없습니다.</div>;
//   }

//   return (
//     <div className="mt-6 space-y-6">
//       {/* 카드 리스트 */}
//       <div
//         className="grid md:grid-cols-3 gap-4"
//         role={selectable ? "tablist" : undefined}
//       >
//         {items.map((it) => {
//           const isSelected = selectable && it.id === selectedId;
//           return (
//             <button
//               key={it.id}
//               type="button"
//               role={selectable ? "tab" : undefined}
//               aria-selected={isSelected}
//               onClick={() => handleSelect(it.id)}
//               className={[
//                 "text-left rounded-2xl p-5 border transition-all",
//                 "bg-black/40 border-emerald-500/30 text-gray-100",
//                 selectable
//                   ? "hover:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
//                   : "cursor-default",
//                 isSelected
//                   ? "border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
//                   : "",
//               ].join(" ")}
//             >
//               <div className="text-2xl">{it.emoji}</div>
//               <div className="mt-2 font-semibold">{it.name}</div>
//               <div className="text-sm text-gray-400">{it.subtitle}</div>
//               <div className="mt-3 text-emerald-300">{it.tagline}</div>
//               <div className="mt-2 text-sm text-gray-300">
//                 {/* {it.type} · {it.duration} · {it.location} */}
//                 {it.type} · {it.location}
//               </div>
//               <div className="mt-2 text-xs text-gray-400">
//                 주요 활동: {it.mainActivities?.join(", ")}
//               </div>
//               {/* <div className="mt-1 text-xs text-gray-400">
//                 적합: {it.suitable} · 비용: {it.cost}
//               </div> */}
//               {isSelected && selectable && (
//                 <div className="mt-3 inline-flex items-center gap-2 text-emerald-300 text-xs">
//                   <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                   선택됨
//                 </div>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* 상세 영역 */}
//       {showDetail && selectedItem && (
//         <div className="rounded-2xl border border-emerald-500/40 bg-black/50 p-6">
//           {renderDetail ? (
//             renderDetail(selectedItem)
//           ) : (
//             <DefaultDetail item={selectedItem} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// function DefaultDetail({ item }) {
//   return (
//     <div className="text-sm">
//       <div className="flex items-start gap-4">
//         <div className="text-4xl">{item.emoji}</div>
//         <div>
//           <div className="text-emerald-300 font-semibold text-lg">
//             {item.type}
//           </div>
//           <div className="text-gray-400">
//             {item.duration} · {item.location} · {item.cost}
//           </div>
//           {item.tagline && (
//             <div className="mt-2 text-emerald-200">{item.tagline}</div>
//           )}
//         </div>
//       </div>

//       {item.focus?.length > 0 && (
//         <div className="mt-4">
//           <div className="text-gray-300 mb-2">목표</div>
//           <div className="flex flex-wrap gap-2">
//             {item.focus.map((f, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-200 bg-emerald-500/10"
//               >
//                 {f}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {item.mainActivities?.length > 0 && (
//         <div className="mt-4">
//           <div className="text-gray-300 mb-2">주요 활동</div>
//           <ul className="grid sm:grid-cols-2 gap-2 text-gray-200">
//             {item.mainActivities.map((act, i) => (
//               <li
//                 key={i}
//                 className="rounded-lg border border-emerald-500/30 bg-black/40 px-3 py-2"
//               >
//                 {act}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <p className="mt-6 text-xs text-red-300/90">
//         ※ 본 결과는 참고용이며, 증상이 지속되면 전문가 상담을 권장합니다.
//       </p>
//     </div>
//   );
// }
