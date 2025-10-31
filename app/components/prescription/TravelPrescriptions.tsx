// "use client";

// import React, { useState } from "react";
// import { TravelPrescriptionCard } from "./TravelPrescriptionCard";

// type TravelPrescriptionsProps = {
//   challengeConcept?: string | null;
//   challengeKeyword?: string | null;
//   challengeActivity?: string | null;
//   maintainConcept?: string | null;
//   maintainKeyword?: string | null;
//   maintainActivity?: string | null;
//   reconcileConcept?: string | null;
//   reconcileKeyword?: string | null;
//   reconcileActivity?: string | null;
// };

// type TabType = "challenge" | "maintain" | "reconcile";

// const tabs = [
//   { id: "challenge" as TabType, emoji: "🏔️", label: "도전 여행 처방" },
//   { id: "maintain" as TabType, emoji: "🌲", label: "유지 여행 처방" },
//   { id: "reconcile" as TabType, emoji: "🌅", label: "화해 여행 처방" },
// ];

// /**
//  * 도전/유지/화해 탭 전환 UI
//  */
// export function TravelPrescriptions({
//   challengeConcept,
//   challengeKeyword,
//   challengeActivity,
//   maintainConcept,
//   maintainKeyword,
//   maintainActivity,
//   reconcileConcept,
//   reconcileKeyword,
//   reconcileActivity,
// }: TravelPrescriptionsProps) {
//   const [activeTab, setActiveTab] = useState<TabType>("challenge");

//   const getTabData = (tab: TabType) => {
//     switch (tab) {
//       case "challenge":
//         return {
//           concept: challengeConcept,
//           keyword: challengeKeyword,
//           activity: challengeActivity,
//           borderColor: "border-emerald-400/20",
//           bgColor: "bg-emerald-500/5",
//         };
//       case "maintain":
//         return {
//           concept: maintainConcept,
//           keyword: maintainKeyword,
//           activity: maintainActivity,
//           borderColor: "border-cyan-400/20",
//           bgColor: "bg-cyan-500/5",
//         };
//       case "reconcile":
//         return {
//           concept: reconcileConcept,
//           keyword: reconcileKeyword,
//           activity: reconcileActivity,
//           borderColor: "border-amber-400/20",
//           bgColor: "bg-amber-500/5",
//         };
//     }
//   };

//   const currentTab = tabs.find((t) => t.id === activeTab)!;
//   const currentData = getTabData(activeTab);

//   return (
//     <section className="space-y-6">
//       {/* 탭 헤더 */}
//       <div className="flex items-center justify-center gap-2 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`
//               flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium
//               transition-all duration-200 whitespace-nowrap
//               ${
//                 activeTab === tab.id
//                   ? "bg-white/10 border border-white/20 shadow-lg"
//                   : "bg-white/5 border border-white/10 hover:bg-white/10"
//               }
//             `}
//           >
//             <span className="text-lg">{tab.emoji}</span>
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* 선택된 탭 콘텐츠 */}
//       <div className="max-w-2xl mx-auto">
//         <TravelPrescriptionCard
//           emoji={currentTab.emoji}
//           title={currentTab.label}
//           concept={currentData.concept}
//           keyword={currentData.keyword}
//           activity={currentData.activity}
//           borderColor={currentData.borderColor}
//           bgColor={currentData.bgColor}
//         />
//       </div>
//     </section>
//   );
// }
