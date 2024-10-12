import React, { useEffect, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import '../app/globals.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MentorDisplay: React.FC = () => {
  const router = useRouter();
  const { message } = router.query;
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      relevantExperiences: 'Led the development of a scalable microservices architecture for a global tech platform, with 10+ years of experience in backend systems and cloud computing.',
      profileImage: '/mentor1.png'
    },
    {
      id: 2,
      name: 'Brian Lee',
      role: 'Lead Product Manager',
      department: 'Product',
      relevantExperiences: 'Oversees the development and launch of e-commerce products, driving cross-functional teams, and has successfully scaled multiple SaaS products over 8 years.',
      profileImage: '/mentor2.png'
    },
    {
      id: 3,
      name: 'Catherine Smith',
      role: 'Senior Data Scientist',
      department: 'Data Analytics',
      relevantExperiences: 'Specializes in predictive analytics for the finance industry, with 7+ years of experience in machine learning models and big data solutions.',
      profileImage: '/mentor3.jpg'
    }
  ]);

  useEffect(() => {
    console.log("the message" + message)
    if (message) {
      const decodedMessage = decodeURIComponent(message as string);
      const matchedMentor = mentors.find(mentor => decodedMessage.includes(mentor.name));
      if (matchedMentor) {
        setMentors([matchedMentor]);
      }
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-5">
        {/* Header Section */}
        <div className="flex items-center justify-center mb-12">
          <UserGroupIcon className="h-10 w-10 text-purple-400 mr-4" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow">
            Mentorship Matching
          </h1>
        </div>
        
        <h1 className="text-5xl font-bold text-center mb-12 text-white">
          Your Matches
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div 
              key={mentor.id} 
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-2">{mentor.name}</h2>
              <Image 
                src={mentor.profileImage}
                alt={`${mentor.name}'s profile`} 
                className="w-40 h-40 rounded-full mx-auto mt-3 mb-4"
                width={96}
                height={96} // Adjust size accordingly
              />
              <p className="text-lg font-bold text-white">{mentor.role}</p>
              <p className="text-lg text-white mb-4">{mentor.department}</p>
              <p className="text-sm text-white mb-4">{mentor.relevantExperiences}</p>
              <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorDisplay;
