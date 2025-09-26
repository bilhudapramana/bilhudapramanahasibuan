'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import { useRef, useState, type ComponentProps, type PointerEvent, type ReactNode } from 'react'
import type { MotionValue } from 'framer-motion'

const navItems = [
  { label: 'Overview', target: 'overview' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'Credentials', target: 'credentials' },
  { label: 'Contact', target: 'contact' }
]

const heroHighlights = [
  {
    label: 'SPONTANEO',
    value: '85% engagement lift',
    description:
      'Led UX research, iOS delivery and WCAG 2.1 accessibility to energise student communities.'
  },
  {
    label: 'BLANDT',
    value: '40% faster workflows',
    description:
      'Architected design systems and competitive analysis to streamline cross-functional launches.'
  },
  {
    label: 'POSTUREBLOOM',
    value: '60% drop-off reduction',
    description:
      'Shaped onboarding and data visualisations for an accessibility-first IoT wellbeing experience.'
  },
  {
    label: 'GREENCLINIC',
    value: '50% quicker navigation',
    description:
      'Crafted calming UI and personalised insights to support Australian university students.'
  }
]

const experiences = [
  {
    company: "Domino's",
    role: 'Shift Team Lead',
    period: 'Jun 2023 – Present',
    location: 'Brisbane City, Queensland, Australia',
    summary:
      'Guided a dynamic store team to exceed service standards with precision scheduling, real-time coaching and human-centred customer support.',
    highlights: [
      'Resolved complex customer scenarios with empathy, bolstering loyalty and repeat business.',
      'Maintained rigorous quality control and cash integrity while optimising inventory through just-in-time ordering.',
      'Mentored new hires on safety, hospitality rituals and growth pathways to elevate team performance.'
    ]
  },
  {
    company: 'PT. Ekspor Pradana Nusantara',
    role: 'Operations & Systems Manager',
    period: 'Feb 2022 – Oct 2024',
    location: 'Kota Bekasi, West Java, Indonesia',
    summary:
      'Redesigned export operations with data-driven rituals, connecting ground staff, IT teams and leadership around a shared visibility stack.',
    highlights: [
      'Delivered a 30% efficiency gain across logistics timelines through workflow orchestration and continuous feedback loops.',
      'Integrated human-centred methodologies into internal tooling, unlocking reliable infrastructure and productivity lift.',
      'Championed digital transformation initiatives and cross-department mentorship to scale sustainable growth.'
    ]
  },
  {
    company: 'COMPFEST',
    role: 'Head of Transportation & Venue',
    period: 'Jan 2022 – Nov 2022',
    location: 'Jakarta, Indonesia',
    summary:
      'Engineered end-to-end mobility and venue systems for Indonesia’s largest student-run IT festival welcoming 8,500+ attendees.',
    highlights: [
      'Coordinated 50+ volunteers and vendors with adaptive resource allocation and rapid risk mitigation.',
      'Introduced data-informed routing, digital tracking and contingency playbooks to cut downtime by 25%.',
      'Activated immersive venue narratives that amplified participant experience and speaker readiness.'
    ]
  }
]

const projects = [
  {
    name: 'SPONTANEO',
    discipline: 'Lead UX Designer & iOS Developer',
    outcome: '85% engagement lift · 92% satisfaction',
    description:
      'Mobilised deep user interviews, journey mapping and multivariate testing to transform spontaneous campus hangouts into a seamless digital ritual.',
    focus: ['Advanced user research', 'Accessibility orchestration', 'iOS prototyping']
  },
  {
    name: 'BLANDT',
    discipline: 'UX Researcher & UI Designer',
    outcome: '40% faster workflows · 65% UX metric uplift',
    description:
      'Built a scalable component library and streamlined creative-to-production handoffs with strategic competitive analysis.',
    focus: ['Design systems architecture', 'Operational playbooks', 'Insight synthesis']
  },
  {
    name: 'POSTUREBLOOM',
    discipline: 'Product Designer & UX Lead',
    outcome: '60% drop-off reduction',
    description:
      'Delivered an accessibility-first IoT interface that humanises posture coaching through contextual inquiry and adaptive visualisations.',
    focus: ['Inclusive onboarding', 'Data storytelling', 'IoT service design']
  },
  {
    name: 'GREENCLINIC',
    discipline: 'UI/UX Designer',
    outcome: '50% faster navigation',
    description:
      'Composed a calming mental health companion with mood tracking, responsive prototypes and student co-design labs.',
    focus: ['Wellbeing journeys', 'Figma craft', 'Usability testing']
  }
]

