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
  title: 'Bilhuda Pramana — Gameverse Architect',
  description:
    'Step into the neon playground of Bilhuda Pramana — a game designer crafting cinematic sci-fi racers, co-op raids and unforgettable player journeys.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
