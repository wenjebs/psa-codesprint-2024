'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Skeleton } from '@/components/ui/skeleton'
import { generateContent } from '../questions-generator'
import '../app/globals.css'

const skills = [
  { name: 'Technology', icon: '💻', description: 'Learn about the latest tech trends and tools' },
  { name: 'Safety', icon: '🚨', description: 'Learn about safety regulations and best practices' },
  { name: 'Leadership', icon: '👥', description: 'Develop leadership and team management skills' },
  { name: 'Stress Management', icon: '🔥', description: 'Learn to work well under stressful conditions' },
  { name: 'Data Analysis', icon: '📊', description: 'Learn to interpret and visualize complex data' },
  { name: 'Trend Analysis', icon: '📈', description: 'Effectively analyze trends and make data-driven decisions' },
  { name: 'Maritime Operations', icon: '🚢', description: 'Explore the intricacies of port operations' },
  { name: 'Cybersecurity', icon: '🔒', description: 'Protect digital assets from cyber threats' },
  { name: 'Sustainability', icon: '🌱', description: 'Implement eco-friendly practices in operations' },
  { name: 'Artificial Intelligence', icon: '🤖', description: 'Harness the power of AI in various applications' },
]

const leaderboard = [
  { name: 'John Doe', points: 1250 },
  { name: 'Jane Smith', points: 1180 },
  { name: 'Alex Johnson', points: 1150 },
  { name: 'Emily Brown', points: 1100 },
  { name: 'Michael Lee', points: 1050 },
  { name: 'Sarah Wang', points: 1000 },
  { name: 'David Tan', points: 950 },
  { name: 'Lisa Chen', points: 900 },
  { name: <span style={{ color: "green" }}>You</span>, points: 850 },
  { name: 'Grace Lim', points: 800 },
  { name: 'Ryan Ng', points: 750 },
  { name: 'Olivia Goh', points: 700 },
  { name: 'Kevin Teo', points: 650 },
  { name: 'Sophia Koh', points: 600 },
  { name: 'Daniel Lau', points: 550 },
]

const defaultOptions = ["Very confident", "Confident", "Somewhat confident", "Not confident"];

export default function CareerGuidance() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [aiResponse, setAiResponse] = useState('')
  const router = useRouter()
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState('')
  const [questions, setQuestions] = useState<{ question: string; options: string[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSkillClick = (skill: { name: string }) => {
    router.push('/career/technology')
  }

  const handleStartQuestionnaire = async () => {
    setLoading(true);
    setShowQuestionnaire(true);
    try {
      const questionStrings: string[] = await generateContent();
      const formattedQuestions = questionStrings.map((q) => ({
        question: q,
        options: defaultOptions,
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const recommendation = generateRecommendation(newAnswers)
      setRecommendation(recommendation)
      setShowQuestionnaire(false)
    }
  }

  const generateRecommendation = (answers: string[]) => {
    const newWeaknesses = answers.reduce<string[]>((acc, answer, index) => {
      if (answer === "Not confident" || answer === "Somewhat confident") {
        acc.push(skills[index % skills.length].name)
      }
      return acc
    }, [])

    setWeaknesses(newWeaknesses)

    if (newWeaknesses.length === 0) {
      return "Great job! You seem to have a strong skill set. Consider advancing your knowledge in areas you're most passionate about."
    } else {
      return `Based on your answers, we recommend focusing on improving your skills in: ${newWeaknesses.join(", ")}. Check out our courses in these areas to boost your career potential.`
    }
  }

  const headerStyle = {
    height: `${Math.max(100 - scrollY / 5, 0)}vh`,
    opacity: Math.max(1 - scrollY / 500, 0),
    transform: `translateY(-${Math.min(scrollY / 2, 50)}px)`,
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="sticky top-0 z-50 w-full flex items-center justify-center transition-all duration-300 ease-out bg-gradient-to-br from-purple-900 to-blue-900" style={headerStyle}>
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow p-8">
          Hi, what will you learn today?
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="z-10 absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          <div className="w-full lg:w-2/3 animate-fadeInUp">
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Skill Assessment</h2>
            {!showQuestionnaire && !recommendation && (
              <button
                onClick={handleStartQuestionnaire}
                className="mb-10 bg-purple-600 from-purple-900/30 to-blue-900/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 relative z-10 overflow-hidden group font-bold"
              >
                Start Skill Assessment
              </button>
            )}
            {loading && (
              <div className="flex justify-center items-center mb-10">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            )}
            {showQuestionnaire && questions.length > 0 && (
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="skill-card bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 relative z-10 overflow-hidden group"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {recommendation && (
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Your Personalized Recommendation</h3>
                <p className="text-gray-300">{recommendation}</p>
              </div>
            )}
            
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Skill Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillClick(skill)}
                  className={`skill-card bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-4 text-left transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 relative z-10 overflow-hidden group
                    ${weaknesses.includes(skill.name) ? 'animate-glow bg-gradient-to-br from-purple-900/30 to-red-900/30' : ''}`}
                >
                  <span className="text-4xl mb-2 block transition-transform duration-300 group-hover:scale-110">{skill.icon}</span>
                  <span className="text-lg font-medium block mb-2 transition-opacity duration-300 group-hover:opacity-0">{skill.name}</span>
                  <span className="text-sm text-gray-400 transition-all duration-300 opacity-0 group-hover:opacity-100 absolute inset-x-4 bottom-4 transform translate-y-full group-hover:translate-y-0">{skill.description}</span>
                </button>
              ))}
            </div>
            {selectedSkill && (
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl animate-fadeIn">
                <h3 className="text-2xl font-semibold mb-4">{selectedSkill.name} Learning Path</h3>
                <p className="text-gray-300 whitespace-pre-line">{aiResponse}</p>
                <Link
                  href={`/learn/technology`}
                  className="inline-flex items-center mt-4 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Start Learning <ArrowRightIcon className="h-4 w-4 ml-2 animate-bounce" />
                </Link>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/3 animate-fadeInUp">
            <h2 className="text-3xl font-semibold mb-6 text-blue-300">This Week's Leaderboard</h2>
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg">
              {leaderboard.map((user, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                  <span className="font-medium">
                    {index + 1}. {user.name}
                  </span>
                  <span className="text-blue-300">{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}