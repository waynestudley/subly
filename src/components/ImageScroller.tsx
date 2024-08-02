import React, { useRef, useState, useEffect } from 'react'
import Card from './Card'

type CardData = {
  title: string
  subtitle: string
  status: 'transcribing' | 'error' | 'edited'
  cover?: string
  action?: string
  name: string
  fileStatus: string
}

type ImageScrollerProps = {
  cards: CardData[]
}

const ImageScroller: React.FC<ImageScrollerProps> = ({ cards }) => {
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
      <button onClick={scrollLeft} style={{ position: 'absolute', left: 0, zIndex: 1 }}>←</button>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          alignItems: 'center',
          width: '100%',
          gap: '16px'
        }}
      >
        {cards.map((card, index) => (
          <div key={index} style={{ flexShrink: 0 }}>
            <Card
              title={card.title}
              subtitle={card.subtitle}
              status={card.status}
              image={card.cover}
              action={card.action}
              name={card.name}
              fileStatus={card.fileStatus}
            />
          </div>
        ))}
      </div>
      <button onClick={scrollRight} style={{ position: 'absolute', right: 0, zIndex: 1 }}>→</button>
    </div>
  )
}

export default ImageScroller
