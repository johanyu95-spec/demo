// // src/components/prescription/TravelPrescriptionCard.tsx
// import React from "react";
// import { Field } from "./Field";
// import { Chips } from "./Chips";
// import { toList } from "@/app/utils/string";

// type TravelPrescriptionCardProps = {
//   emoji: string;
//   title: string;
//   concept?: string | null;
//   keyword?: string | null;
//   activity?: string | null;
//   borderColor: string;
//   bgColor: string;
// };

// /**
//  * 여행 처방 카드 (도전/유지/화해)
//  */
// export function TravelPrescriptionCard({
//   emoji,
//   title,
//   concept,
//   keyword,
//   activity,
//   borderColor,
//   bgColor,
// }: TravelPrescriptionCardProps) {
//   return (
//     <div
//       className={`rounded-2xl border ${borderColor} ${bgColor} p-5 space-y-4`}
//     >
//       <div className="flex items-center gap-2">
//         <span className="text-lg">{emoji}</span>
//         <h2 className="text-lg font-semibold">{title}</h2>
//       </div>

//       <Field label="컨셉" muted={!concept}>
//         {concept || "-"}
//       </Field>

//       <Field label="여행지 키워드">
//         <Chips items={toList(keyword)} />
//       </Field>

//       <Field label="활동 키워드">
//         <Chips items={toList(activity)} />
//       </Field>
//     </div>
//   );
// }
