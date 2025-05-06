import type { Tip } from "@/types/tip"


export const TipCard = ({ tip, onEdit, onDelete }: {
  tip: Tip
  onEdit: (tip: Tip) => void
  onDelete: (id: string) => void
}) => (
  <div className="border rounded p-4 bg-white shadow relative">
    <h3 className="font-semibold text-lg text-slate-800">{tip.title}</h3>
    <p className="text-slate-600 whitespace-pre-wrap">{tip.content}</p>
    <p className="text-sm text-slate-400 mt-2">
      {new Date(tip.created_at).toLocaleDateString()}
    </p>
    <div className="absolute top-2 right-2 space-x-2">
      <button
        onClick={() => onEdit(tip)}
        className="text-blue-500 hover:underline text-sm"
      >
        編集
      </button>
      <button
        onClick={() => onDelete(tip.id)}
        className="text-red-500 hover:underline text-sm"
      >
        削除
      </button>
    </div>
  </div>
)

