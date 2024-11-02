'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    // Add your form submission logic here
    setTimeout(() => setFormStatus('sent'), 1000)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="gameboy-container max-w-2xl mx-auto">
        <h1 className="text-xl text-[--gb-darkest] mb-8">CONTACT ME</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[--gb-darkest] mb-2">NAME:</label>
            <input 
              type="text"
              className="gameboy-container w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-[--gb-darkest] mb-2">EMAIL:</label>
            <input 
              type="email"
              className="gameboy-container w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-[--gb-darkest] mb-2">MESSAGE:</label>
            <textarea 
              className="gameboy-container w-full h-32"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Link href="/" className="gameboy-btn">
              BACK
            </Link>
            <button 
              type="submit" 
              className="gameboy-btn"
              disabled={formStatus !== 'idle'}
            >
              {formStatus === 'idle' ? 'SEND' : 
               formStatus === 'sending' ? 'SENDING...' : 'SENT!'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 