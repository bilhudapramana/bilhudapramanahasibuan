import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import gameboyLoadingAnimation from '@/animations/gameboy-loading.json'

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[--background] z-50 flex flex-col items-center justify-center"
    >
      <div className="w-48 h-48">
        <Lottie 
          animationData={gameboyLoadingAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>
      <motion.p 
        className="text-[--gb-dark] mt-4 pixel-text"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.p>
    </motion.div>
  )
} 