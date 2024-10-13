'use client'

import '../app/globals.css'
import React, { useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

interface Message {
  id: number
  text: string
  sent: boolean
}

export default function CreateTeam(): JSX.Element {
  const [teamMembers, setTeamMembers] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome! I can help you create your team. What would you like to know?", sent: false },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        input_value: `Create crews with ${teamMembers} crewmates each`,
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "TextInput-xHl4C": {},
          "TextOutput-E1bip": {},
          "GoogleGenerativeAIModel-Ykv37": {},
          "ParseData-bpXWO": {},
          "File-KhwBZ": {},
          "Prompt-aVwyk": {}
        }
      };

      const response = await fetch("/api/langflow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json()
      console.log('Data: ', data)

      if (!response.ok) {
        throw new Error(data.message || `API request failed with status ${response.status}`)
      }

      console.log('navigating to groupings...')
      console.log('Data: ', JSON.stringify(data))
      router.push({
        pathname: '/groupingResults',
        query: { data: JSON.stringify(data) },
      })
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setMessages(prev => [...prev, { id: prev.length + 1, text: "Sorry, an error occurred while processing your request.", sent: false }])
      setIsLoading(false)  // Set isLoading to false if there's an error
    }
    // Note: We're not setting isLoading to false here because we want to keep showing the loading page until navigation occurs
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="relative p-8 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl shadow-2xl text-center overflow-hidden w-96 h-96 flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-grid-white/[0.05] animate-pulse rounded-3xl"></div>
          <div className="relative z-10">
            <CircularProgress size="large" className="text-purple-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Generating Crews...
            </h2>
            <div className="flex justify-center space-x-2">
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></span>
            </div>
          </div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow">
              CrewMates
            </h1>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg mb-8">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label htmlFor="teamMembers" className="block text-sm font-medium text-blue-300 mb-2">Number of CrewMates</label>
                <input
                  type="number"
                  id="teamMembers"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  className="w-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-4 outline-none placeholder-blue-300 text-white backdrop-filter backdrop-blur-lg"
                  placeholder="Enter number of members in each group"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                Create Crews
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
