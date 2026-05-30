"use client"

import LoadingSpinner from "../components/LoadingSpinner"

import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import useAuth from "../hooks/useAuth"

export default function MatchesPage() {

  useAuth()

  const [matches, setMatches] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [sortOrder, setSortOrder] = useState("high")

  useEffect(() => {

    fetchMatches()

  }, [])

  const fetchMatches = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "http://127.0.0.1:8000/match-users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setMatches(data.matches || [])

    setLoading(false)
  }

  const filteredMatches = matches
    .filter((match) =>

      match.username
        .toLowerCase()
        .includes(search.toLowerCase())

    )
    .sort((a, b) =>

      sortOrder === "high"

        ? b.match_score - a.match_score

        : a.match_score - b.match_score

    )

  const getScoreColor = (score: number) => {

    if (score >= 80) {

      return "text-green-400"
    }

    if (score >= 50) {

      return "text-yellow-400"
    }

    return "text-red-400"
  }

  if (loading) {

    return <LoadingSpinner />

  }

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-slate-900 p-10">

        <h1 className="text-4xl font-bold text-white mb-10 text-center">

          AI Teammate Matches 🚀

        </h1>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">

          <input
            type="text"
            placeholder="Search teammates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[400px] p-3 rounded-xl text-white placeholder:text-gray-400 bg-slate-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setSortOrder("high")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >

            Highest Match

          </button>

          <button
            onClick={() => setSortOrder("low")}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >

            Lowest Match

          </button>

        </div>

        {filteredMatches.length === 0 && (

          <div className="text-center text-white mb-10">

            <h2 className="text-3xl font-bold mb-4">

              No Matches Found 🚀

            </h2>

            <p className="text-gray-300">

              Try another search or update your profile.

            </p>

          </div>

        )}

        <div className="grid md:grid-cols-3 gap-6">

          {filteredMatches.map((match: any, index) => (

            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 hover:-translate-y-2 transition duration-300"
            >

              <h2 className="text-2xl font-bold text-white mb-2">

                {match.username}

              </h2>

              <p className="text-gray-300 mb-2">

                {match.email}

              </p>

              <p className={`font-bold mb-3 ${getScoreColor(match.match_score)}`}>

                Match Score: {match.match_score}%

              </p>

              <div className="mb-4">

                {match.match_score >= 80 && (

                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">

                    Excellent Match

                  </span>

                )}

                {match.match_score >= 50 &&
                  match.match_score < 80 && (

                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">

                    Good Match

                  </span>

                )}

                {match.match_score < 50 && (

                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">

                    Low Match

                  </span>

                )}

              </div>

              <p className="text-white mb-2">

                {match.recommendation}

              </p>

            </div>

          ))}

        </div>

      </main>

    </>

  )

}