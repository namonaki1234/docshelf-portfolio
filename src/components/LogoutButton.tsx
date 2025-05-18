import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login") // ログアウト後ログイン画面へ
  }

  return (
      <Button variant="destructive" onClick={handleLogout}>
      ログアウト
    </Button>
  )
}
