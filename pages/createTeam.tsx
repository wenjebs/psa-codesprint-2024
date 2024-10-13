'use client'

import '../app/globals.css'
import React, { useState } from 'react'
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'  // Import useRouter

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

  const [aiResponse, setAiResponse] = useState('')

  const router = useRouter()  // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form with', teamMembers, 'members each')
    
    try {
      console.log('Sending request to /api/langflow')
      const response = await fetch('/api/langflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: `Create groups with ${teamMembers} members each` }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response:', errorText)
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Received data:', data)

      setAiResponse(data.response) // Adjust this based on the actual structure of the response

      console.log('Navigating to /groupingResults')
      //router.push('/groupingResults')
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      // Handle error (e.g., show an error message to the user)
    }
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
              Create Groups
            </h1>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg mb-8">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label htmlFor="teamMembers" className="block text-sm font-medium text-blue-300 mb-2">Number of Group Members</label>
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
                Create Groups
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
