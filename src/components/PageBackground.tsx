interface PageBackgroundProps {
  children: React.ReactNode
  pattern?: 'dots' | 'grid' | 'animated'
}

export default function PageBackground({ 
  children, 
  pattern = 'dots' 
}: PageBackgroundProps) {
  const patterns = {
    dots: 'bg-dots',
    grid: 'bg-grid',
    animated: 'bg-animated'
  }

  return (
    <div className={`min-h-screen p-4 ${patterns[pattern]}`}>
      <div className="absolute inset-0 opacity-50 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 