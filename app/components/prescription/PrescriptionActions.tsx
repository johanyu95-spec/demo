// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// type PrescriptionActionsProps = {
//   code: string;
// };

// /**
//  * 코멘트 입력 및 저장/다시하기 버튼
//  */
// export function PrescriptionActions({ code }: PrescriptionActionsProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const resultId = searchParams.get("id"); // URL에서 결과 ID 가져오기

//   const [comment, setComment] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [loadingExisting, setLoadingExisting] = useState(true);

//   // 기존 코멘트 불러오기
//   useEffect(() => {
//     const loadComment = async () => {
//       if (!resultId) {
//         setLoadingExisting(false);
//         return;
//       }

//       try {
//         const res = await fetch(`/api/results/${resultId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (data.comment) {
//             setComment(data.comment);
//           }
//         }
//       } catch (error) {
//         console.error("코멘트 불러오기 오류:", error);
//       } finally {
//         setLoadingExisting(false);
//       }
//     };

//     loadComment();
//   }, [resultId]);

//   // 저장 핸들러
//   const handleSave = async () => {
//     if (!resultId) {
//       alert("결과 ID가 없습니다. 테스트를 다시 진행해주세요.");
//       return;
//     }

//     if (!comment.trim()) {
//       alert("코멘트를 입력해주세요.");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const res = await fetch(`/api/results/${resultId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ comment }),
//       });

//       if (res.ok) {
//         setSaved(true);
//         setTimeout(() => setSaved(false), 3000); // 3초 후 메시지 숨김
//       } else {
//         alert("저장에 실패했습니다.");
//       }
//     } catch (error) {
//       console.error("저장 오류:", error);
//       alert("저장 중 오류가 발생했습니다.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // 다시하기
//   const handleReset = () => {
//     if (confirm("처음부터 다시 시작하시겠습니까?")) {
//       router.push("/");
//     }
//   };

//   return (
//     <>
//       {/* 코멘트 섹션 */}
//       <section className="mt-10">
//         <h2 className="text-lg font-semibold mb-2">
//           결과에 대한 코멘트 💬{" "}
//           {loadingExisting && (
//             <span className="text-xs opacity-70">불러오는 중…</span>
//           )}
//         </h2>

//         {!resultId && !loadingExisting ? (
//           <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
//             <p className="text-amber-400 text-sm">
//               ⚠️ 코멘트를 저장하려면 테스트 결과와 함께 저장해야 합니다.
//             </p>
//           </div>
//         ) : saved ? (
//           <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
//             <p className="text-emerald-400 text-sm">
//               ✓ 코멘트가 저장되었습니다. 감사합니다!
//             </p>
//           </div>
//         ) : (
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="결과에 대한 생각이나 피드백을 남겨주세요..."
//             className="w-full min-h-[100px] p-3 rounded-lg bg-black/40 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-gray-200 placeholder:text-gray-500"
//             disabled={loadingExisting || !resultId}
//           />
//         )}
//       </section>

//       {/* 액션 버튼 */}
//       <div className="mt-6 flex flex-wrap gap-3">
//         <button
//           className="px-5 py-2.5 rounded-xl border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
//           onClick={handleSave}
//           disabled={isSaving || !resultId || saved || !comment.trim()}
//         >
//           {isSaving ? "저장 중..." : saved ? "저장 완료" : "코멘트 저장"}
//         </button>

//         <button
//           className="px-5 py-2.5 rounded-xl border border-gray-600 text-gray-200 hover:bg-white/5 transition-all"
//           onClick={handleReset}
//         >
//           다시 하기
//         </button>
//       </div>
//     </>
//   );
// }
