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
  title: 'Bilhuda Pramana Hasibuan — UX Designer & Operations Strategist',
  description:
    'Dual-degree UX professional blending research, service design, and operational leadership across digital products, logistics, and customer experience.'
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
