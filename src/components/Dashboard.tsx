// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    axios.get('https://run.mocky.io/v3/3c20b2a9-4a8b-46b6-83cb-01b83e680738')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          status={card.status}
          image={card.cover}
          action={card.action}
          name={card.name}
          fileStatus={card.fileStatus}
        />
      ))}
    </div>
  )
}

export default Dashboard
