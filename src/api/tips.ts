import { supabase } from "@/lib/supabaseClient"
import type { Tip } from "@/types/tip"

export const fetchTipsByCategory = async (category: string): Promise<Tip[]> => {
  const { data, error } = await supabase
    .from("tips")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tips:", error.message)
    return []
  }

  return data as Tip[]
}
