'use client'
import { useEffect, useState } from 'react'
import { pressStart } from './fonts'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import { metadata } from './metadata'
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${pressStart.className} bg-pattern`}>
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>
        {!isLoading && children}
      </body>
    </html>
  )
}
