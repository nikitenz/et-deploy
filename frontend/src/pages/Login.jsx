import { LoginForm } from "@/components/login-form"
import { useContext, useState } from "react"
import AppContent from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")   // 🔴 error state
  const [loading, setLoading] = useState(false) // ⏳ loading state
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("") // clear old errors
    setLoading(true)

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {

        const { token, user } = res.data;

        localStorage.setItem("token", token); // we save this so we can use it for protected routes
        localStorage.setItem("user", JSON.stringify(user));

        // localStorage.setItem("role", user.role); (this is optional for quick access so commented for now)

        setIsLoggedin(true)
        getUserData()
        
        if (user.role === "admin"){
          navigate("/admin-dashboard");
        } else if (user.role === "faculty"){
          navigate("/faculty-dashboard");
        } else if (user.role === "hte"){
          navigate("/hte-dashboard");
        } else if (user.role === "student"){
          navigate("/student-dashboard");
        } else {
          navigate("/"); //fallback
        }

      } else {
        setError(res.data.message || "Invalid credentials")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          error={error}        // ✅ pass error down
          loading={loading}    // ✅ pass loading state
        />
      </div>
    </div>
  )
}
