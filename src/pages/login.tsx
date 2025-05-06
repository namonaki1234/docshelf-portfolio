import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // セッションがあれば自動ログイン
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/")
      }
    })
  }, [navigate])

  const handleAuth = async () => {
    setError("")
  
    let result
  
    if (isLoginMode) {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({ email, password })
    }
  
    const { error } = result
  
    if (error) {
      setError(error.message)
    } else {
      navigate("/") // 成功したらトップページへ
    }
  }
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow space-y-4">
        <h1 className="text-xl font-semibold text-center">
          {isLoginMode ? "ログイン" : "新規登録"}
        </h1>

        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-slate-800 text-white py-2 rounded"
        >
          {isLoginMode ? "ログイン" : "新規登録"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <p
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-sm text-blue-600 cursor-pointer text-center"
        >
          {isLoginMode ? "アカウントをお持ちでない方はこちら" : "ログイン画面に戻る"}
        </p>
      </div>
    </main>
  )
}
