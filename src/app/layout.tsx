import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'Bilhuda Pramana — UX Designer',
  description: 'Portfolio of Bilhuda Pramana, UX Designer focused on creating meaningful digital experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className={`${inter.className} bg-off-white text-off-black selection:bg-off-yellow selection:text-off-black`}>
        <div className="loading-screen fixed inset-0 bg-off-white flex items-center justify-center z-50">
          <div className="loading-text text-2xl font-mono opacity-0">LOADING</div>
        </div>
        <div className="min-h-screen flex flex-col">
          <header className="fixed top-0 w-full bg-off-white/90 backdrop-blur-sm z-50">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <a href="/" className="text-lg font-mono hover:text-off-yellow transition-colors">BP</a>
                <div className="flex space-x-8 text-sm font-mono">
                  <a href="#work" className="hover:text-off-yellow transition-colors">WORK</a>
                  <a href="#about" className="hover:text-off-yellow transition-colors">ABOUT</a>
                  <a href="#contact" className="hover:text-off-yellow transition-colors">CONTACT</a>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow pt-24">
            {children}
          </main>
          <footer className="py-12 border-t border-off-black/10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <p className="text-sm font-mono opacity-50">
                  © 2024 BILHUDA PRAMANA. ALL RIGHTS RESERVED.
                </p>
                <div className="flex space-x-4 text-sm font-mono">
                  <a href="#" className="hover:text-off-yellow transition-colors">INSTAGRAM</a>
                  <a href="#" className="hover:text-off-yellow transition-colors">TWITTER</a>
                  <a href="#" className="hover:text-off-yellow transition-colors">LINKEDIN</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 