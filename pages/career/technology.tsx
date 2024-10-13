'use client'

import React from "react"
import { useState, useEffect } from 'react'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import '../../app/globals.css'
import { useRouter } from 'next/router'

const technologyTopics = [
  {
    id: 1,
    name: 'Fundamentals',
    description: 'Basic concepts and principles of technology',
    subtopics: ['Computer Basics', 'Internet Fundamentals', 'Digital Literacy'],
    completed: false,
  },
  {
    id: 2,
    name: 'Programming Basics',
    description: 'Introduction to programming concepts',
    subtopics: ['Variables and Data Types', 'Control Structures', 'Functions'],
    completed: false,
  },
  {
    id: 3,
    name: 'Web Development',
    description: 'Building websites and web applications',
    subtopics: ['HTML', 'CSS', 'JavaScript'],
    completed: false,
  },
  {
    id: 4,
    name: 'Data Structures',
    description: 'Organizing and storing data efficiently',
    subtopics: ['Arrays', 'Linked Lists', 'Trees and Graphs'],
    completed: false,
  },
  {
    id: 5,
    name: 'Algorithms',
    description: 'Problem-solving techniques and efficiency',
    subtopics: ['Sorting', 'Searching', 'Dynamic Programming'],
    completed: false,
  },
  {
    id: 6,
    name: 'Databases',
    description: 'Storing and retrieving data',
    subtopics: ['SQL', 'NoSQL', 'Database Design'],
    completed: false,
  },
  {
    id: 7,
    name: 'Advanced Web Development',
    description: 'Modern web technologies and frameworks',
    subtopics: ['React', 'Node.js', 'RESTful APIs'],
    completed: false,
  },
]

export default function TechnologyProgression() {
  const [topics, setTopics] = useState(technologyTopics)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter() 

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check local storage for completion status
    const isComputerBasicsCompleted = localStorage.getItem('computerBasicsCompleted') === 'true'
    const isInternetFundamentalsCompleted = localStorage.getItem('internetFundamentalsCompleted') === 'true'
    const isDigitalLiteracyCompleted = localStorage.getItem('digitalLiteracyCompleted') === 'true'
    if (isComputerBasicsCompleted) {
      handleCompleteSubtopic(1, 0) // Mark "Computer Basics" as completed
    }
    if (isInternetFundamentalsCompleted) {
      handleCompleteSubtopic(1, 1) // Mark "Internet Fundamentals" as completed
    }
    if (isDigitalLiteracyCompleted) {
      handleCompleteSubtopic(1, 2) // Mark "Digital Literacy" as completed
    }
  }, [])

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic)
  }

  const handleCompleteSubtopic = (topicId, subtopicIndex) => {
    setTopics(prevTopics => {
      const newTopics = [...prevTopics]
      const topicIndex = newTopics.findIndex(t => t.id === topicId)
      newTopics[topicIndex] = {
        ...newTopics[topicIndex],
        subtopics: newTopics[topicIndex].subtopics.map((st, idx) => 
          idx === subtopicIndex ? `${st} (Completed)` : st
        )
      }
      if (newTopics[topicIndex].subtopics.every(st => st.includes('(Completed)'))) {
        newTopics[topicIndex].completed = true
      }
      setSelectedTopic(newTopics[topicIndex])
      return newTopics
    })
  }

  const calculateProgress = (topic) => {
    const completedSubtopics = topic.subtopics.filter(st => st.includes('(Completed)')).length
    return Math.round((completedSubtopics / topic.subtopics.length) * 100)
  }

  const headerStyle = {
    height: `${Math.max(100 - scrollY / 5, 0)}vh`,
    opacity: Math.max(1 - scrollY / 500, 0),
    transform: `translateY(-${Math.min(scrollY / 2, 50)}px)`,
  }

  const handleSubtopicClick = (subtopic: string) => {
    if (subtopic === 'Computer Basics') {
      router.push('/career/computer-basics')
    }
    if (subtopic === 'Internet Fundamentals') {
      router.push('/career/internet-fundamentals')
    }
    if (subtopic === 'Digital Literacy') {
      router.push('/career/digital-literacy')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="sticky top-0 z-50 w-full flex items-center justify-center transition-all duration-300 ease-out bg-gradient-to-br from-purple-900 to-blue-900" style={headerStyle}>
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow p-8">
          Technology
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          <div className="w-full lg:w-1/3 animate-fadeInUp">
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Topics</h2>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    topic.completed
                      ? 'bg-green-900/30 hover:bg-green-800/40'
                      : 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 hover:from-purple-800/40 hover:to-blue-800/40'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{topic.name}</span>
                    {topic.completed && (
                      <CheckCircleIcon className="h-6 w-6 text-green-400" />
                    )}
                    <div className="mt-4">
                      <ArrowRightIcon className="h-6 w-6 text-purple-500 transform rotate-90" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{topic.description}</p>
                  <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(topic)}%` }}
                    ></div>
                  </div>
                  {index < topics.length - 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 animate-fadeInUp">
            <h2 className="text-3xl font-semibold mb-6 text-blue-300">Topic Details</h2>
            {selectedTopic ? (
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg">
                <h3 className="text-2xl font-semibold mb-4">{selectedTopic.name}</h3>
                <p className="text-gray-300 mb-4">{selectedTopic.description}</p>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Progress:</h4>
                  <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(selectedTopic)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {calculateProgress(selectedTopic)}% Complete
                  </p>
                </div>
                <h4 className="text-xl font-semibold mb-2">Subtopics:</h4>
                <ul className="space-y-2">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <li key={index} className="flex items-center p-2 bg-gray-800 rounded-lg">
                      <span className="mr-2">{subtopic.replace(' (Completed)', '')}</span>
                      {subtopic.includes('(Completed)') ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-400 ml-auto" />
                      ) : (
            <button
              onClick={() => handleSubtopicClick(subtopic)} // Use the new handler
              className="ml-auto px-2 py-1 text-sm bg-purple-500 hover:bg-purple-600 rounded transition-colors duration-200"
                        >
                          Take Quiz
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg">
                <p className="text-gray-300">Select a topic to view details and track your progress.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
