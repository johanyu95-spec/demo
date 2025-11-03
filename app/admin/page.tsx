// import { prisma } from "@/app/lib/prisma";
// import Link from "next/link";

// export default async function ResponsesPage() {
//   const responses = await prisma.results.findMany({
//     orderBy: {
//       created_at: "desc",
//     },
//   });

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-8 text-black">응답 확인하기</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 ID
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 코드
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 답변
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 이름
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 코멘트
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 생성일
//               </th>
//               <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 수정일
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {responses.map((response) => (
//               <tr key={response.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {response.id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {response.code || "-"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
//                   <details className="cursor-pointer">
//                     <summary className="text-blue-600 hover:underline">
//                       답변 보기
//                     </summary>
//                     <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
//                       {JSON.stringify(response.answers, null, 2)}
//                     </pre>
//                   </details>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {response.nickname || "-"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
//                   {response.comment ? (
//                     <div className="truncate" title={response.comment}>
//                       {response.comment}
//                     </div>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {new Date(response.created_at).toLocaleString("ko-KR")}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {new Date(response.updated_at).toLocaleString("ko-KR")}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {responses.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           응답 데이터가 없습니다.
//         </div>
//       )}
//     </div>
//   );
// }

// ❗  Next.js에게 "이 페이지는 절대 사전 렌더하지 말고,
// 요청 들어올 때마다 서버에서 새로 만들어" 라고 선언

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 또는 (효과 비슷)
// export const revalidate = 0;

// app/admin/page.tsx (또는 해당 파일 경로)
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

// Prisma 쿼리의 반환 타입에서 '하나의 행' 타입만 뽑아오기
type ResultRow = Awaited<ReturnType<typeof prisma.results.findMany>>[number];

export default async function ResponsesPage() {
  const responses = await prisma.results.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">응답 확인하기</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                코드
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                답변
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                코멘트
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                생성일
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                수정일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {responses.map((response: ResultRow) => (
              <tr key={response.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {response.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {response.code ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <details className="cursor-pointer">
                    <summary className="text-blue-600 hover:underline">
                      답변 보기
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(response.answers, null, 2)}
                    </pre>
                  </details>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {response.nickname ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  {response.comment ? (
                    <div className="truncate" title={response.comment}>
                      {response.comment}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(response.created_at).toLocaleString("ko-KR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(response.updated_at).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {responses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          응답 데이터가 없습니다.
        </div>
      )}
    </div>
  );
}
