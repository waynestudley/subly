import React, { useRef, useState, useEffect } from 'react'
import Card from './Card'

type CardData = {
  id: number
  title: string
  subtitle: string
  status: 'transcribing' | 'error' | 'edited'
  cover?: string
  name: string
  fileStatus: string
  languages: string[] // Add languages property
}

type ImageScrollerProps = {
  cards: CardData[]
  onDelete: (id: number) => void
}

const ImageScroller: React.FC<ImageScrollerProps> = ({ cards, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const scrollPosition = currentIndex * cardWidth - (containerWidth / 2 - cardWidth / 2)
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 1))
  }

  if (!Array.isArray(cards)) {
    return null
  }

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      <button 
        onClick={scrollLeft} 
        style={{ 
          position: 'absolute', 
          left: '10px', 
          zIndex: 1000, 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: '#fff', 
          border: '2px solid #000', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          cursor: 'pointer'
        }}
      >
        ←
      </button>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          alignItems: 'center',
          width: '100%',
          gap: '16px',
          paddingBottom: '20px', // Add padding to ensure the bottom of the cards and shadows are not clipped
        }}
        className="hide-scrollbar" // Add a class for custom scrollbar styles
      >
        {cards.map((card) => (
          <div key={card.id} style={{ flexShrink: 0 }}>
            <Card
              title={card.title}
              subtitle={card.subtitle}
              status={card.status}
              image={card.cover}
              name={card.name}
              fileStatus={card.fileStatus}
              languages={card.languages} // Pass languages property
              onDelete={() => onDelete(card.id)}
            />
          </div>
        ))}
      </div>
      <button 
        onClick={scrollRight} 
        style={{ 
          position: 'absolute', 
          right: '10px', 
          zIndex: 1000, 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: '#fff', 
          border: '2px solid #000', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          cursor: 'pointer'
        }}
      >
        →
      </button>
    </div>
  )
}

export default ImageScroller
