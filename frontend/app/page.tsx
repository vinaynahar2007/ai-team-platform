"use client"

import Link from "next/link"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  const handleDashboard = () => {

    const token = localStorage.getItem("token")

    if (token) {

      router.push("/dashboard")

    }

    else {

      router.push("/login")

    }

  }

  return (

    <main className="min-h-screen bg-slate-900 text-white">

      <nav className="flex justify-between items-center p-6 bg-black">

        <h1 className="text-3xl font-bold">

          AI Team Platform 🚀

        </h1>

        <div className="flex gap-6 items-center">

          <Link
            href="/login"
            className="hover:text-blue-400 transition"
          >

            Login

          </Link>

          <Link
            href="/signup"
            className="hover:text-blue-400 transition"
          >

            Signup

          </Link>

          <button
            onClick={handleDashboard}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >

            Dashboard

          </button>

        </div>

      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">

        <h1 className="text-6xl font-bold mb-6">

          Build AI Teams Smarter 🚀

        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mb-10">

          Match developers, designers, and innovators using AI-powered recommendations,
          intelligent team generation, and startup project suggestions.

        </p>

        <div className="flex gap-6">

          <Link
            href="/signup"
            className="bg-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >

            Get Started

          </Link>

          <button
            onClick={handleDashboard}
            className="bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
          >

            Dashboard

          </button>

        </div>

      </section>

    </main>

  )

}