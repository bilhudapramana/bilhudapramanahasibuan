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
  title: 'Bilhuda Pramana Hasibuan — UX Designer & Systems Strategist',
  description:
    'Experience the portfolio of Bilhuda Pramana Hasibuan, a UX designer blending computer science, service design and operational excellence to deliver inclusive, measurable outcomes.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
