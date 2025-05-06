import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { fetchTipsByCategory } from "@/api/tips"
import type { Tip } from "@/types/tip"


export const ReactPage = () => {
  const [tips, setTips] = useState<Tip[]>([])

  useEffect(() => {
    fetchTipsByCategory("React").then(setTips)
  }, [])

  return (
    <PageLayout
      title="React"
      description="Reactの基本知識・Tipsをまとめています。"
    >
      <ul className="space-y-4">
        {tips.map((tip) => (
          <li key={tip.id} className="p-4 bg-white rounded-xl shadow border border-slate-200">
            <h2 className="font-semibold text-lg text-slate-800">{tip.title}</h2>
            <p className="text-slate-600 whitespace-pre-line">{tip.content}</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}
