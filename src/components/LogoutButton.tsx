import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login") // ログアウト後ログイン画面へ
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ログアウト
    </button>
  )
}
