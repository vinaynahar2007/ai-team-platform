"use client"

import LoadingSpinner from "../components/LoadingSpinner"
import Navbar from "../components/Navbar"
import useAuth from "../hooks/useAuth"

import { useEffect, useState } from "react"

export default function TeamPage() {

  useAuth()

  const [team, setTeam] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    generateTeam()

  }, [])

  const generateTeam = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "https://ai-team-platform-m2bs.onrender.com//generate-team",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setTeam(data.generated_team || [])

    setLoading(false)
  }

  if (loading) {

    return <LoadingSpinner /> 
  }  

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-slate-900 p-10">

        <h1 className="text-5xl font-bold text-white text-center mb-10">

          AI Generated Team 🚀

        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {team.map((member, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300"
            >

              <h2 className="text-2xl font-bold text-black mb-4">

                {member.username}

              </h2>

              <p className="text-gray-700 mb-2">

                <strong>Email:</strong> {member.email}

              </p>

              <p className="text-gray-700 mb-2">

                <strong>Skills:</strong> {member.skills}

              </p>

              <p className="text-gray-700">

                <strong>Experience:</strong> {member.experience}

              </p>

            </div>

          ))}

        </div>

      </main>

    </>

  )

}