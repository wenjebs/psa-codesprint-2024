// pages/index.tsx

import React from "react";
import {
  ArrowRightIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ShipIcon } from "lucide-react";


/**
 * Main landing page component
 * @returns JSX.Element
 */
export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow">
          Port of Singapore Authority
        </h1>

        <p className="text-xl text-center mb-16 text-blue-200 animate-fadeIn">
          Empowering our workforce through innovation and technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            title="Mentorship Matching"
            description="Connecting generations for knowledge sharing"
            icon={<UserGroupIcon className="h-8 w-8 text-purple-400" />}
            link="/mentorship"
          />
          <FeatureCard
            title="Team Matching"
            description="Build your ideal team with AI"
            icon={<RocketLaunchIcon className="h-8 w-8 text-blue-400" />}
            link="/team-matching"
          />
          <FeatureCard
            title="PortPal"
            description="Ask me anything! Retrieval-Augmented Generation AI Chatbot for Port of Singapore Authority."
            icon={<ShipIcon className="h-8 w-8 text-purple-400" />}
            link="/chatbot"
          />
          <FeatureCard
            title="Career Guidance & Upskilling"
            description="What's next for you?"
            icon={<AcademicCapIcon className="h-8 w-8 text-blue-400" />}
            link="/career"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Feature card component
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the feature
 * @param {string} props.description - Description of the feature
 * @param {JSX.Element} props.icon - Icon for the feature
 * @param {string} props.link - Link to the feature page
 * @returns JSX.Element
 */
function FeatureCard({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}): JSX.Element {
  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-300 hover:scale-105 animate-fadeInUp">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold ml-4">{title}</h2>
      </div>
      <p className="text-blue-200 mb-4">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200"
      >
        Learn More <ArrowRightIcon className="h-4 w-4 ml-2 animate-bounce" />
      </Link>
    </div>
  );
}
