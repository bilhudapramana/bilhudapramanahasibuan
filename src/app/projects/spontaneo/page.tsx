'use client'
import { motion } from 'framer-motion'
import ProjectDetail from '@/components/ProjectDetail'

export default function Spontaneo() {
  const projectData = {
    title: "SPONTANEO",
    description: "An iOS application designed to facilitate spontaneous social activities and connections, making it easier for people to discover and join local activities.",
    challenge: "People struggle to find and join spontaneous social activities in their area, especially in new environments.",
    solution: "Developed a comprehensive iOS platform with real-time activity discovery, in-app messaging, and reward systems to encourage social connections.",
    impact: [
      "Successfully tested with UQ students",
      "Positive feedback on user experience",
      "Featured in DECO3500 showcase",
      "Open source contribution on GitHub"
    ],
    technologies: [
      "Swift",
      "SwiftUI",
      "Firebase SDK",
      "SDWebImageSwiftUI",
      "iOS Development",
      "watchOS Development"
    ],
    color: "#FFD700",
    features: [
      {
        title: "Real-time Discovery",
        description: "Find and join activities happening around you instantly",
        icon: "🔍"
      },
      {
        title: "In-app Messaging",
        description: "Communicate with activity participants seamlessly",
        icon: "💬"
      },
      {
        title: "User Profiles",
        description: "Customize your profile and track activity history",
        icon: "👤"
      },
      {
        title: "Reward System",
        description: "Earn rewards for active participation",
        icon: "🌟"
      },
      {
        title: "Watch Integration",
        description: "Companion watchOS app for on-the-go access",
        icon: "⌚"
      }
    ],
    team: [
      {
        name: "Abdul Wibisono",
        role: "Lead Communication, UX Designer, iOS Developer",
        github: "abdulwibisono"
      },
      {
        name: "Bilhuda Hasibuan",
        role: "Lead UX Designer, Lead iOS Developer",
        github: "bilhudapramana"
      },
      {
        name: "Nicholas Kinandana",
        role: "Logistics Manager, Exhibition Manager",
        github: "nicholaskinandana"
      },
      {
        name: "Syafiqo Octaviano",
        role: "Product Manager",
        github: "syafiqooctaviano"
      }
    ],
    techDetails: {
      repository: "https://github.com/abdulwibisono/Spontaneo",
      stack: {
        frontend: ["Swift", "SwiftUI", "WatchKit"],
        backend: ["Firebase", "Cloud Functions"],
        other: ["SDWebImageSwiftUI", "MapKit", "CoreLocation"]
      },
      platforms: ["iOS 15.0+", "watchOS 8.0+"]
    },
    vision: "Creating a world where spontaneous social connections are just a tap away, making every day an opportunity for new experiences and meaningful interactions."
  }

  return <ProjectDetail {...projectData} />
} 