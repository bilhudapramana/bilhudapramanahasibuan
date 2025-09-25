'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Game Designer', 'World Builder', 'System Alchemist', 'Combat Scripter', 'Lore Weaver']

const NAV_ITEMS = [
  { label: 'Games', href: '#games' },
  { label: 'Quest Log', href: '#experience' },
  { label: 'Player Chatter', href: '#community' },
  { label: 'Contact', href: '#contact' }
]

const PROJECTS = [
  {
    id: 1,
    title: 'NEON DRIFT: HYPERLANE',
    description:
      'Arcade roguelite racer set inside a synthwave metropolis. Procedural highways, reactive soundtrack and co-op rivalries keep the flow electric.',
    role: 'Game Director & Systems Designer',
    year: '2024',
    impact: '3.2M pilots',
    tags: ['UE5', 'Procedural Tracks', 'Online Co-op'],
    accent: 'linear-gradient(135deg, rgba(255,72,173,0.7), rgba(72,209,255,0.4))'
  },
  {
    id: 2,
    title: 'ASTRAL HAVEN',
    description:
      'Cozy sci-farm colony with day-night raids. Blend of tactile farming loops, base defense tactics and heartwarming NPC storylines.',
    role: 'Creative Producer',
    year: '2023',
    impact: '97% player sentiment',
    tags: ['Hybrid Casual', 'Live Ops', 'Narrative Tools'],
    accent: 'linear-gradient(135deg, rgba(135,255,158,0.45), rgba(44,232,224,0.45))'
  },
  {
    id: 3,
    title: 'CHROMA RAID',
    description:
      'Stylized four-player heist set across dimension-shifting museums. Rhythm combat meets puzzle stealth with streamer-friendly tools.',
    role: 'Multiplayer Experience Lead',
    year: '2023',
    impact: 'Top 5 on Twitch',
    tags: ['Crossplay', 'Spectator Mode', 'Anti-Tilt UX'],
    accent: 'linear-gradient(135deg, rgba(255,180,84,0.5), rgba(255,94,247,0.4))'
  },
  {
    id: 4,
    title: 'VOIDSONG: ECLIPSE',
    description:
      'Narrative rhythm shooter where spells are composed live. Features adaptive AI enemies and player-driven soundtrack remixes.',
    role: 'Experience Architect',
    year: '2022',
    impact: 'Game Awards finalist',
    tags: ['Music Systems', 'Accessibility', 'Haptics'],
    accent: 'linear-gradient(135deg, rgba(112,123,255,0.55), rgba(255,105,120,0.4))'
  }
]

const STATS = [
  {
    id: 'players',
    value: '15M+',
    label: 'Players traversed',
    description: 'Across neon racers, cosmic raids and cozy life-sims with bite.'
  },
  {
    id: 'prototypes',
    value: '120',
    label: 'Playable prototypes',
    description: 'Rapid-fire experiments to nail feel, balance and UI readability.'
  },
  {
    id: 'ops',
    value: '48h',
    label: 'Average patch turnaround',
    description: 'Live ops rituals keep every world balanced and buzzing.'
  }
]

const EXPERIENCES = [
  {
    id: 1,
    company: 'Nebula Forge Studios',
    role: 'Creative Director',
    period: '2022 — Present',
    summary:
      'Leading a strike team shipping multiplatform co-op epics with Unreal Engine 5, bespoke tooling and a relentless playtest cadence.',
    focus: ['UE5', 'Live Ops', 'Cinematic UX']
  },
  {
    id: 2,
    company: 'Solar Arcade Collective',
    role: 'Lead Systems Designer',
    period: '2019 — 2022',
    summary:
      'Balanced economy loops and combat flows for award-winning indie hits while co-directing community tournament programs.',
    focus: ['Systems Design', 'Multiplayer', 'Analytics']
  },
  {
    id: 3,
    company: 'Freelance Raids',
    role: 'Prototype Mercenary',
    period: '2016 — 2019',
    summary:
      'Partnered with dreamers to turn napkin sketches into jaw-dropping vertical slices that closed funding rounds.',
    focus: ['Rapid Prototyping', 'Level Design', 'Unity']
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Bilhuda turned our scribbles into a living, breathing world. Every update lands like a community event and our players feel seen.',
    name: 'Nova Liang',
    title: 'CEO, Nebula Forge'
  },
  {
    id: 2,
    quote:
      'The combat feel went from clunky to legendary in two sprints. Bilhuda is the raid leader every studio wants steering the ship.',
    name: 'Rex Morales',
    title: 'Game Director, Solar Arcade'
  },
  {
    id: 3,
    quote:
      'Their prototypes are basically magic tricks — players gasp, investors lean in and suddenly we have a roadmap that sings.',
    name: 'Ivy Loren',
    title: 'Producer, Indie Megabooth'
  }
]

