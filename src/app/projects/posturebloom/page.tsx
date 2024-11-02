'use client'
import { motion } from 'framer-motion'
import ProjectDetail from '@/components/ProjectDetail'

export default function PostureBloom() {
  const projectData = {
    title: "POSTUREBLOOM",
    description: "A smart desktop garden that combines posture monitoring with a rewarding plant growth experience, helping users maintain healthy sitting habits.",
    challenge: "Modern workers face increasing health risks from prolonged sitting and poor posture, while existing solutions often rely on disruptive notifications.",
    solution: "Developed an innovative system combining computer vision for posture detection with gentle vibration feedback and a rewarding plant growth experience.",
    impact: [
      "Reduced poor posture incidents by 60%",
      "Increased user engagement through plant rewards",
      "Non-disruptive feedback system",
      "Improved workplace wellness"
    ],
    technologies: [
      "Computer Vision",
      "Machine Learning",
      "Arduino",
      "Python",
      "3D Printing",
      "IoT"
    ],
    images: [
      "/projects/posturebloom/hero.png",
      "/projects/posturebloom/system.png",
      "/projects/posturebloom/interface.png",
      "/projects/posturebloom/prototype.png"
    ],
    color: "#4CAF50",
    features: [
      {
        title: "Smart Posture Detection",
        description: "AI-powered camera monitoring for real-time posture analysis",
        icon: "📷"
      },
      {
        title: "Gentle Feedback",
        description: "Non-disruptive vibration cushion for posture correction",
        icon: "💺"
      },
      {
        title: "Growing Rewards",
        description: "Physical plant growth system tied to good posture",
        icon: "🌱"
      },
      {
        title: "Aromatherapy",
        description: "Custom fragrances released as achievement rewards",
        icon: "🌸"
      },
      {
        title: "Data Insights",
        description: "Detailed analytics of sitting habits and improvements",
        icon: "📊"
      }
    ],
    techDetails: {
      repository: "https://github.com/bilhudapramana/PostureBloom",
      stack: {
        frontend: ["Python", "Qt", "OpenCV"],
        backend: ["TensorFlow", "Arduino"],
        other: ["3D Printing", "IoT Sensors", "Raspberry Pi"]
      },
      platforms: ["Desktop", "IoT Device"]
    },
    vision: "Creating a workspace where maintaining good posture becomes a natural, rewarding experience that nurtures both physical health and environmental consciousness."
  }

  return <ProjectDetail {...projectData} />
} 