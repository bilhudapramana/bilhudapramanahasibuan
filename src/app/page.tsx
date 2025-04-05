'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([])
  
  const constraintsRef = useRef(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add position to trail with a maximum of 10 positions
      setTrailPositions(prev => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }]
        if (newPositions.length > 10) {
          return newPositions.slice(newPositions.length - 10)
        }
        return newPositions
      })
    }

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100
      setScrollProgress(scrolled)
    }

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault()
        setIsDarkMode(prev => !prev)
      }
      if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault()
        setShowAboutModal(prev => !prev)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('scroll', updateScrollProgress)
    window.addEventListener('keydown', handleKeyPress)

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isDarkMode])

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      description: "Improving user flow and conversion rates",
      role: "Lead UX Designer",
      year: "2024"
    },
    {
      id: 2,
      title: "Healthcare App",
      description: "Making healthcare accessible",
      role: "UX Research & Design",
      year: "2023"
    },
    {
      id: 3,
      title: "Financial Dashboard",
      description: "Simplifying complex data",
      role: "Information Architecture",
      year: "2023"
    }
  ]

  const enterButton = () => {
    setCursorText('View')
    setCursorVariant('text')
  }

  const leaveButton = () => {
    setCursorText('')
    setCursorVariant('default')
  }

  const words = ['Designer', 'Thinker', 'Creator', 'Developer', 'UX Expert']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal)
  }

  return (
    <>
      {/* Cursor Elements */}
      <div 
        className="cursor-dot" 
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <div 
        className="cursor-outline" 
        style={{ 
          left: `${mousePosition.x - 15}px`, 
          top: `${mousePosition.y - 15}px`,
          transform: `scale(${cursorVariant === 'text' ? 1.5 : 1})`
        }}
      >
        {cursorVariant === 'text' && (
          <span className="cursor-text">{cursorText}</span>
        )}
      </div>

      {/* Cursor trails */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="cursor-trail"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ 
            scale: 0,
            opacity: 0,
            x: pos.x,
            y: pos.y
          }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
        />
      ))}

      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="page-content space-y-32 py-24">
        {/* Theme toggle */}
        <button 
          className="fixed top-24 right-8 z-40 p-2 bg-off-white dark:bg-off-black border border-off-black dark:border-off-white rounded-full"
          onClick={() => setIsDarkMode(prev => !prev)}
          onMouseEnter={() => setCursorText('Theme')}
          onMouseLeave={leaveButton}
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Hero Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-lg mb-8 font-mono reveal-text">Hello, I am</p>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 hover:text-off-yellow transition-colors cursor-default reveal-text"
              whileHover={{ letterSpacing: "2px" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              BILHUDA PRAMANA
            </motion.h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-70 hover:opacity-100 transition-opacity reveal-text">
              A UX <span className="word-morph">{words[currentWordIndex]}</span> FOCUSED ON CREATING DIGITAL EXPERIENCES THAT ARE 
              BOTH FUNCTIONAL AND MEANINGFUL. I BELIEVE IN THE POWER OF 
              SIMPLICITY AND USER-CENTERED DESIGN.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="container mx-auto px-4">
          <h2 className="text-2xl font-mono mb-16 reveal-text">Selected Projects</h2>
          <motion.div className="space-y-8" ref={constraintsRef}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group border-b border-off-black/10 dark:border-off-white/10 pb-8 project-item"
                onMouseEnter={() => {
                  setHoveredProject(project.id)
                  setCursorText('Drag')
                  setCursorVariant('text')
                }}
                onMouseLeave={() => {
                  setHoveredProject(null)
                  setCursorText('')
                  setCursorVariant('default')
                }}
                drag="x"
                dragConstraints={constraintsRef}
                whileDrag={{ scale: 1.05 }}
                whileHover={{
                  x: 20,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-baseline justify-between group-hover:text-off-yellow transition-colors">
                  <h3 className="text-4xl font-bold mask-reveal">{project.title}</h3>
                  <p className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{project.year}</p>
                </div>
                <div className="mt-4 space-y-2 overflow-hidden">
                  <p className="text-xl transform translate-y-0 group-hover:translate-y-[-8px] transition-transform">
                    {project.description}
                  </p>
                  <p className="text-lg opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-70 transition-all">
                    {project.role}
                  </p>
                </div>

                {/* Tooltip that follows mouse */}
                {hoveredProject === project.id && (
                  <div 
                    className="inline-tooltip"
                    style={{ 
                      left: `${mousePosition.x + 20}px`, 
                      top: `${mousePosition.y + 20}px` 
                    }}
                  >
                    Drag to explore
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 
              className="text-2xl font-mono mb-8 reveal-text cursor-pointer"
              onClick={toggleAboutModal}
              onMouseEnter={() => setCursorText('Click')}
              onMouseLeave={leaveButton}
            >
              About
            </h2>
            
            {/* Crossword-style about section */}
            <div className="crossword-grid mb-8">
              <div className="crossword-row">
                <div className="crossword-cell active">D</div>
                <div className="crossword-cell active">E</div>
                <div className="crossword-cell active">S</div>
                <div className="crossword-cell active">I</div>
                <div className="crossword-cell active">G</div>
                <div className="crossword-cell active">N</div>
                <div className="crossword-cell active">E</div>
                <div className="crossword-cell active">R</div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">E</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">V</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell active">U</div>
                <div className="crossword-cell active">X</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">E</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">L</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell active">C</div>
                <div className="crossword-cell active">O</div>
                <div className="crossword-cell active">D</div>
                <div className="crossword-cell active">E</div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">O</div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
                <div className="crossword-cell"></div>
              </div>
              <div className="crossword-row">
                <div className="crossword-cell active">P</div>
                <div className="crossword-cell active">A</div>
                <div className="crossword-cell active">S</div>
                <div className="crossword-cell active">S</div>
                <div className="crossword-cell active">I</div>
                <div className="crossword-cell active">O</div>
                <div className="crossword-cell active">N</div>
                <div className="crossword-cell"></div>
              </div>
            </div>
            
            <div className="space-y-6 text-xl">
              <motion.p 
                className="hover:text-off-yellow transition-colors reveal-text interactive-text"
                whileHover={{ scale: 1.02 }}
              >
                I SPECIALIZE IN CREATING INTUITIVE AND ACCESSIBLE DIGITAL EXPERIENCES.
                MY APPROACH COMBINES USER RESEARCH, ITERATIVE DESIGN, AND A DEEP
                UNDERSTANDING OF HUMAN BEHAVIOR.
              </motion.p>
              <motion.p 
                className="hover:text-off-yellow transition-colors reveal-text interactive-text"
                whileHover={{ scale: 1.02 }}
              >
                WITH 5+ YEARS OF EXPERIENCE IN UX DESIGN, I'VE WORKED ON PROJECTS
                RANGING FROM E-COMMERCE PLATFORMS TO HEALTHCARE APPLICATIONS.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-mono mb-8 reveal-text">Let's Connect</h2>
            <div className="space-y-4">
              <motion.a 
                href="mailto:hello@bilhuda.com" 
                className="block text-2xl hover:text-off-yellow transition-all reveal-text email-link"
                whileHover={{ x: 20 }}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                hello@bilhuda.com
              </motion.a>
              <div className="flex space-x-8 text-lg reveal-text">
                <motion.a 
                  href="#" 
                  className="hover-underline hover:text-off-yellow transition-colors"
                  whileHover={{ y: -5 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  LinkedIn
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover-underline hover:text-off-yellow transition-colors"
                  whileHover={{ y: -5 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  Twitter
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover-underline hover:text-off-yellow transition-colors"
                  whileHover={{ y: -5 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  Read.cv
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <motion.div 
          className="fixed inset-0 bg-off-black/80 backdrop-blur-md z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-off-white dark:bg-off-black text-off-black dark:text-off-white p-8 max-w-2xl rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">More About Me</h2>
              <button 
                onClick={toggleAboutModal}
                className="text-2xl"
                onMouseEnter={() => setCursorText('Close')}
                onMouseLeave={leaveButton}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p>
                I am a UX Designer with a passion for creating digital experiences that are both functional and delightful. 
                My background in psychology allows me to understand human behavior and apply these insights to design.
              </p>
              <p>
                When I'm not designing, you can find me exploring new technologies, reading design books, or hiking in nature.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">UX Design</span>
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">UI Design</span>
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">User Research</span>
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">Prototyping</span>
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">Figma</span>
                  <span className="px-3 py-1 bg-off-yellow text-off-black rounded-full">HTML/CSS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 text-xs font-mono opacity-50">
        Press Ctrl+D for dark mode | Ctrl+A for about modal
      </div>
    </>
  )
} 