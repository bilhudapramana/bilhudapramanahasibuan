'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PixelIcon from '@/components/PixelIcon'
import PageBackground from '@/components/PageBackground'
import Image from 'next/image'

type Section = 'bio' | 'skills' | 'achievements' | 'journey' | 'experience'

interface Skill {
  name: string
  level: number
  icon: string
  category: string
}

interface Achievement {
  title: string
  description: string
  icon: string
  year: string
  color: string
  credential?: string
  logo: string
}

interface JourneyStep {
  year: string
  title: string
  description: string
  icon: string
  color: string
  logo: string
}

interface Experience {
  role: string
  company: string
  location: string
  period: string
  description: string
  icon: string
  color: string
  logo: string
}

export default function About() {
  const [currentSection, setCurrentSection] = useState<Section>('bio')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const skills: Skill[] = [
    { name: 'UX/UI Design', level: 90, icon: '🎨', category: 'Design' },
    { name: 'User Research', level: 85, icon: '🔍', category: 'Research' },
    { name: 'Wireframing', level: 95, icon: '✏️', category: 'Design' },
    { name: 'Prototyping', level: 88, icon: '📱', category: 'Design' },
    { name: 'Figma', level: 92, icon: '🎯', category: 'Tools' },
    { name: 'iOS Development', level: 85, icon: '📱', category: 'Development' },
    { name: 'User Testing', level: 87, icon: '🧪', category: 'Research' },
    { name: 'Design Systems', level: 89, icon: '🏗️', category: 'Design' },
    { name: 'Project Management', level: 88, icon: '📊', category: 'Management' },
    { name: 'Accessibility Design', level: 90, icon: '♿', category: 'Design' }
  ]

  const achievements: Achievement[] = [
    {
      title: 'Product Management: An Introduction',
      description: 'IBM Professional Certificate',
      icon: '🎯',
      year: '2025',
      color: '#4285F4',
      credential: '1YJB0BN3XC9B',
      logo: '/ibm_logo.jpeg'
    },
    {
      title: 'Google UX Design Specialization',
      description: 'Google Professional Certificate',
      icon: '📚',
      year: '2024',
      color: '#34A853',
      credential: 'BOS3Y97NVZPI',
      logo: '/google logo.jpeg'
    },
    {
      title: 'UX Research Excellence',
      description: 'For SPONTANEO Project - 85% Engagement Boost',
      icon: '🏆',
      year: '2024',
      color: '#EA4335',
      logo: '/university_of_queensland_logo.jpeg'
    },
    {
      title: 'Design Innovation Award',
      description: 'For BLANDT Project - 40% Workflow Optimization',
      icon: '🌟',
      year: '2024',
      color: '#FBBC05',
      logo: '/university_of_queensland_logo.jpeg'
    },
    {
      title: 'Accessibility Champion',
      description: 'WCAG 2.1 Implementation for POSTUREBLOOM',
      icon: '♿',
      year: '2024',
      color: '#98FB98',
      logo: '/university_of_queensland_logo.jpeg'
    }
  ]

  const journey: JourneyStep[] = [
    {
      year: '2023 - 2024',
      title: 'The University of Queensland',
      description: 'Bachelor of Information Technology (UX Design)',
      icon: '🎓',
      color: '#4169E1',
      logo: '/university_of_queensland_logo.jpeg'
    },
    {
      year: '2020 - 2024',
      title: 'University of Indonesia',
      description: 'Bachelor of Computer Science',
      icon: '💻',
      color: '#9370DB',
      logo: '/ui logo.jpeg'
    }
  ]

  const experiences: Experience[] = [
    {
      role: 'Shift Team Lead',
      company: "Domino's",
      location: 'Brisbane City, Queensland, Australia',
      period: 'Jun 2023 - Present',
      description: 'Orchestrated seamless shift operations, managed teams, and implemented data-driven improvements. Enhanced customer satisfaction through strategic process optimization and team development.',
      icon: '🏪',
      color: '#1E90FF',
      logo: "/Domino's_pizza_logo.svg.png"
    },
    {
      role: 'Operations and Systems Manager',
      company: 'PT. Ekspor Pradana Nusantara',
      location: 'Kota Bekasi, West Java, Indonesia',
      period: 'Feb 2022 - Oct 2024',
      description: 'Led operational workflow redesign achieving 30% efficiency enhancement. Implemented user-centered methodologies in systems architecture and directed cross-functional teams in process improvement initiatives.',
      icon: '👔',
      color: '#4B0082',
      logo: '/ptekspor.jpeg'
    },
    {
      role: 'Head of Transportation and Venue',
      company: 'COMPFEST',
      location: 'Jakarta, Indonesia',
      period: 'Jan 2022 - Nov 2022',
      description: 'Managed logistics for Indonesia\'s largest student-run IT festival with 8,500+ attendees. Spearheaded transport and venue operations, coordinated 50+ team members, and implemented strategic workflows reducing downtime by 25%.',
      icon: '🚗',
      color: '#FF6B6B',
      logo: '/compfest_logo.jpeg'
    }
  ]

  const categories = ['All', ...new Set(skills.map(skill => skill.category))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const sections = [
    { key: 'bio', label: 'BIO', icon: '📝' },
    { key: 'skills', label: 'SKILLS', icon: '💪' },
    { key: 'achievements', label: 'ACHIEVEMENTS', icon: '🏆' },
    { key: 'journey', label: 'JOURNEY', icon: '🎮' },
    { key: 'experience', label: 'EXPERIENCE', icon: '💼' }
  ].map((section) => (
    <motion.button 
      key={section.key}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`gameboy-btn min-w-[140px] ${
        currentSection === section.key 
          ? 'selected-btn bg-[--gb-light] text-white scale-105' 
          : ''
      }`}
      onClick={() => setCurrentSection(section.key as Section)}
    >
      <PixelIcon icon={section.icon} label={section.label} />
    </motion.button>
  ))

  return (
    <PageBackground pattern="animated">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-4"
      >
        <motion.header 
          className="gameboy-container mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/Avatar.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-[--gb-dark]"
            />
            <div>
              <h1 className="text-2xl pixel-text text-[--gb-darkest]">
                BILHUDA HASIBUAN
              </h1>
              <p className="text-[--gb-dark]">UX Designer & Researcher</p>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-8">
          <nav className="flex flex-wrap gap-4 justify-center">
            {sections}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="gameboy-container min-h-[400px]"
            >
              {currentSection === 'bio' && (
                <motion.div 
                  className="grid md:grid-cols-2 gap-8"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={{ hidden: { x: -20, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                    <h2 className="text-xl pixel-text text-[--gb-darkest] mb-4">About Me</h2>
                    <div className="space-y-4 text-[--gb-dark]">
                      <p>Hi! I'm Bilhuda, a double degree student pursuing Computer Science (UI) and Information Technology with UX Design major (UQ). I combine technical expertise with design thinking to create intuitive digital experiences.</p>
                      
                      <p>My portfolio includes award-winning projects like Spontaneo (iOS app) and PostureBloom (health tech), showcasing my ability to bridge technical implementation with thoughtful UX design. Backed by Google UX Design certifications and hands-on experience in both development and design.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={{ hidden: { x: 20, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                    <h2 className="text-xl pixel-text text-[--gb-darkest] mb-4">Quick Stats</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Projects', value: '15+', icon: '🎯' },
                        { label: 'Experience', value: '3 Years', icon: '⏳' },
                        { label: 'Awards', value: '5', icon: '🏆' },
                        { label: 'Happy Clients', value: '20+', icon: '😊' }
                      ].map((stat) => (
                        <div key={stat.label} className="gameboy-container p-4 text-center">
                          <span className="text-2xl mb-2 block">{stat.icon}</span>
                          <div className="text-[--gb-darkest] font-bold">{stat.value}</div>
                          <div className="text-sm text-[--gb-dark]">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {currentSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`gameboy-btn ${selectedCategory === category ? 'bg-[--gb-light] text-[--gb-darkest]' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div 
                    className="grid md:grid-cols-2 gap-4"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={{
                          hidden: { x: -20, opacity: 0 },
                          show: { x: 0, opacity: 1 }
                        }}
                        className="gameboy-container p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="text-[--gb-darkest]">{skill.name}</span>
                        </div>
                        <div className="relative h-2 bg-[--gb-dark] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute h-full bg-[--gb-light]"
                          />
                        </div>
                        <div className="text-right text-sm text-[--gb-dark] mt-1">
                          {skill.level}%
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {currentSection === 'achievements' && (
                <motion.div 
                  className="grid md:grid-cols-2 gap-4"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.title}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        show: { x: 0, opacity: 1 }
                      }}
                      className="gameboy-container p-4"
                      style={{ borderColor: achievement.color }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={achievement.logo}
                          alt={`${achievement.title} logo`}
                          width={40}
                          height={40}
                          className="rounded-full object-contain p-1"
                          style={{ backgroundColor: 'white' }}
                        />
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3 className="text-lg" style={{ color: achievement.color }}>
                          {achievement.title}
                        </h3>
                      </div>
                      <p className="text-[--gb-dark] mb-2">{achievement.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-[--gb-light]">{achievement.year}</div>
                        {achievement.credential && (
                          <div className="text-xs text-[--gb-dark]">
                            ID: {achievement.credential}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {currentSection === 'journey' && (
                <motion.div 
                  className="space-y-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {journey.map((step, index) => (
                    <motion.div
                      key={step.year}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        show: { x: 0, opacity: 1 }
                      }}
                      className="gameboy-container p-4 flex gap-4"
                      style={{ borderColor: step.color }}
                    >
                      <Image
                        src={step.logo}
                        alt={`${step.title} logo`}
                        width={60}
                        height={60}
                        className="rounded-full object-contain p-1"
                        style={{ backgroundColor: 'white' }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg" style={{ color: step.color }}>
                            {step.title}
                          </h3>
                          <span className="text-sm text-[--gb-light]">({step.year})</span>
                        </div>
                        <p className="text-[--gb-dark]">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {currentSection === 'experience' && (
                <motion.div 
                  className="space-y-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.role}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        show: { x: 0, opacity: 1 }
                      }}
                      className="gameboy-container p-4 flex gap-4"
                      style={{ borderColor: experience.color }}
                    >
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={60}
                        height={60}
                        className="rounded-full object-contain p-1"
                        style={{ backgroundColor: 'white' }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg" style={{ color: experience.color }}>
                            {experience.role}
                          </h3>
                          <span className="text-sm text-[--gb-light]">({experience.period})</span>
                        </div>
                        <p className="text-[--gb-dark]">{experience.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/" className="gameboy-btn inline-flex items-center gap-2">
            <span>←</span>
            <span>Back Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </PageBackground>
  )
} 