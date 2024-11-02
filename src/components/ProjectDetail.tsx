'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import PageBackground from '@/components/PageBackground'

interface Feature {
  title: string
  description: string
  icon: string
}

interface TeamMember {
  name: string
  role: string
  github: string
}

interface TechDetails {
  repository?: string
  stack: {
    frontend: string[]
    backend: string[]
    other: string[]
  }
  platforms: string[]
}

interface ProjectDetailProps {
  title: string
  description: string
  challenge: string
  solution: string
  impact: string[]
  technologies: string[]
  images: string[]
  color: string
  features: Feature[]
  team?: TeamMember[]
  techDetails?: TechDetails
  vision?: string
}

export default function ProjectDetail({
  title,
  description,
  challenge,
  solution,
  impact,
  technologies,
  images,
  color,
  features,
  team,
  techDetails,
  vision
}: ProjectDetailProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <PageBackground pattern="animated">
      <motion.div 
        className="min-h-screen p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <motion.div 
            className="sticky top-4 z-50 mb-8 flex justify-between items-center"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            <Link 
              href="/projects" 
              className="gameboy-btn inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to Projects</span>
            </Link>
            
            {techDetails?.repository && (
              <a 
                href={techDetails.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="gameboy-btn inline-flex items-center gap-2"
              >
                <span>GitHub</span>
                <span>→</span>
              </a>
            )}
          </motion.div>

          {/* Hero Section */}
          <motion.header 
            className="gameboy-container mb-12 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative z-10 p-8">
              <motion.h1 
                className="text-4xl pixel-text mb-4"
                style={{ color }}
              >
                {title}
              </motion.h1>
              <motion.p className="text-xl text-[--gb-dark] max-w-2xl">
                {description}
              </motion.p>
            </div>
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `url(${images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </motion.header>

          {/* Features Grid */}
          <motion.section 
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={itemVariants}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="gameboy-container hover:transform hover:scale-105 transition-all duration-300"
                whileHover={{ y: -5 }}
                style={{ borderColor: color }}
              >
                <span className="text-4xl mb-4 block floating-icon">{feature.icon}</span>
                <h3 className="text-xl pixel-text mb-2" style={{ color }}>
                  {feature.title}
                </h3>
                <p className="text-[--gb-dark]">{feature.description}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* Challenge & Solution */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={itemVariants}
          >
            {[
              { title: 'The Challenge', content: challenge, icon: '🎯' },
              { title: 'The Solution', content: solution, icon: '💡' }
            ].map((section) => (
              <motion.div
                key={section.title}
                className="gameboy-container relative"
                whileHover={{ scale: 1.02 }}
                style={{ borderColor: color }}
              >
                <span className="text-3xl mb-4 block">{section.icon}</span>
                <h2 className="text-2xl pixel-text mb-4" style={{ color }}>
                  {section.title}
                </h2>
                <p className="text-[--gb-dark]">{section.content}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* Impact & Technologies */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.section 
              variants={itemVariants}
              className="gameboy-container"
              style={{ borderColor: color }}
            >
              <span className="text-3xl mb-4 block">📈</span>
              <h2 className="text-2xl pixel-text mb-4" style={{ color }}>
                Impact
              </h2>
              <ul className="space-y-4">
                {impact.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-[--gb-dark]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-xl" style={{ color }}>→</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            <motion.section 
              variants={itemVariants}
              className="gameboy-container"
              style={{ borderColor: color }}
            >
              <span className="text-3xl mb-4 block">🛠️</span>
              <h2 className="text-2xl pixel-text mb-4" style={{ color }}>
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${color}20`,
                      color: color,
                      border: `2px solid ${color}`
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Team Section (if available) */}
          {team && (
            <motion.section 
              className="gameboy-container mb-12"
              variants={itemVariants}
              style={{ borderColor: color }}
            >
              <span className="text-3xl mb-4 block">👥</span>
              <h2 className="text-2xl pixel-text mb-6" style={{ color }}>
                Team
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {team.map((member) => (
                  <motion.div
                    key={member.name}
                    className="gameboy-container p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-lg mb-2" style={{ color }}>{member.name}</h3>
                    <p className="text-[--gb-dark] text-sm mb-2">{member.role}</p>
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[--gb-light] hover:text-[--gb-dark]"
                    >
                      @{member.github}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Image Gallery */}
          <motion.section variants={itemVariants} className="space-y-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative h-[500px] rounded-lg overflow-hidden gameboy-container"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                style={{ borderColor: color }}
              >
                <Image
                  src={image}
                  alt={`${title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.section>

          {/* Vision Statement (if available) */}
          {vision && (
            <motion.section 
              className="gameboy-container mt-12 text-center"
              variants={itemVariants}
              style={{ borderColor: color }}
            >
              <span className="text-3xl mb-4 block">🚀</span>
              <h2 className="text-2xl pixel-text mb-4" style={{ color }}>
                Vision
              </h2>
              <p className="text-[--gb-dark] text-lg italic">{vision}</p>
            </motion.section>
          )}
        </div>
      </motion.div>
    </PageBackground>
  )
} 