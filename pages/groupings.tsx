'use client'

import '../app/globals.css'
import React from 'react'
import { ArrowLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

interface Member {
  id: number
  name: string
}

interface Group {
  id: number
  members: Member[]
}

// Sample data - in a real application, this would come from a database or API
const groups: Group[] = [
  {
    id: 1,
    members: [
      { id: 1, name: "Alice Chen" },
      { id: 2, name: "Bob Tan" },
      { id: 3, name: "Charlie Lim" },
    ]
  },
  {
    id: 2,
    members: [
      { id: 4, name: "David Wong" },
      { id: 5, name: "Eva Liu" },
      { id: 6, name: "Frank Zhang" },
    ]
  },
  {
    id: 3,
    members: [
      { id: 7, name: "Grace Lee" },
      { id: 8, name: "Henry Ng" },
      { id: 9, name: "Ivy Teo" },
    ]
  },
]

export default function GroupingResults(): JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow">
              Grouping Results
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div key={group.id} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-300 hover:scale-105 animate-fadeInUp">
                <div className="flex items-center mb-4">
                  <UserGroupIcon className="h-8 w-8 text-purple-400 mr-2" />
                  <h2 className="text-2xl font-semibold">Group {group.id}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-2">
                        <Image
                          src="/images/blankprofile.webp"
                          alt={member.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                      <p className="text-sm text-center text-blue-200">{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}