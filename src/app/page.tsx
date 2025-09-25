'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Designer', 'Thinker', 'Creator', 'Developer', 'UX Expert']

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#about' },
  { label: 'Kind Words', href: '#testimonials' },
  { label: 'Contact', href: '#contact' }
]

const PROJECTS = [
  {
    id: 1,
    title: 'E-commerce Flagship',
    description:
      'Reimagined the purchase journey for a luxury fashion house with spatial storytelling and seamless motion micro-interactions.',
    role: 'Lead Product Designer',
    year: '2024',
    impact: '+28% conversion',
    tags: ['Design Systems', 'Motion Language', 'A/B Testing'],
    accent: 'linear-gradient(135deg, rgba(255,214,94,0.65), rgba(255,120,87,0.35))'
  },
  {
    id: 2,
    title: 'Holistic Healthcare',
    description:
      'Crafted a calm and confident experience for a preventive-care platform balancing clinical data with human warmth.',
    role: 'Principal UX Designer',
    year: '2023',
    impact: '+41 NPS',
    tags: ['Design Research', 'Accessibility', 'Service Blueprint'],
    accent: 'linear-gradient(135deg, rgba(123,224,255,0.5), rgba(67,104,255,0.45))'
  },
  {
    id: 3,
    title: 'Financial Command Center',
    description:
      'Designed a multi-device portfolio dashboard with adaptive density, cinematic transitions and real-time collaboration tools.',
    role: 'Information Architecture',
    year: '2023',
    impact: 'x2 engagement',
    tags: ['Data Visualization', 'Design Ops', 'Realtime Systems'],
    accent: 'linear-gradient(135deg, rgba(168,255,120,0.45), rgba(46,196,182,0.45))'
  },
  {
    id: 4,
    title: 'Intelligent Mobility',
    description:
      'Built an intuitive companion app for electric vehicles with predictive routing, ambient gestures and adaptive audio cues.',
    role: 'Experience Lead',
    year: '2022',
    impact: '-36% support tickets',
    tags: ['Product Strategy', 'Voice & Gesture', 'Edge Cases'],
    accent: 'linear-gradient(135deg, rgba(255,140,222,0.45), rgba(98,0,234,0.45))'
  }
]

const STATS = [
  {
    id: 'experience',
    value: '6+',
    label: 'Years crafting flagship products',
    description: 'From e-commerce to healthcare, leading end-to-end experience strategy.'
  },
  {
    id: 'launches',
    value: '35',
    label: 'High-impact launches',
    description: 'Shipped experiences shaped around measurable outcomes and delight.'
  },
  {
    id: 'impact',
    value: '120M+',
    label: 'Users influenced',
    description: 'Designing responsibly at scale for global, multi-platform ecosystems.'
  }
]

const EXPERIENCES = [
  {
    id: 1,
    company: 'Nusantara Commerce',
    role: 'Lead UX Designer',
    period: '2022 — Present',
    summary:
      'Guiding a multi-disciplinary product team to craft elevated retail journeys across Southeast Asia.',
    focus: ['Design Strategy', 'Systems Thinking', 'Motion Direction']
  },
  {
    id: 2,
    company: 'Halo Health',
    role: 'Senior Product Designer',
    period: '2019 — 2022',
    summary:
      'Built trust-driven patient experiences and unified clinician tooling with rigorous accessibility standards.',
    focus: ['Inclusive Design', 'Service Design', 'Research Ops']
  },
  {
    id: 3,
    company: 'Freelance',
    role: 'Experience Consultant',
    period: '2017 — 2019',
    summary:
      'Partnered with visionary founders to transform complex problems into signature product moments.',
    focus: ['Brand Experience', 'Rapid Prototyping', 'Product Discovery']
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Bilhuda brings an enviable calm to complex projects. Every interaction feels choreographed yet effortless for our customers.',
    name: 'Amelia Hart',
    title: 'VP of Product, Luminara'
  },
  {
    id: 2,
    quote:
      'A rare blend of systems thinking and poetic craft. Our flagship launch finally feels worthy of the brand we imagined.',
    name: 'Kenji Nakamura',
    title: 'Founder, Oru Mobility'
  },
  {
    id: 3,
    quote:
      'From research to rollout, Bilhuda orchestrated the experience with empathy, precision and a sharp eye for detail.',
    name: 'Sasha Patel',
    title: 'Chief Experience Officer, Halo Health'
  }
]

