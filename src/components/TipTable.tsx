import type { Tip } from "@/types/tip"

type Props = {
  tips: Tip[]
}

export const TipTable = ({ tips }: Props) => (
  <table className="w-full border text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="px-2 py-1">タイトル</th>
        <th className="px-2 py-1">内容</th>
        <th className="px-2 py-1">日付</th>
      </tr>
    </thead>
    <tbody>
      {tips.map((tip) => (
        <tr key={tip.id} className="border-t">
          <td className="px-2 py-1">{tip.title}</td>
          <td className="px-2 py-1">{tip.content}</td>
          <td className="px-2 py-1">{new Date(tip.created_at).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