const FLOATING_ORBS = [
  {
    id: 1,
    size: 420,
    top: '8%',
    left: '6%',
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,64,172,0.6), transparent 65%)'
  },
  {
    id: 2,
    size: 560,
    top: '52%',
    left: '72%',
    background:
      'radial-gradient(circle at 70% 40%, rgba(60,245,255,0.5), transparent 68%)'
  },
  {
    id: 3,
    size: 380,
    top: '78%',
    left: '18%',
    background:
      'radial-gradient(circle at 50% 50%, rgba(158,118,255,0.5), transparent 62%)'
  }
]

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState<'default' | 'text'>('default')
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }]
        if (newPositions.length > 12) {
          return newPositions.slice(newPositions.length - 12)
        }
        return newPositions
      })
    }

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0
      setScrollProgress(scrolled)
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault()
        setIsDarkMode((prev) => !prev)
      }
      if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault()
        setShowAboutModal((prev) => !prev)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const refinedScroll = scrollProgress / 100
  const activeProject = hoveredProject
    ? PROJECTS.find((project) => project.id === hoveredProject) ?? null
    : null

  const setCursorLabel = (label: string) => {
    setCursorText(label)
    setCursorVariant('text')
  }

  const resetCursor = () => {
    setCursorText('')
    setCursorVariant('default')
  }

  const toggleAboutModal = () => setShowAboutModal((prev) => !prev)

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <div
        className="cursor-outline"
        style={{
          left: `${mousePosition.x - 18}px`,
          top: `${mousePosition.y - 18}px`,
          transform: `scale(${cursorVariant === 'text' ? 1.6 : 1})`
        }}
      >
        {cursorVariant === 'text' && <span className="cursor-text">{cursorText}</span>}
      </div>

      {trailPositions.map((pos, index) => (
        <motion.div
          key={`${pos.x}-${pos.y}-${index}`}
          className="cursor-trail"
          initial={{ scale: 0.8, opacity: 0.9, x: pos.x, y: pos.y }}
          animate={{
            scale: 0,
            opacity: 0,
            x: pos.x,
            y: pos.y
          }}
          transition={{ duration: 0.6, delay: index * 0.02 }}
        />
      ))}

      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="aurora" style={{ transform: `translateY(${refinedScroll * -40}px)` }} />
      <div className="noise-overlay" />

      {FLOATING_ORBS.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="floating-orb"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.background
          }}
          animate={{
            x: [0, index % 2 === 0 ? 18 : -18, 0],
            y: [0, index % 2 === 0 ? -24 : 24, 0]
          }}
          transition={{ duration: 12 + index * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.nav
        className="primary-nav glass-panel"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: refinedScroll * -20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3">
          <motion.a
            href="#top"
            className="font-mono text-xs tracking-[0.3em] uppercase"
            whileHover={{ x: 4 }}
            onMouseEnter={() => setCursorLabel('Spawn point')}
            onMouseLeave={resetCursor}
          >
            Bilhuda
          </motion.a>
          <span className="nav-divider" />
          <span className="text-xs uppercase opacity-60">Gameverse Architect</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-sm font-mono uppercase tracking-[0.2em] nav-link"
              whileHover={{ y: -4 }}
              onMouseEnter={() => setCursorLabel(item.label)}
              onMouseLeave={resetCursor}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            className="pill-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleAboutModal}
            onMouseEnter={() => setCursorLabel('Lore Terminal')}
            onMouseLeave={resetCursor}
          >
            Lore
          </motion.button>
          <motion.button
            className="icon-button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorLabel(isDarkMode ? 'Daycycle' : 'Nightcycle')}
            onMouseLeave={resetCursor}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.button>
        </div>
        <div className="mobile-nav md:hidden">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              className="mobile-nav-link"
              onMouseEnter={() => setCursorLabel(item.label)}
              onMouseLeave={resetCursor}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      <main className="page-content pt-48 pb-32 space-y-32" id="top">
        <motion.section
          className="container mx-auto px-4"
          id="home"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-12">
              <motion.span
                className="hero-badge"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              >
                <span className="badge-dot" />
                Engineering neon-drenched adventures
              </motion.span>
              <motion.h1
                className="text-6xl md:text-7xl xl:text-8xl font-bold leading-tight gradient-text"
                style={{ transform: `translateY(${refinedScroll * -14}px)` }}
              >
                BILHUDA PRAMANA
                <span className="block text-2xl md:text-3xl font-normal tracking-[0.4em] mt-4">
                  GAMEVERSE MODE
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-2xl leading-relaxed text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
              >
                A game <span className="word-morph">{WORDS[currentWordIndex]}</span> forging universes
                where combat feels buttery, UI stays legible at warp speed and communities feel at
                home. Every particle, sound cue and difficulty spike is tuned for maximum hype.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#games"
                  className="cta-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('Enter game vault')}
                  onMouseLeave={resetCursor}
                >
                  Launch the worlds
                </motion.a>
                <motion.a
                  href="mailto:hello@bilhuda.com"
                  className="ghost-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('Send transmission')}
                  onMouseLeave={resetCursor}
                >
                  Drop a transmission
                </motion.a>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="stat-card glass-panel"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
                    onMouseEnter={() => setCursorLabel(stat.label)}
                    onMouseLeave={resetCursor}
                  >
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <p className="stat-description">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="hero-panel glass-panel"
              style={{ transform: `translateY(${refinedScroll * 30}px)` }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="hero-grid" aria-hidden />
              <div className="relative space-y-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">Build pipeline</p>
                  <motion.span
                    className="accent-pill"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Patch 1.72 live
                  </motion.span>
                </div>
                <div className="space-y-5">
                  {['Concept', 'Prototype', 'Playtest', 'Live Ops'].map((step, index) => (
                    <motion.div
                      key={step}
                      className="process-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    >
                      <span className="process-index">0{index + 1}</span>
                      <span className="process-step">{step}</span>
                      <motion.span
                        className="process-meter"
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 6, repeat: Infinity, delay: index * 0.6 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Currently</p>
                    <p className="text-base font-medium">
                      Directing co-op chaos at <span className="highlight-text">Nebula Forge</span>
                    </p>
                  </div>
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Availability</p>
                    <p className="text-base font-medium">Accepting legendary party invites</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="games"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Featured Worlds</span>
            <h2 className="section-title">Playtested experiences built for pure adrenaline</h2>
            <p className="section-description">
              Each release blends cinematic spectacle with systems depth — crafted for teams,
              streamers and solo explorers chasing a new obsession.
            </p>
          </div>
          <div className="grid gap-10 xl:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card glass-panel"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -12, rotateX: 2, rotateY: -2 }}
                onMouseEnter={() => {
                  setHoveredProject(project.id)
                  setCursorLabel('Inspect game')
                }}
                onMouseLeave={() => {
                  setHoveredProject(null)
                  resetCursor()
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="project-eyebrow">{project.year}</p>
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  <motion.span
                    className="project-impact"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {project.impact}
                  </motion.span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span>{project.role}</span>
                  <span>Party lead</span>
                </div>
                <div className="flex flex-wrap gap-3 pt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.div
                  className="project-card-highlight"
                  style={{ background: project.accent }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Quest Log</span>
            <h2 className="section-title">Leading squads through cinematic development cycles</h2>
            <p className="section-description">
              From indie dream teams to AAA strike forces, I bridge creative chaos and live ops
              discipline to keep every release humming.
            </p>
          </div>
          <div className="timeline">
            {EXPERIENCES.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="timeline-item glass-panel"
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onMouseEnter={() => setCursorLabel(experience.company)}
                onMouseLeave={resetCursor}
              >
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{experience.role}</h3>
                    <span>{experience.period}</span>
                  </div>
                  <p className="timeline-company">{experience.company}</p>
                  <p className="timeline-summary">{experience.summary}</p>
                  <div className="timeline-tags">
                    {experience.focus.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="community"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Player Chatter</span>
            <h2 className="section-title">Voices from the guilds and production floors</h2>
            <p className="section-description">
              Developers, community leads and players reflecting on the raids, the sprints and the
              unforgettable launch nights we shared.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.id}
                className="testimonial-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                onMouseEnter={() => setCursorLabel(testimonial.name)}
                onMouseLeave={resetCursor}
              >
                <p>“{testimonial.quote}”</p>
                <footer>
                  <span className="testimonial-name">{testimonial.name}</span>
                  <span className="testimonial-title">{testimonial.title}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="cta-card glass-panel"
            whileHover={{ scale: 1.01 }}
            onMouseEnter={() => setCursorLabel('Open comms')}
            onMouseLeave={resetCursor}
          >
            <div className="space-y-6">
              <span className="section-eyebrow">Open comms channel</span>
              <h2 className="section-title">Assemble the next legendary drop together?</h2>
              <p className="section-description">
                Bring me your wildest mechanics, lore fragments or community dreams. I thrive on
                co-piloting teams who crave spectacle, retention and heart.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <motion.a
                href="mailto:hello@bilhuda.com"
                className="cta-button"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => setCursorLabel('Send transmission')}
                onMouseLeave={resetCursor}
              >
                hello@bilhuda.com
              </motion.a>
              <div className="flex gap-4">
                {['Discord', 'Twitch', 'Itch.io'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="ghost-link"
                    whileHover={{ y: -4 }}
                    onMouseEnter={() => setCursorLabel(item)}
                    onMouseLeave={resetCursor}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="container mx-auto px-4 text-sm text-muted text-center pt-12">
          © {new Date().getFullYear()} Bilhuda Pramana. Respawned nightly in the gameverse.
        </footer>
      </main>

      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card glass-panel"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 180 }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold">Lore drop: Bilhuda</h2>
                  <p className="text-base leading-relaxed text-muted">
                    I sculpt neon worlds that feel alive — from cinematic racers to lo-fi cozy
                    sims. Years of systems design, animation tinkering and community rituals help
                    me ship experiences that feel like Saturday-night raids with friends.
                  </p>
                  <p className="text-base leading-relaxed text-muted">
                    When AFK I mod classic JRPGs, record ambient synth jams and host playtest
                    nights in Jakarta’s indie arcade scene.
                  </p>
                  <div className="modal-skills">
                    {[
                      'Game Direction',
                      'Combat Design',
                      'Live Ops',
                      'Sound Scripting',
                      'Shader Art',
                      'Community Rituals'
                    ].map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <motion.button
                  className="icon-button"
                  onClick={toggleAboutModal}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setCursorLabel('Seal portal')}
                  onMouseLeave={resetCursor}
                  aria-label="Close portal"
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            className="project-preview"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x + 24,
              y: mousePosition.y + 24
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <span className="text-xs uppercase tracking-[0.4em] opacity-60">Hype meter</span>
            <p className="text-sm font-semibold">{activeProject.impact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="keyboard-hint">Press Ctrl+D for nightcycle · Ctrl+A for the lore drop</div>
    </>
  )
}
