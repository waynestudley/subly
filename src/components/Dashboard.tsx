import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ImageScroller from './ImageScroller'

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
  const [error, setError] = useState<string | null>(null)
  const API_URL = 'https://run.mocky.io/v3/3c20b2a9-4a8b-46b6-83cb-01b83e680738'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL)
        
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setCards(response.data)
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

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {error ? (
        <div>{error}</div>
      ) : (
        <ImageScroller cards={cards} />
      )}
    </div>
  )
}

export default Dashboard
