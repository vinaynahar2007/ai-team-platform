"use client"

import useAuth from "../hooks/useAuth"

import Navbar from "../components/Navbar"

import Link from "next/link"

import { useEffect, useState } from "react"

export default function DashboardPage() {

  const [username, setUsername] = useState("")

  const [matchesCount, setMatchesCount] = useState(0)

  const [projectsCount, setProjectsCount] = useState(0)

  const [teamCount, setTeamCount] = useState(0)

  useAuth()

  useEffect(() => {

    fetchProfile()

    fetchStats()

  }, [])

  const fetchProfile = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "https://ai-team-platform-m2bs.onrender.com//profile/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setUsername(data.username || "")
  }

  const fetchStats = async () => {

    const token = localStorage.getItem("token")

    const headers = {
      Authorization: `Bearer ${token}`
    }

    const matchesResponse = await fetch(
      "https://ai-team-platform-m2bs.onrender.com//match-users",
      { headers }
    )

    const matchesData = await matchesResponse.json()

    setMatchesCount(matchesData.matches?.length || 0)

    const projectsResponse = await fetch(
      "https://ai-team-platform-m2bs.onrender.com//project-ideas",
      { headers }
    )

    const projectsData = await projectsResponse.json()

    setProjectsCount(projectsData.projects?.length || 0)

    const teamResponse = await fetch(
      "https://ai-team-platform-m2bs.onrender.com//generate-team",
      { headers }
    )

    const teamData = await teamResponse.json()

    setTeamCount(teamData.generated_team?.length || 0)
  }

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-slate-900 text-white p-10 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">

          <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">

            Welcome Back, {username} 🚀

          </h1>

          <p className="text-gray-300 text-lg">

            Manage your AI teammates, projects, and collaborations.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold">

              {matchesCount}

            </h2>

            <p className="text-gray-200">

              Total Matches

            </p>

          </div>

          <div className="bg-purple-600 p-6 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold">

              {projectsCount}

            </h2>

            <p className="text-gray-200">

              Project Ideas

            </p>

          </div>

          <div className="bg-green-600 p-6 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold">

              {teamCount}

            </h2>

            <p className="text-gray-200">

              Team Members

            </p>

          </div>

        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">

    Recent Activity 📈

  </h2>

  <div className="space-y-4">

    <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">

      <p className="text-gray-200">

        Profile updated successfully

      </p>

      <span className="text-blue-400 text-sm">

        Just now

      </span>

    </div>

    <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">

      <p className="text-gray-200">

        AI generated new teammate matches

      </p>

      <span className="text-green-400 text-sm">

        Today

      </span>

    </div>

    <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">

      <p className="text-gray-200">

        Startup project ideas explored

      </p>

      <span className="text-purple-400 text-sm">

        Recently

      </span>

    </div>

  </div>

</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link href="/profile">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <h2 className="text-2xl font-bold mb-4">

                Profile

              </h2>

              <p className="text-gray-300">

                Update your skills and interests

              </p>

            </div>

          </Link>

          <Link href="/matches">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <h2 className="text-2xl font-bold mb-4">

                AI Matches

              </h2>

              <p className="text-gray-300">

                Discover compatible teammates

              </p>

            </div>

          </Link>

          <Link href="/team">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <h2 className="text-2xl font-bold mb-4">

                Team Generator

              </h2>

              <p className="text-gray-300">

                Generate balanced AI teams

              </p>

            </div>

          </Link>

          <Link href="/projects">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-lg hover:scale-105 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <h2 className="text-2xl font-bold mb-4">

                Project Ideas

              </h2>

              <p className="text-gray-300">

                Explore startup ideas powered by AI

              </p>

            </div>

          </Link>

        </div>
      </div>
      </main>
    
    </>

  )

}