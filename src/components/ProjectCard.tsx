'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  color: string
  tags: string[]
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
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
            className="w-full md:w-1/3 relative h-[200px]"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
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