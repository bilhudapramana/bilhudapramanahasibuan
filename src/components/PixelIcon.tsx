'use client'
import { motion } from 'framer-motion'

interface PixelIconProps {
  icon: string
  label: string
}

export default function PixelIcon({ icon, label }: PixelIconProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2"
      whileHover={{ scale: 1.1 }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.div>
  )
} 