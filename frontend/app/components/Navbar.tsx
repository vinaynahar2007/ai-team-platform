
"use client"
import Link from "next/link"

import { usePathname } from "next/navigation"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

export default function Navbar() {

const pathname = usePathname()
const [username, setUsername] = useState("")
const router = useRouter()

useEffect(() => {

  fetchProfile()

}, [])

const fetchProfile = async () => {

  const token = localStorage.getItem("token")

  if (!token) return

  const response = await fetch(
    "https://ai-team-platform-3cm0.onrender.com/profile/me",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await response.json()

  setUsername(data.username || "")
}

  const handleLogout = () => {

    localStorage.removeItem("token")

    router.push("/login")
  }

  return (

    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <Link
        href="/dashboard"
        className="text-2xl font-bold hover:text-blue-400 transition"
      >

        AI Team Platform 🚀

      </Link>

      <div className="flex gap-6 items-center">

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">

          {username.charAt(0).toUpperCase()}

        </div>

        <Link
          href="/profile"
          className={pathname === "/profile"
            ? "text-blue-400 font-bold"
            : "text-white"}
        >

          Profile

        </Link>

        <Link
          href="/matches"
          className={pathname === "/matches"
            ? "text-blue-400 font-bold"
            : "text-white"}
        >
          Matches
        </Link>

        <Link
          href="/team"
          className={pathname === "/team"
            ? "text-blue-400 font-bold"
            : "text-white"}
        >
          Team
        </Link>
        
        <Link
          href="/projects"
          className={pathname === "/projects"
            ? "text-blue-400 font-bold"
            : "text-white"}
        >
          Projects
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </nav>

  )

}