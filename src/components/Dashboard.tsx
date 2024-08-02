import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ImageScroller from './ImageScroller'
import Card from './Card'
import { FaTh } from 'react-icons/fa'

type CardData = {
  id: number
  title: string
  subtitle: string
  status: 'transcribing' | 'error' | 'edited'
  cover?: string
  name: string
  fileStatus: string
  languages: string[]
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isTiled, setIsTiled] = useState(false)
  const API_URL = 'https://run.mocky.io/v3/3c20b2a9-4a8b-46b6-83cb-01b83e680738'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL)
        
        if (Array.isArray(response.data)) {
          const dataWithId = response.data.map((card: CardData, index: number) => ({
            ...card,
            id: index
          }))
          setCards(dataWithId)
          setError(null)
        } else {
          throw new Error('API response is not an array')
        }
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message)
      }
    }

    fetchData()
  }, [])

  const handleDelete = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id))
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {error ? (
        <div>{error}</div>
      ) : (
        isTiled ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: '20px', overflowY: 'auto', height: '100%' }}>
            {cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                status={card.status}
                image={card.cover}
                name={card.name}
                fileStatus={card.fileStatus}
                languages={card.languages}
                onDelete={() => handleDelete(card.id)}
              />
            ))}
          </div>
        ) : (
          <ImageScroller cards={cards} onDelete={handleDelete} />
        )
      )}
      <button 
        onClick={() => setIsTiled(!isTiled)} 
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '2px solid #000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: '1000'
        }}
      >
        <FaTh />
      </button>
    </div>
  )
}

export default Dashboard
