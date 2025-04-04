'use client'
import { motion } from 'framer-motion'
import ProjectDetail from '@/components/ProjectDetail'

export default function DinoDash() {
  const projectData = {
    title: "DINODASH",
    description: "A gamified learning experience platform that makes education fun and engaging for children.",
    challenge: "Traditional educational platforms often fail to maintain children's interest and engagement in learning activities.",
    solution: "Developed an interactive platform that combines educational content with game mechanics, creating an immersive learning experience.",
    impact: [
      "80% increase in learning retention",
      "Average session time increased by 300%",
      "97% teacher satisfaction rate",
      "Featured in EdTech Magazine"
    ],
    technologies: [
      "Unity",
      "React",
      "Game Design",
      "Educational Psychology",
      "3D Modeling"
    ],
    color: "#98FB98",
    features: [
      {
        title: "Adaptive Learning",
        description: "Difficulty adjusts based on player performance",
        icon: "🧠"
      },
      {
        title: "Progress Tracking",
        description: "Visual representation of learning achievements",
        icon: "📊"
      },
      {
        title: "Multiplayer Modes",
        description: "Collaborative and competitive learning options",
        icon: "🏃"
      }
    ]
  }

  return <ProjectDetail {...projectData} />
} 