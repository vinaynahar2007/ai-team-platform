"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import Link from "next/link"

import toast from "react-hot-toast"

export default function SignupPage() {

  const router = useRouter()

  const [username, setUsername] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    const response = await fetch(
      "https://ai-team-platform-m2bs.onrender.com/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          email,
          password
        })
      }
    )

    const data = await response.json()

    if (response.ok) {

      toast.success("Signup successful 🚀")

      router.push("/login")
    }

    else {

      toast.error(data.detail || "Signup failed")
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

        <h1 className="text-4xl font-bold text-center mb-8 text-black">

          Signup 🚀

        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

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
          className="w-full border p-3 rounded-lg mb-6 text-black"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >

          Signup

        </button>

        <p className="text-center mt-6 text-black">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-blue-600 font-semibold"
          >

            Login

          </Link>

        </p>

      </div>

    </main>

  )

}