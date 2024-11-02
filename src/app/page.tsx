'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-animated">
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gameboy-container max-w-2xl w-full mx-auto relative z-10"
      >
        <div className="text-center space-y-6 text-[--gb-darkest]">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 mx-auto"
          >
            <Image
              src="/Avatar.png"
              alt="Bilhuda's Avatar"
              fill
              className="object-contain floating-icon"
              priority
            />
          </motion.div>

          <h1 className="text-2xl pixel-text">BILHUDA</h1>
          <p className="text-sm">UX DESIGNER</p>
          <p className="text-xs italic">Hello! I create user-centered experiences</p>
          
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[--gb-dark]"
          >
            PRESS START
          </motion.div>
          
          <div className="flex flex-col gap-4 mt-8">
            {[
              { href: '/projects', label: 'PROJECTS', icon: '🎮' },
              { href: '/about', label: 'ABOUT', icon: '👤' },
              { href: '/contact', label: 'CONTACT', icon: '✉️' }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href} 
                  className="gameboy-btn w-full flex items-center justify-center gap-2"
                >
                  <span className="pixel-text">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* LinkedIn Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="https://www.linkedin.com/in/bilhuda-hasibuan-3556441b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="gameboy-btn w-full flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#006396]"
              >
                <span className="pixel-text">💼</span>
                <span>LINKEDIN</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