const education = [
  {
    school: 'The University of Queensland',
    programme: 'Bachelor of Information Technology — User Experience Design',
    period: 'Feb 2023 – Nov 2024',
    details:
      'Studio-led UX specialisation with emphasis on Figma craftsmanship, Python, React and agile delivery across interdisciplinary teams.'
  },
  {
    school: 'University of Indonesia',
    programme: 'Bachelor of Computer Science',
    period: '2020 – 2024',
    details:
      'Solid computing fundamentals powering data visualisation, cross-functional collaboration and scalable problem solving.'
  }
]

const certifications = [
  {
    issuer: 'IBM',
    name: 'Product Management: An Introduction',
    issued: 'Jan 2025',
    credentialId: '1YJB0BN3XC9B'
  },
  {
    issuer: 'Google',
    name: 'Google UX Design Specialization',
    issued: 'Dec 2024',
    credentialId: 'BOS3Y97NVZPI'
  }
]

const openRoles = [
  'UX Designer',
  'UX Consultant',
  'UX Researcher',
  'Customer Service Representative',
  'Customer Service Specialist'
]

const signatureSkills = [
  'Experience strategy',
  'Mixed-method research',
  'Design systems',
  'Service design',
  'Operational analytics',
  'Cross-functional facilitation'
]

const contactChannels = [
  { label: 'Email', href: 'mailto:hello@bilhuda.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilhuda-hasibuan' }
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
}

const subtleStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04
    }
  }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type MagneticLinkProps = ComponentProps<typeof motion.a>

function MagneticLink({ className, style, children, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const translateX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.6 })
  const translateY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.6 })

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width - 0.5) * 16
    const relativeY = ((event.clientY - rect.top) / rect.height - 0.5) * 16
    x.set(relativeX)
    y.set(relativeY)
    props.onPointerMove?.(event)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    x.set(0)
    y.set(0)
    props.onPointerLeave?.(event)
  }

  return (
    <motion.a
      {...props}
      ref={ref}
      className={className}
      style={style ? { ...style, x: translateX, y: translateY } : { x: translateX, y: translateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.a>
  )
}

type TiltCardProps = Omit<ComponentProps<typeof motion.div>, 'children'> & {
  children: ReactNode
  intensity?: number
}

function TiltCard({ children, className, intensity = 10, style, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6
  })
  const translateX = useSpring(useTransform(x, (value) => value * 18), {
    stiffness: 200,
    damping: 20,
    mass: 0.6
  })
  const translateY = useSpring(useTransform(y, (value) => value * 18), {
    stiffness: 200,
    damping: 20,
    mass: 0.6
  })
  const pointerX = useTransform(x, (value) => (value + 0.5) * 100)
  const pointerY = useTransform(y, (value) => (value + 0.5) * 100)
  const glow = useMotionTemplate`radial-gradient(320px circle at ${pointerX}% ${pointerY}%, rgba(56,189,248,0.18), transparent 70%)`

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    x.set(relativeX)
    y.set(relativeY)
    props.onPointerMove?.(event)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    x.set(0)
    y.set(0)
    props.onPointerLeave?.(event)
  }

  return (
    <motion.div
      {...props}
      ref={ref}
      className={cn('relative will-change-transform', className)}
      style={style
        ? {
            ...style,
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformPerspective: 1200
          }
        : {
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformPerspective: 1200
          }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300"
      style={{ scaleX }}
    />
  )
}

