'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PixelIcon from '@/components/PixelIcon'
import PageBackground from '@/components/PageBackground'
import Image from 'next/image'

type Section = 'bio' | 'skills' | 'achievements' | 'journey'

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
}

interface JourneyStep {
  year: string
  title: string
  description: string
  icon: string
  color: string
}

export default function About() {
  const [currentSection, setCurrentSection] = useState<Section>('bio')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const skills: Skill[] = [
    { name: 'UI Design', level: 90, icon: '🎨', category: 'Design' },
    { name: 'UX Research', level: 85, icon: '🔍', category: 'Research' },
    { name: 'Wireframing', level: 95, icon: '✏️', category: 'Design' },
    { name: 'Prototyping', level: 88, icon: '📱', category: 'Design' },
    { name: 'Figma', level: 92, icon: '🎯', category: 'Tools' },
    { name: 'Adobe XD', level: 85, icon: '💎', category: 'Tools' },
    { name: 'User Testing', level: 87, icon: '🧪', category: 'Research' },
    { name: 'Design Systems', level: 89, icon: '🏗️', category: 'Design' },
  ]

  const achievements: Achievement[] = [
    {
      title: 'UX Design Excellence',
      description: 'Top performer in UQ Design Program',
      icon: '🏆',
      year: '2023',
      color: '#FFD700'
    },
    {
      title: 'Design Innovation Award',
      description: 'For Spontaneo Project',
      icon: '🌟',
      year: '2023',
      color: '#98FB98'
    },
    {
      title: 'UX Research Publication',
      description: 'Published in Design Journal',
      icon: '📚',
      year: '2022',
      color: '#FF69B4'
    }
  ]

  const journey: JourneyStep[] = [
    {
      year: '2023',
      title: 'UX Designer at UQ',
      description: 'Leading innovative design projects and mentoring junior designers',
      icon: '👩‍💻',
      color: '#4169E1'
    },
    {
      year: '2022',
      title: 'Design Research Lead',
      description: 'Conducted user research for major educational platforms',
      icon: '🔬',
      color: '#9370DB'
    },
    {
      year: '2021',
      title: 'UI/UX Intern',
      description: 'Started my journey in digital product design',
      icon: '🌱',
      color: '#3CB371'
    }
  ]

  const categories = ['All', ...new Set(skills.map(skill => skill.category))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

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
              src="/profile.jpg"
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
          <nav className="flex gap-2 flex-wrap">
            {[
              { key: 'bio', label: 'BIO', icon: '📝' },
              { key: 'skills', label: 'SKILLS', icon: '💪' },
              { key: 'achievements', label: 'ACHIEVEMENTS', icon: '🏆' },
              { key: 'journey', label: 'JOURNEY', icon: '🗺️' }
            ].map((section) => (
              <motion.button 
                key={section.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`gameboy-btn ${currentSection === section.key ? 'bg-[--gb-light] text-[--gb-darkest]' : ''}`}
                onClick={() => setCurrentSection(section.key as Section)}
              >
                <PixelIcon icon={section.icon} label={section.label} />
              </motion.button>
            ))}
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
                      <p>Hi! I'm Bilhuda, a passionate UX designer at UQ.</p>
                      <p>I transform complex challenges into intuitive solutions that delight users and drive business success.</p>
                      <p>My approach combines creativity with user-centered methodologies to create meaningful digital experiences.</p>
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

              {/* Continue with achievements and journey sections... */}
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