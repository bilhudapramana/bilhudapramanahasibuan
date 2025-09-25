'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = [
  'UX Designer',
  'UX Researcher',
  'Product Designer',
  'Service Designer',
  'Operations Strategist'
]

const NAV_ITEMS = [
  { label: 'Overview', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' }
]

const PROJECTS = [
  {
    id: 1,
    title: 'SPONTANEO',
    description:
      'Led UX research and end-to-end design for an iOS social spontaneity app. Combined advanced interviews, journey mapping, and multivariate A/B testing to streamline discovery and delight.',
    role: 'Lead UX Designer & iOS Developer',
    context: 'UQ industry collaboration',
    year: '2024',
    impact: '85% engagement lift',
    tags: ['Journey Mapping', 'A/B Testing', 'SwiftUI Prototype'],
    accent: 'linear-gradient(135deg, rgba(255,72,173,0.7), rgba(72,209,255,0.4))'
  },
  {
    id: 2,
    title: 'BLANDT',
    description:
      'Redesigned a B2B workflow platform with a scalable component system. Reduced task completion time by 40% while elevating UX metrics through competitive analysis and design system architecture.',
    role: 'UX Researcher & UI Designer',
    context: 'Enterprise workflow redesign',
    year: '2023',
    impact: '40% faster workflows',
    tags: ['Design Systems', 'Competitive Analysis', 'Enterprise UX'],
    accent: 'linear-gradient(135deg, rgba(135,255,158,0.45), rgba(44,232,224,0.45))'
  },
  {
    id: 3,
    title: 'POSTUREBLOOM',
    description:
      'Created an accessibility-first IoT interface with contextual insights. Reduced onboarding drop-off by 60% through progressive disclosure and inclusive interaction design.',
    role: 'Product Designer & UX Lead',
    context: 'Inclusive IoT wellness product',
    year: '2023',
    impact: '60% drop-off reduction',
    tags: ['Accessibility', 'IoT Interface', 'Data Visualization'],
    accent: 'linear-gradient(135deg, rgba(255,180,84,0.5), rgba(255,94,247,0.4))'
  },
  {
    id: 4,
    title: 'GREENCLINIC',
    description:
      'Designed a mental health platform for Australian university students experiencing burnout. Delivered a calming, mobile-first experience with mood tracking and tailored wellbeing insights.',
    role: 'UI Designer & Front-end Developer',
    context: 'Mental health initiative for students',
    year: '2022',
    impact: '50% faster navigation',
    tags: ['Figma', 'User Testing', 'Responsive Front-end'],
    accent: 'linear-gradient(135deg, rgba(112,123,255,0.55), rgba(255,105,120,0.4))'
  }
]

const STATS = [
  {
    id: 'engagement',
    value: '85%+',
    label: 'Engagement increase',
    description: "SPONTANEO's research-led pivots reignited product stickiness."
  },
  {
    id: 'usability',
    value: '92%',
    label: 'Usability satisfaction',
    description: 'Prototype testing delivered high confidence before engineering handoff.'
  },
  {
    id: 'efficiency',
    value: '40%',
    label: 'Workflow efficiency gain',
    description: "BLANDT's component library powered faster task completion for teams."
  }
]

const EXPERIENCES = [
  {
    id: 1,
    company: "Domino's Queen St",
    role: 'Shift Team Lead',
    period: 'Jun 2023 — Present',
    summary:
      'Empowering a high-energy crew to exceed service standards through data-driven shift planning, quality control, and rapid customer support on the ground.',
    focus: ['Team Leadership', 'Customer Experience', 'Operational Excellence']
  },
  {
    id: 2,
    company: 'PT. Ekspor Pradana Nusantara',
    role: 'Operations & Systems Manager',
    period: 'Feb 2022 — Oct 2024',
    summary:
      'Redesigned export workflows with user-centered systems architecture that boosted efficiency by 30% and aligned cross-functional teams around shared insights.',
    focus: ['Process Improvement', 'Systems Thinking', 'Stakeholder Alignment']
  },
  {
    id: 3,
    company: 'COMPFEST',
    role: 'Head of Transportation & Venue',
    period: 'Jan 2022 — Nov 2022',
    summary:
      "Orchestrated end-to-end logistics for Indonesia's largest student-led IT festival, coordinating 8,500+ attendees, 50 speakers, and multi-site experiences.",
    focus: ['Logistics Strategy', 'Cross-functional Leadership', 'Experience Design']
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Boosted SPONTANEO user engagement by 85% via advanced interviews, journey mapping, and multivariate A/B testing while upholding WCAG 2.1 accessibility.',
    name: 'SPONTANEO',
    title: 'Lead UX Designer & iOS Developer'
  },
  {
    id: 2,
    quote:
      'Cut BLANDT task completion times by 40% through a scalable design system, strategic competitive analysis, and modular workflows.',
    name: 'BLANDT',
    title: 'UX Researcher & UI Designer'
  },
  {
    id: 3,
    quote:
      'Reduced POSTUREBLOOM onboarding drop-off by 60% with accessibility-first flows, contextual inquiry, and data-rich visual storytelling.',
    name: 'POSTUREBLOOM',
    title: 'Product Designer & UX Lead'
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
            onMouseEnter={() => setCursorLabel('Scroll to top')}
            onMouseLeave={resetCursor}
          >
            Bilhuda
          </motion.a>
          <span className="nav-divider" />
          <span className="text-xs uppercase opacity-60">UX Designer & Systems Strategist</span>
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
            onMouseEnter={() => setCursorLabel('About Bilhuda')}
            onMouseLeave={resetCursor}
          >
            About
          </motion.button>
          <motion.button
            className="icon-button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorLabel(isDarkMode ? 'Light mode' : 'Dark mode')}
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
                Designing equitable, research-led experiences
              </motion.span>
              <motion.h1
                className="text-6xl md:text-7xl xl:text-8xl font-bold leading-tight gradient-text"
                style={{ transform: `translateY(${refinedScroll * -14}px)` }}
              >
                BILHUDA PRAMANA HASIBUAN
                <span className="block text-2xl md:text-3xl font-normal tracking-[0.4em] mt-4">
                  DUAL-DEGREE UX PORTFOLIO
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-2xl leading-relaxed text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
              >
                A <span className="word-morph">{WORDS[currentWordIndex]}</span> with dual bachelor&apos;s degrees in Computer
                Science (Universitas Indonesia) and UX Design (The University of Queensland).
                I blend research depth, service design, and operational leadership to launch
                products that feel intuitive, inclusive, and ready for scale.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  className="cta-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('View case studies')}
                  onMouseLeave={resetCursor}
                >
                  Explore the work
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/bilhuda-hasibuan"
                  className="ghost-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('Connect on LinkedIn')}
                  onMouseLeave={resetCursor}
                >
                  Connect on LinkedIn
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
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">Design workflow</p>
                  <motion.span
                    className="accent-pill"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Latest iteration ready
                  </motion.span>
                </div>
                <div className="space-y-5">
                  {['Discover', 'Define', 'Design', 'Deliver'].map((step, index) => (
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
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Currently</p>
                    <p className="text-base font-medium">
                      Leading shifts at <span className="highlight-text">Domino&apos;s Queen St</span>
                    </p>
                  </div>
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Location</p>
                    <p className="text-base font-medium">East Brisbane, Queensland</p>
                  </div>
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Open to</p>
                    <p className="text-base font-medium">
                      UX, research & customer service opportunities
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Case studies</span>
            <h2 className="section-title">Human-centered products that blend rigor and heart</h2>
            <p className="section-description">
              Research-backed, industry-collaborative projects that move the metrics and honor the
              people behind them.
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
                  setCursorLabel('View project')
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
                  <span>{project.context}</span>
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
            <span className="section-eyebrow">Experience</span>
            <h2 className="section-title">Bridging research, operations, and large-scale delivery</h2>
            <p className="section-description">
              Leadership roles across hospitality, logistics, and tech festivals built my ability to
              orchestrate people, data, and environments for exceptional service and design outcomes.
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
          id="impact"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Impact highlights</span>
            <h2 className="section-title">Outcome-driven stories from recent collaborations</h2>
            <p className="section-description">
              Quantifiable wins across product, service, and operations projects — each grounded in
              human insight and rigorous experimentation.
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
            onMouseEnter={() => setCursorLabel('Reach out')}
            onMouseLeave={resetCursor}
          >
            <div className="space-y-6">
              <span className="section-eyebrow">Let&apos;s collaborate</span>
              <h2 className="section-title">Designing inclusive, data-informed experiences together</h2>
              <p className="section-description">
                I bring research depth, operational excellence, and service design thinking to teams
                who care about accessibility and measurable impact. Let&apos;s explore how I can
                support your next product or customer journey.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <motion.a
                href="https://www.linkedin.com/in/bilhuda-hasibuan"
                className="cta-button"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => setCursorLabel('Message on LinkedIn')}
                onMouseLeave={resetCursor}
              >
                Message on LinkedIn
              </motion.a>
              <p className="text-sm text-muted md:text-right max-w-sm">
                Prefer email or a resume PDF? Send a note via LinkedIn and I&apos;ll share direct
                contact details within one business day.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <footer className="container mx-auto px-4 text-sm text-muted text-center pt-12">
          © {new Date().getFullYear()} Bilhuda Pramana Hasibuan. Crafted with empathy & iteration.
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
                  <h2 className="text-3xl font-semibold">About Bilhuda</h2>
                  <p className="text-base leading-relaxed text-muted">
                    I&apos;m a dual-degree graduate (Computer Science — Universitas Indonesia & UX
                    Design — The University of Queensland) with a passion for crafting inclusive
                    digital experiences. My background spans UX research, service design, and
                    operational leadership for large-scale events and fast-paced retail teams.
                  </p>
                  <p className="text-base leading-relaxed text-muted">
                    I thrive at the intersection of qualitative insight and quantitative impact —
                    whether that&apos;s scaling a design system, redesigning export operations, or
                    guiding frontline teams through exceptional customer service moments.
                  </p>
                  <div className="modal-skills">
                    {[
                      'UX Research',
                      'Service Design',
                      'Product Strategy',
                      'Accessibility',
                      'Data Visualization',
                      'Operations Leadership'
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
                  onMouseEnter={() => setCursorLabel('Close about')}
                  onMouseLeave={resetCursor}
                  aria-label="Close about dialog"
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
            <span className="text-xs uppercase tracking-[0.4em] opacity-60">Key impact</span>
            <p className="text-sm font-semibold">{activeProject.impact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="keyboard-hint">Press Ctrl+D to toggle dark mode · Ctrl+A to open the about panel</div>
    </>
  )
}
