// src/components/Card.tsx
import React from 'react'

type CardProps = {
  title: string
  subtitle: string
  status: 'transcribing' | 'error' | 'edited'
  image?: string
  action?: string
  name: string
  fileStatus: string
}

const Card: React.FC<CardProps> = ({ title, subtitle, status, image, action, name, fileStatus }) => {
  let statusColor = ''
  switch (status) {
    case 'transcribing':
      statusColor = 'blue'
      break
    case 'error':
      statusColor = 'red'
      break
    case 'edited':
      statusColor = 'green'
      break
  }

  return (
    <div style={{ border: `1px solid ${statusColor}`, padding: '0', maxWidth: '300px' }}>
      {image && <img src={image} alt={title} style={{ width: '100%' }} />}
      <div style={{ padding: '10px' }}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <p><strong>{name}</strong></p>
        <p>{status}</p>
        {status === 'error' && action && (
          <div>
            <button onClick={() => alert('Delete file')}>Delete file</button>
            <button onClick={() => alert('Report issue')}>Report issue</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
