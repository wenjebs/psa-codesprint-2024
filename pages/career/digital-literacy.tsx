'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import confetti from 'canvas-confetti'
import { useRouter } from 'next/router'
import '../../app/globals.css'
import React from 'react'

// Simulated AI-generated questions
const quizQuestions = [
    {
        question: "What is digital literacy?",
        options: [
          "The ability to read and write digital content",
          "The ability to use digital technology and communication tools",
          "The ability to create digital art",
          "The ability to repair digital devices"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of the following is a key component of digital literacy?",
        options: [
          "Understanding how to use social media",
          "Knowing how to code in multiple languages",
          "Being able to evaluate online information critically",
          "Being able to build a computer"
        ],
        correctAnswer: 2
      },
      {
        question: "What does 'netiquette' refer to?",
        options: [
          "The etiquette of using the internet",
          "The speed of an internet connection",
          "The security of online transactions",
          "The design of a website"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is a sign of a phishing attempt?",
        options: [
          "An email from a known contact",
          "A request for personal information from an unknown source",
          "A secure website with HTTPS",
          "A well-designed company logo"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of a strong password?",
        options: [
          "To make it easy to remember",
          "To protect against unauthorized access",
          "To share with friends",
          "To use the same password everywhere"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of the following is a benefit of cloud computing?",
        options: [
          "Increased hardware costs",
          "Limited access to data",
          "Scalability and flexibility",
          "Reduced internet speed"
        ],
        correctAnswer: 2
      },
      {
        question: "What is a digital footprint?",
        options: [
          "The physical space a computer occupies",
          "The trail of data you leave online",
          "The size of a digital file",
          "The speed of a digital connection"
        ],
        correctAnswer: 1
      }
]

export default function TechnologyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1)
      setSelectedAnswer(null)
    } else {
      const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)
      setQuizCompleted(true)
      if (finalScore === quizQuestions.length) {
        triggerConfetti()
        markQuizAsCompleted() // Mark the quiz as completed
      }
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const markQuizAsCompleted = () => {
    // Store the completion status in local storage
    localStorage.setItem('digitalLiteracyCompleted', 'true')
  }

  const handleBackToTechnology = () => {
    router.push('/career/technology')
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
          Technology Quiz
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg animate-fadeIn">
          {!quizCompleted ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-blue-300">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
              <p className="text-xl mb-6">{quizQuestions[currentQuestion].question}</p>
              <div className="space-y-4 mb-8">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-blue-300">Quiz Completed!</h2>
              <p className="text-2xl mb-4">Your Score: {score} / {quizQuestions.length}</p>
              {score === quizQuestions.length ? (
                <div className="flex items-center justify-center text-green-400">
                  <CheckCircleIcon className="h-8 w-8 mr-2" />
                  <span>Perfect Score! Congratulations!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center text-yellow-400">
                  <XCircleIcon className="h-8 w-8 mr-2" />
                  <span>Good effort! Keep learning and try again.</span>
                </div>
              )}
              <button
                onClick={handleBackToTechnology}
                className="mt-6 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Back to Technology
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
