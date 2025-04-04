'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  link: string
  color: string
  tags: string[]
}

export default function ProjectCard({ 
  title, 
  description, 
  link, 
  color,
  tags 
}: ProjectCardProps) {
  return (
    <Link href={link}>
      <motion.div 
        className="gameboy-container overflow-hidden"
        style={{ borderColor: color }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            className="w-full md:w-1/3 relative h-[200px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-full"
                style={{ backgroundColor: `${color}20` }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <motion.span
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tags[0] === 'UX Design' ? '🎨' : 
                     tags[0] === 'Game Design' ? '🎮' : 
                     tags[0] === 'IoT' ? '🌐' : 
                     tags[0] === 'AI/ML' ? '🤖' : '💡'}
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="w-full md:w-2/3">
            <motion.h2 
              className="text-2xl pixel-text mb-2"
              style={{ color }}
            >
              {title}
            </motion.h2>
            <p className="text-[--gb-dark] mb-4">{description}</p>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${color}20`,
                    color: color
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.div 
              className="mt-4 text-[--gb-dark] flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span>View Project</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 