function Spotlight({ x, y, active }: { x: MotionValue<number>; y: MotionValue<number>; active: boolean }) {
  const opacity = useSpring(active ? 1 : 0, { stiffness: 120, damping: 30 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(56,189,248,0.28), transparent 65%)`

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 mix-blend-screen"
      style={{ opacity, backgroundImage: spotlight }}
    />
  )
}

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-30%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl"
        animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-32 top-1/4 h-[38rem] w-[38rem] rounded-full bg-emerald-400/14 blur-3xl"
        animate={{
          x: [-20, 20, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.04, 0.98, 1]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <motion.div
        className="absolute bottom-[-26%] right-[-18%] h-[44rem] w-[44rem] rounded-full bg-pink-400/16 blur-3xl"
        animate={{ rotate: [0, -12, 6, 0], scale: [1, 0.94, 1.04, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cpath d=\'M0 160h160V0\' fill=\'none\' stroke=\'rgba(148,163,184,0.08)\' stroke-width=\'0.5\'/%3E%3C/svg%3E')] opacity-[0.12]"
        animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [spotlightActive, setSpotlightActive] = useState(false)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = containerRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    cursorX.set(event.clientX - rect.left)
    cursorY.set(event.clientY - rect.top)
  }

  return (
    <div
      ref={containerRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-slate-100"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setSpotlightActive(true)}
      onPointerLeave={() => setSpotlightActive(false)}
    >
      <ScrollProgressBar />
      <AuroraBackground />
      <Spotlight x={cursorX} y={cursorY} active={spotlightActive} />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030818]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100/10 text-sm font-semibold text-slate-200">
              BP
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Portfolio</p>
              <p className="text-base font-semibold text-slate-100">Bilhuda Pramana Hasibuan</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => (
              <MagneticLink
                key={item.target}
                href={`#${item.target}`}
                className="group relative inline-flex items-center transition hover:text-sky-200"
                whileHover={{ scale: 1.02 }}
              >
                {item.label}
                <span className="pointer-events-none absolute inset-x-0 -bottom-2 block h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
              </MagneticLink>
            ))}
          </nav>
          <MagneticLink
            href="#contact"
            className="hidden rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-sky-400 md:inline-flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Collaborate
          </MagneticLink>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 md:hidden"
            aria-label="Jump to navigation"
            onClick={() => {
              const menu = document.getElementById('site-navigation')
              menu?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="sr-only">Open navigation</span>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path d="M1 1h16M1 6h12M1 11h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-32 px-6 pb-24 pt-24" id="overview">
        <section className="space-y-16">
          <motion.div
            className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-400"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {['Status: online', '0 notifications', '#OPEN_TO_WORK'].map((chip) => (
              <motion.span
                key={chip}
                variants={fadeUp}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] text-slate-300 backdrop-blur"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7, ease: 'easeOut' }}>
            <p className="text-sm font-medium uppercase tracking-[0.6em] text-slate-400">UX designer · Systems strategist</p>
            <h1 className="mt-6 text-4xl font-semibold text-slate-100 sm:text-5xl md:text-6xl">
              Crafting trustworthy journeys where research, service design and operations flow in lockstep.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-300">
              Bilhuda Pramana Hasibuan (he/him) blends dual degrees in Computer Science and UX Design to orchestrate service
              ecosystems that feel effortless for customers and teams alike. From export logistics and festival mega-events to
              digital wellbeing platforms, every touchpoint is grounded in research, accessibility and measurable outcomes.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-[1.6fr_1fr]"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <TiltCard
              variants={fadeUp}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              intensity={7}
            >
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  </span>
                  East Brisbane, Queensland, Australia
                </span>
                <span>295 connections</span>
              </div>
              <p className="mt-6 text-2xl font-semibold text-slate-100">
                Dual Bachelor’s Degree · Computer Science (University of Indonesia) &amp; Information Technology — UX Design (The University of Queensland)
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                {openRoles.map((role) => (
                  <span key={role} className="rounded-full border border-white/10 px-3 py-1">
                    {role}
                  </span>
                ))}
              </div>
            </TiltCard>
            <TiltCard
              variants={fadeUp}
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-800/30 p-8"
              intensity={6}
            >
              <div>
                <h2 className="text-base font-semibold text-slate-100">Signature skills</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Translating research signals into resilient product and service operations that delight humans and drive results.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                {signatureSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          <motion.div className="grid gap-4 md:grid-cols-2" variants={staggerChildren} initial="hidden" animate="visible">
            {heroHighlights.map((item) => (
              <TiltCard
                key={item.label}
                variants={fadeUp}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-sky-300/40"
                intensity={8}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                  <span className="text-sm font-semibold text-sky-200">{item.value}</span>
                </div>
                <p className="mt-4 text-base text-slate-300">{item.description}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-full bg-gradient-to-r from-transparent via-sky-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />
              </TiltCard>
            ))}
          </motion.div>
        </section>

        <section id="experience" className="space-y-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <p className="text-sm font-medium uppercase tracking-[0.6em] text-slate-400">Experience</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100">
              Operational empathy meets design leadership across industries.
            </h2>
            <p className="mt-4 max-w-3xl text-base text-slate-300">
              From export operations and large-scale events to frontline hospitality, Bilhuda designs rituals, systems and teams that keep
              complex services intuitive and human.
            </p>
          </motion.div>

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <TiltCard
                key={experience.company}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                intensity={6}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{experience.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-100">{experience.role}</h3>
                    <p className="text-base text-slate-300">{experience.company} · {experience.location}</p>
                  </div>
                  <span className="mt-2 inline-flex max-w-xs items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                    Service &amp; systems leadership
                  </span>
                </div>
                <p className="mt-6 text-base text-slate-300">{experience.summary}</p>
                <ul className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-300" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <p className="text-sm font-medium uppercase tracking-[0.6em] text-slate-400">Spotlight projects</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100">Designing human-centred experiences with measurable outcomes.</h2>
            <p className="mt-4 max-w-3xl text-base text-slate-300">
              Each initiative balances qualitative insight, operational feasibility and inclusive delivery to unlock sustainable impact.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <TiltCard
                key={project.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/10 p-7 backdrop-blur-xl"
                intensity={7}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{project.name}</h3>
                    <p className="text-sm text-slate-400">{project.discipline}</p>
                  </div>
                  <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-100">{project.outcome}</span>
                </div>
                <p className="mt-4 text-base text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {project.focus.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-400/0 via-sky-400/60 to-sky-400/0" />
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="credentials" className="space-y-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <p className="text-sm font-medium uppercase tracking-[0.6em] text-slate-400">Credentials</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100">Academic foundations and lifelong learning.</h2>
            <p className="mt-4 max-w-3xl text-base text-slate-300">
              An interdisciplinary education anchors Bilhuda’s ability to translate technical nuance into intuitive, evidence-backed design moments.
            </p>
          </motion.div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              variants={subtleStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              {education.map((item) => (
                <TiltCard
                  key={item.school}
                  variants={fadeUp}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
                  intensity={5}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.period}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-100">{item.school}</h3>
                  <p className="text-base text-slate-300">{item.programme}</p>
                  <p className="mt-4 text-sm text-slate-300">{item.details}</p>
                </TiltCard>
              ))}
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl"
            >
              <TiltCard
                className="group h-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-800/30 p-7 backdrop-blur-xl"
                intensity={4}
              >
                <h3 className="text-lg font-semibold text-slate-100">Recent certifications</h3>
                <ul className="mt-6 space-y-5 text-sm text-slate-300">
                  {certifications.map((cert) => (
                    <li key={cert.name} className="space-y-1">
                      <p className="font-medium text-slate-100">{cert.name}</p>
                      <p className="text-slate-400">{cert.issuer} · Issued {cert.issued}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Credential ID {cert.credentialId}</p>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="space-y-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <p className="text-sm font-medium uppercase tracking-[0.6em] text-slate-400">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100">Let’s build experiences that set new benchmarks.</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              Reach out to explore UX strategy, service design, research partnerships or operational excellence engagements. Bilhuda thrives on collaborative missions that blend craft, data and compassion.
            </p>
          </motion.div>
          <TiltCard
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="group flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
            intensity={6}
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Start the conversation</h3>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Send a note with your challenge, timeline and the impact you’re aiming for. Bilhuda will respond with ways to move quickly without sacrificing depth.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {contactChannels.map((channel) => (
                <MagneticLink
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-300 hover:text-sky-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {channel.label}
                </MagneticLink>
              ))}
            </div>
          </TiltCard>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#030818]/70 py-10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Bilhuda Pramana Hasibuan. Designed for timeless clarity.</span>
          <nav id="site-navigation" className="flex flex-wrap items-center gap-4 text-[0.65rem]">
            {navItems.map((item) => (
              <a key={item.target} href={`#${item.target}`} className="hover:text-sky-200">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
