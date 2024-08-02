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
    <div style={{ border: `2px solid ${statusColor}`, padding: '0', maxWidth: '300px' }}>
      {image && <img src={image} alt={title} style={{ width: '100%' }} />}
      <div style={{ padding: '10px' }}>
        <h3 style={{ margin: '0', padding: '5px 0' }}>{title}</h3>
        <p style={{ margin: '0', padding: '5px 0' }}>{subtitle}</p>
        <p style={{ margin: '0', padding: '5px 0' }}><strong>{name}</strong></p>
        <p style={{ margin: '0', padding: '5px 0' }}>{fileStatus}</p>
        {status === 'error' && action && (
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => alert('Delete file')}>Delete file</button>
            <button onClick={() => alert('Report issue')}>Report issue</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