const FLOATING_ORBS = [
  {
    id: 1,
    size: 420,
    top: '10%',
    left: '8%',
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,214,94,0.55), transparent 60%)'
  },
  {
    id: 2,
    size: 520,
    top: '55%',
    left: '70%',
    background:
      'radial-gradient(circle at 70% 40%, rgba(120,208,255,0.45), transparent 65%)'
  },
  {
    id: 3,
    size: 360,
    top: '75%',
    left: '15%',
    background:
      'radial-gradient(circle at 50% 50%, rgba(255,140,222,0.45), transparent 60%)'
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
            onMouseEnter={() => setCursorLabel('Home')}
            onMouseLeave={resetCursor}
          >
            Bilhuda
          </motion.a>
          <span className="nav-divider" />
          <span className="text-xs uppercase opacity-60">Experience Architecture</span>
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
            onMouseEnter={() => setCursorLabel('About')}
            onMouseLeave={resetCursor}
          >
            About
          </motion.button>
          <motion.button
            className="icon-button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorLabel(isDarkMode ? 'Light' : 'Dark')}
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
                Designing for emotion and clarity
              </motion.span>
              <motion.h1
                className="text-6xl md:text-7xl xl:text-8xl font-bold leading-tight gradient-text"
                style={{ transform: `translateY(${refinedScroll * -14}px)` }}
              >
                BILHUDA PRAMANA
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-2xl leading-relaxed text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
              >
                A UX <span className="word-morph">{WORDS[currentWordIndex]}</span> crafting holistic
                ecosystems where technology disappears and the story takes center stage. Every
                pixel, gesture and transition is considered for resonance.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#work"
                  className="cta-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('Explore work')}
                  onMouseLeave={resetCursor}
                >
                  Explore the work
                </motion.a>
                <motion.a
                  href="mailto:hello@bilhuda.com"
                  className="ghost-button"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => setCursorLabel('Email me')}
                  onMouseLeave={resetCursor}
                >
                  Start a project
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
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">Signature process</p>
                  <motion.span
                    className="accent-pill"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Always evolving
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Currently</p>
                    <p className="text-base font-medium">
                      Designing next-gen retail at <span className="highlight-text">Nusantara</span>
                    </p>
                  </div>
                  <div className="insight-card">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Availability</p>
                    <p className="text-base font-medium">Open for select collaborations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="work"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Selected Work</span>
            <h2 className="section-title">Flagship experiences crafted with intention</h2>
            <p className="section-description">
              A collection of multidisciplinary stories where research, design systems and
              motion converge to create signature product moments.
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
                  <span>Experience leadership</span>
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
          id="about"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Experience</span>
            <h2 className="section-title">Designing with empathy, rigor and poetry</h2>
            <p className="section-description">
              A journey across industries shaping teams, systems and rituals that keep humans at
              the heart of ambitious products.
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
          id="testimonials"
          className="container mx-auto px-4 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <span className="section-eyebrow">Kind Words</span>
            <h2 className="section-title">What partners feel working together</h2>
            <p className="section-description">
              Partnerships rooted in trust, clarity and momentum. Here is how collaborators
              describe the journey.
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
            onMouseEnter={() => setCursorLabel('Collaborate')}
            onMouseLeave={resetCursor}
          >
            <div className="space-y-6">
              <span className="section-eyebrow">Let’s build the future</span>
              <h2 className="section-title">Ready to craft a flagship experience together?</h2>
              <p className="section-description">
                I partner with teams who value craft, measurable impact and long-term product
                health. Let’s orchestrate the next chapter of your product.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <motion.a
                href="mailto:hello@bilhuda.com"
                className="cta-button"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => setCursorLabel('Email me')}
                onMouseLeave={resetCursor}
              >
                hello@bilhuda.com
              </motion.a>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Read.cv'].map((item) => (
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
          © {new Date().getFullYear()} Bilhuda Pramana. Crafted with intention.
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
                  <h2 className="text-3xl font-semibold">More about Bilhuda</h2>
                  <p className="text-base leading-relaxed text-muted">
                    I am a UX designer obsessed with the invisible choreography of great products.
                    Psychology, sound design and architecture influence how I craft emotion into
                    every interaction. Beyond the pixels, I facilitate rituals that keep teams
                    aligned, curious and kind.
                  </p>
                  <p className="text-base leading-relaxed text-muted">
                    Outside of design you will find me sketching cityscapes, collecting iconic
                    chairs and exploring volcanic trails across Indonesia.
                  </p>
                  <div className="modal-skills">
                    {['UX Design', 'Design Strategy', 'Motion Direction', 'Research Ops', 'Figma', 'Prototyping'].map(
                      (skill) => (
                        <span key={skill}>{skill}</span>
                      )
                    )}
                  </div>
                </div>
                <motion.button
                  className="icon-button"
                  onClick={toggleAboutModal}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setCursorLabel('Close')}
                  onMouseLeave={resetCursor}
                  aria-label="Close modal"
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
            <span className="text-xs uppercase tracking-[0.4em] opacity-60">Impact</span>
            <p className="text-sm font-semibold">{activeProject.impact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="keyboard-hint">Press Ctrl+D for dark mode · Ctrl+A for the story</div>
    </>
  )
}
