import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'Bilhuda Pramana Hasibuan — Neon Hyper Playground',
  description:
    'Step inside a neon playground built around the name Bilhuda Pramana Hasibuan. Boost through 3D space, collect radiant shards, and chase endless combos.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
