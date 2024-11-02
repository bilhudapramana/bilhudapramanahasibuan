'use client'
import { motion } from 'framer-motion'
import ProjectDetail from '@/components/ProjectDetail'

export default function Blandt() {
  const projectData = {
    title: "BLANDT",
    description: "Smart Food Inventory & Meal Planning System - A dual-device solution to combat food waste and promote sustainable consumption habits.",
    challenge: "A third of global food for human consumption is wasted, with over 50% occurring at the household level, contributing to environmental impact and resource inefficiency.",
    solution: "Developed a comprehensive two-device system combining a dashboard tablet for inventory management and meal planning with a portable shopping assistant to optimize grocery shopping and reduce waste.",
    impact: [
      "Innovative dual-device approach to food management",
      "AI-powered meal recommendations",
      "Sustainable consumption promotion",
      "Comprehensive dietary tracking",
      "Smart shopping assistance"
    ],
    technologies: [
      "Python",
      "Java",
      "AI/ML",
      "IoT",
      "Microcontrollers",
      "Cloud Computing",
      "E-ink Display",
      "Wireless Communication"
    ],
    images: [
      "/projects/blandt/hero.png",
      "/projects/blandt/dashboard.png",
      "/projects/blandt/shopping.png",
      "/projects/blandt/system.png"
    ],
    color: "#4CAF50",
    features: [
      {
        title: "Smart Dashboard",
        description: "Comprehensive food inventory tracking and meal planning",
        icon: "📱"
      },
      {
        title: "Shopping Assistant",
        description: "Portable device with real-time shopping guidance",
        icon: "🛒"
      },
      {
        title: "AI Recommendations",
        description: "Intelligent meal suggestions based on inventory",
        icon: "🤖"
      },
      {
        title: "Expiration Tracking",
        description: "Smart alerts for food freshness and usage",
        icon: "⏰"
      },
      {
        title: "Diet Management",
        description: "Personalized dietary preferences and restrictions",
        icon: "🥗"
      }
    ],
    techDetails: {
      stack: {
        frontend: ["React", "Next.js", "TailwindCSS"],
        backend: ["Python", "Java", "TensorFlow"],
        other: ["IoT", "E-ink Display", "Wireless Communication"]
      },
      platforms: ["Tablet Dashboard", "Portable Shopping Assistant"]
    },
    vision: "Creating a sustainable future by revolutionizing how households manage food consumption and waste through smart technology and AI-driven solutions."
  }

  return <ProjectDetail {...projectData} />
} 