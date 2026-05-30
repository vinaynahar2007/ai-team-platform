"use client"

import LoadingSpinner from "../components/LoadingSpinner"
import Navbar from "../components/Navbar"
import useAuth from "../hooks/useAuth"

import { useEffect, useState } from "react"

export default function ProjectsPage() {

  useAuth()

  const [projects, setProjects] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchProjects()

  }, [])

  const fetchProjects = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "https://ai-team-platform-m2bs\.onrender\.com/project-ideas",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setProjects(data.projects || [])

    setLoading(false)
  }

  if (loading) {

    return <LoadingSpinner />

  }
  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-slate-900 p-10">

        <h1 className="text-4xl font-bold text-white mb-10 text-center">

          AI Project Ideas 💡

        </h1>
        {projects.length === 0 && (

          <div className="text-center text-white mb-10">

            <h2 className="text-3xl font-bold mb-4">

              No Project Ideas Yet 🚀

            </h2>

            <p className="text-gray-300">

              Complete your profile skills to generate AI startup ideas.

            </p>

          </div>

        )}
        <div className="grid md:grid-cols-3 gap-6">

          {projects.map((project, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300"
            >

              <h2 className="text-2xl font-bold text-black mb-4">

                {project.title}

              </h2>

              <p className="text-gray-700 mb-4">

                {project.description}

              </p>

              <div>

                <p className="font-semibold text-black mb-2">

                  Tech Stack:

                </p>

                <div className="flex flex-wrap gap-2">

                  {project.tech_stack.map(
                    (tech: string, i: number) => (

                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >

                        {tech}

                      </span>

                    )
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

    </>

  )

}