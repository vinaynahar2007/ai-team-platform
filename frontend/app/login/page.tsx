"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function LoginPage() {

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password
        }),
      }
    )

    const data = await response.json()

    if (data.access_token) {

      localStorage.setItem(
        "token",
        data.access_token
      )

      toast.success("Login successful 🚀")
      router.push("/dashboard")
    }

    else {

      toast.error(data.detail)
    }
  }

  return (

    
<main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <Link
    href="/"
    className="mb-6 text-white hover:text-blue-400 transition flex items-center gap-2"
  >

    ← Back to Home

  </Link>
      <div className="bg-white p-10 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">

          Login 🚀

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>
        <p className="text-center mt-6 text-black">

          Don't have an account?{" "}

          <Link
            href="/signup"
            prefetch={false}
            className="text-blue-600 font-semibold"
          >

            Signup

          </Link>

        </p>
      </div>

    </main>

  )

}