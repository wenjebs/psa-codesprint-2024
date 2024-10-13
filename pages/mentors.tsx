"use client";

import React, { useEffect, useState } from "react";
import {
  UserGroupIcon,
  BeakerIcon,
  LightBulbIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import "../app/globals.css";

interface Mentor {
  id: string;
  name: string;
  age: string;
  ethnicity: string;
  department: string;
  role: string;
  hobbies: string;
  experiences: string;
  lookingFor: string;
  techSavviness: string;
  dataAnalysis: string;
  projectManagement: string;
  leadership: string;
  gender: string;
  imageURL: string;
}

const SkillBar: React.FC<{ skill: string; value: string }> = ({
  skill,
  value,
}) => (
  <div className="mb-2">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-purple-200">{skill}</span>
      <span className="text-sm font-medium text-purple-200">{value}/10</span>
    </div>
    <div className="w-full bg-purple-900 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(parseInt(value) / 10) * 100}%` }}
      ></div>
    </div>
  </div>
);

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContact = () => {
    // Implement contact functionality here
    alert(`Contacting ${mentor.name}`);
  };

  return (
    <div
      className={`bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? "scale-105 z-10" : "scale-100 z-0"
      }`}
    >
      <div className="p-6 relative">
        <Image
          src={mentor.imageURL || "/placeholder.svg?height=192&width=384"}
          alt={`${mentor.name}'s profile`}
          className="w-40 h-40 rounded-full mx-auto mt-3 mb-4"
          width={96}
          height={96}
          objectFit="cover"
        />

        <h2 className="text-3xl font-bold text-white mb-2">
          {mentor.name}, {mentor.age}
        </h2>

        <p className="text-purple-200 mb-1">
          {mentor.role} • {mentor.department}
        </p>
        <p className="text-purple-300 mb-4">{mentor.ethnicity}</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-5 w-5 text-blue-400" />
            <p className="text-purple-100">Tech Savviness</p>
          </div>
          <SkillBar skill="Tech Savviness" value={mentor.techSavviness} />

          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-5 w-5 text-green-400" />
            <p className="text-purple-100">Data Analysis</p>
          </div>
          <SkillBar skill="Data Analysis" value={mentor.dataAnalysis} />

          <div className="flex items-center space-x-2">
            <LightBulbIcon className="h-5 w-5 text-yellow-400" />
            <p className="text-purple-100">Project Management</p>
          </div>
          <SkillBar
            skill="Project Management"
            value={mentor.projectManagement}
          />

          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="h-5 w-5 text-red-400" />
            <p className="text-purple-100">Leadership</p>
          </div>
          <SkillBar skill="Leadership" value={mentor.leadership} />
        </div>

        <div className="flex space-x-2 mt-6">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
          <Button
            onClick={handleContact}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Contact Me
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Hobbies</h3>
              <p className="text-purple-200">{mentor.hobbies}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Experiences
              </h3>
              <p className="text-purple-200">{mentor.experiences}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Looking for in a Mentee
              </h3>
              <p className="text-purple-200">{mentor.lookingFor}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MentorDisplay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams ? searchParams.get("message") : null;
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    console.log("Message from URL:", message); // Debug log

    if (message) {
      try {
        const decodedMessage = decodeURIComponent(message);
        console.log("Decoded message:", decodedMessage); // Debug log

        const people = decodedMessage
          .trim()
          .split("\n")
          .map((line) => {
            const [
              id,
              name,
              age,
              ethnicity,
              department,
              role,
              hobbies,
              experiences,
              lookingFor,
              techSavviness,
              dataAnalysis,
              projectManagement,
              leadership,
              gender,
              imageURL,
            ] = line.split(",");
            return {
              id,
              name,
              age,
              ethnicity,
              department,
              role,
              hobbies,
              experiences,
              lookingFor,
              techSavviness,
              dataAnalysis,
              projectManagement,
              leadership,
              gender,
              imageURL,
            };
          });

        console.log("Parsed mentors:", people); // Debug log
        setMentors(people);
        setDebugInfo(`Parsed ${people.length} mentors`);
      } catch (err) {
        console.error("Error parsing message:", err);
        setDebugInfo(`Error parsing message: ${err}`);
      }
    } else {
      setDebugInfo("No message found in URL");
    }
  }, [message]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <UserGroupIcon className="mx-auto h-16 w-16 text-purple-400 animate-pulse" />
          <h1 className="mt-1 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 sm:text-5xl leading-tight">
            Your Matches
          </h1>
        </div>

        {mentors.length === 0 ? (
          <p className="text-center text-purple-200 text-xl">
            No mentors found. Please check the URL and try again.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button className="p-[3px] relative" onClick={handleGoHome}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Back to home!
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
