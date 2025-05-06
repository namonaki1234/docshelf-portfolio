type Props = {
    keyword: string
    setKeyword: (val: string) => void
    sortOrder: "asc" | "desc"
    setSortOrder: (val: "asc" | "desc") => void
    viewMode: "card" | "table"
    setViewMode: (val: "card" | "table") => void
  }
  
  export const TipFilterBar = ({
    keyword,
    setKeyword,
    sortOrder,
    setSortOrder,
    // viewMode,
    setViewMode,
  }: Props) => {
    return (
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="キーワード検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded px-3 py-1"
        />
  
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-3 py-1"
        >
          <option value="desc">新しい順</option>
          <option value="asc">古い順</option>
        </select>
  
        <button onClick={() => setViewMode("card")} className="bg-slate-800 text-white rounded px-3 py-1">カード</button>
        <button onClick={() => setViewMode("table")} className="bg-slate-800 text-white rounded px-3 py-1">表</button>
      </div>
    )
  }
  