"use client"

import LoadingSpinner from "../components/LoadingSpinner"

import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import useAuth from "../hooks/useAuth"

import toast from "react-hot-toast"

export default function ProfilePage() {

  useAuth()

  const [skills, setSkills] = useState("")

  const [interests, setInterests] = useState("")

  const [experience, setExperience] = useState("")

  const [bio, setBio] = useState("")

  const [loading, setLoading] = useState(true)

  const calculateCompletion = () => {

    let completed = 0

    if (skills) completed += 25

    if (interests) completed += 25

    if (experience) completed += 25

    if (bio) completed += 25

    return completed
  }

  useEffect(() => {

    fetchProfile()

  }, [])

  const fetchProfile = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "http://127.0.0.1:8000/profile/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setSkills(data.skills || "")

    setInterests(data.interests || "")

    setExperience(data.experience || "")

    setBio(data.bio || "")

    setLoading(false)
  }

  const handleSaveProfile = async () => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      "http://127.0.0.1:8000/profile",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          skills,
          interests,
          experience,
          bio
        }),
      }
    )

    const data = await response.json()

    toast.success(data.message)
  }

  if (loading) {

    return <LoadingSpinner />

  }

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-10">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl w-[500px] shadow-xl">

          <h1 className="text-4xl font-bold text-center mb-8 text-white">

            My Profile 🚀

          </h1>

          <div className="mb-8">

            <div className="flex justify-between mb-2">

              <p className="text-white font-semibold">

                Profile Completion

              </p>

              <p className="text-blue-400 font-bold">

                {calculateCompletion()}%

              </p>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${calculateCompletion()}%`
                }}
              ></div>

            </div>

          </div>

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-gray-600 bg-slate-800 p-3 rounded-lg mb-4 text-white placeholder:text-gray-400"
          />

          <div className="flex flex-wrap gap-2 mb-6">

            {skills
              .split(",")
              .filter((skill) => skill.trim() !== "")
              .map((skill, index) => (

                <span
                  key={index}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >

                  {skill.trim()}

                </span>

              ))}

          </div>

          <input
            type="text"
            placeholder="Interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full border border-gray-600 bg-slate-800 p-3 rounded-lg mb-4 text-white placeholder:text-gray-400"
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border border-gray-600 bg-slate-800 p-3 rounded-lg mb-4 text-white placeholder:text-gray-400"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-600 bg-slate-800 p-3 rounded-lg mb-6 text-white placeholder:text-gray-400 h-32"
          />

          <button
            onClick={handleSaveProfile}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >

            Save Profile

          </button>

        </div>

      </main>

    </>

  )

}