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
  title: 'Bilhuda Pramana Hasibuan — Neon Signature Run',
  description:
    'Pilot a 3D neon arena dedicated to the name Bilhuda Pramana Hasibuan. Drift through glowing letterforms, harvest energy shards, and chase endless combos.'
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
