import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import {
  UserGroupIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { ShipIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image src="/psalogo.png" alt="PSA Logo" width={100} height={50} />
        <nav className="flex space-x-6">
          <Link href="/" className="text-white hover:text-violet-300 transition-colors">
            Home
          </Link>
          <Link href="/mentorship" className="text-white hover:text-violet-300 transition-colors">
            MentorShip
          </Link>
          <Link href="/createTeam" className="text-white hover:text-violet-300 transition-colors">
            CrewMates
          </Link>
          <Link href="/chatbot" className="text-white hover:text-violet-300 transition-colors">
            PortPal
          </Link>
          <Link href="/career" className="text-white hover:text-violet-300 transition-colors">
            AnchorUp
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <div className="relative mb-16">
          <div className="relative h-[400px] overflow-hidden">
            <Image
              src="/psaphoto.jpg"
              alt="Port Background"
              layout="fill"
              objectFit="cover"
              className="opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
              <h1 className="text-6xl font-bold text-center mb-4 bg-clip-text text-white">
                HarbourHub
              </h1>
              <p className="text-xl text-center text-white animate-fadeIn">
              Empowering Connections, Teams, and Growth – All Anchored at HarborHub.
              </p>
            </div>
          </div>
        </div>

        {/* Headers and Grid for All Feature Photos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeaturePhoto
              title="MentorShip"
              description="Mentorship Matching: Connecting generations for knowledge sharing"
              imageSrc="/mentorship.jpg"
              link="/mentorship"
              icon={<UserGroupIcon className="h-8 w-8 text-purple-400" />}
            />
            <FeaturePhoto
              title="CrewMates"
              description="Team Matching:Build your ideal team with AI"
              imageSrc="/team-matching.jpg"
              link="/createTeam"
              icon={<RocketLaunchIcon className="h-8 w-8 text-blue-400" />}
            />
            <FeaturePhoto
              title="PortPal"
              description="AI Assistant: Ask me anything! Retrieval-Augmented Generation AI Chatbot for Port of Singapore Authority."
              imageSrc="/portpal.jpg"
              link="/chatbot"
              icon={<ShipIcon className="h-8 w-8 text-purple-400" />}
            />
            <FeaturePhoto
              title="AnchorUp"
              description="Career Guidance & Upskilling: What's next for you?"
              imageSrc="/career-guidance.jpg"
              link="/career"
              icon={<AcademicCapIcon className="h-8 w-8 text-blue-400" />}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeaturePhoto({
  title,
  description,
  imageSrc,
  link,
  icon,
}: {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative group overflow-hidden">
      <div className="relative">
        <Image src={imageSrc} alt={title} width={400} height={300} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
        <div className="mb-4">{icon}</div>
        <p className="text-sm mb-4 text-white">{description}</p>
        <Button asChild>
          <Link href={link} className="inline-flex items-center text-white hover:text-violet-300 transition-colors">
            Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

