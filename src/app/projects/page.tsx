'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import PageBackground from '@/components/PageBackground'

export default function Projects() {
  const projects = [
    {
      title: 'SPONTANEO',
      description: 'Event Planning & Decision Making App',
      image: '/projects/spontaneo.png',
      link: '/projects/spontaneo',
      color: '#4A90E2',
      tags: ['UX Design', 'Mobile App', 'User Research']
    },
    {
      title: 'DINODASH',
      description: 'Gamified Learning Experience Platform',
      image: '/projects/dinodash.png',
      link: '/projects/dinodash',
      color: '#50C878',
      tags: ['Game Design', 'Education', 'Interactive']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <PageBackground pattern="animated">
      <motion.div 
        className="max-w-4xl mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="gameboy-container mb-8 bg-opacity-90"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-3xl pixel-text text-[--gb-darkest] mb-4 tracking-wider">
            MY PROJECTS
          </h1>
          <p className="text-[--gb-dark] text-lg">
            Select a project to explore the details
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { x: -20, opacity: 0 },
                show: { x: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/" 
            className="gameboy-btn inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <span className="text-lg">←</span>
            <span>Back Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </PageBackground>
  )
} 