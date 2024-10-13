'use client'

import '../app/globals.css'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

interface Member {
  id: number
  name: string
}

interface Group {
  id: number
  members: Member[]
}

export default function GroupingResults(): JSX.Element {
  const [groups, setGroups] = useState<Group[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const dataParam = searchParams?.get('data')
    if (dataParam) {
      const parsedData = JSON.parse(dataParam)
      
      if (parsedData.outputs && parsedData.outputs[0] && parsedData.outputs[0].outputs && parsedData.outputs[0].outputs[0].messages) {
        const outputText = parsedData.outputs[0].outputs[0].messages[0].message
        const parsedGroups = parseAIResponseIntoGroups(outputText)
        setGroups(parsedGroups)
      }
    }
  }, [searchParams])

  function parseAIResponseIntoGroups(response: string): Group[] {
    console.log('Parsing AI Response: ', response);
    
    const groupStrings = response.split('#').filter(str => str.trim() !== '');
    
    const parsedGroups: Group[] = groupStrings.map((groupString, groupIndex) => {
      const [membersString] = groupString.split(':').map(str => str.trim());
      const memberNames = membersString.split(',').map(name => name.trim()).filter(name => name !== '');
      
      return {
        id: groupIndex + 1,
        members: memberNames.map((name, memberIndex) => ({
          id: memberIndex + 1,
          name: name
        }))
      };
    });

    console.log('Parsed Groups: ', parsedGroups);
    return parsedGroups;
  }

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
                  <h2 className="text-2xl font-semibold">Crew {group.id}</h2>
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
