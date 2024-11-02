'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PageBackground from '@/components/PageBackground'

const socialLinks = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bilhuda-hasibuan-3556441b9/',
    icon: '💼',
    color: '#0077B5',
    username: 'Bilhuda Hasibuan'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/bilhudapramana',
    icon: '🐱',
    color: '#333333',
    username: '@bilhudapramana'
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/bilhudapramana/',
    icon: '📸',
    color: '#E1306C',
    username: '@bilhudapramana'
  }
]

export default function Contact() {
  return (
    <PageBackground pattern="animated">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-4"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="gameboy-container mb-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            <h1 className="text-2xl pixel-text text-[--gb-darkest] mb-4">CONNECT WITH ME</h1>
            <p className="text-[--gb-dark]">Find me on these platforms!</p>
          </motion.div>

          <motion.div 
            className="gameboy-container space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="gameboy-container p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ borderColor: social.color }}
                >
                  <span className="text-3xl">{social.icon}</span>
                  <div>
                    <h2 className="text-xl pixel-text" style={{ color: social.color }}>
                      {social.platform}
                    </h2>
                    <p className="text-[--gb-dark]">{social.username}</p>
                  </div>
                  <motion.span 
                    className="ml-auto text-2xl text-[--gb-dark]"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/" className="gameboy-btn inline-flex items-center gap-2">
              <span>←</span>
              <span>Back Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </PageBackground>
  )
} 