import React from 'react'

type CardProps = {
  title: string
  subtitle: string
  status: 'transcribing' | 'error' | 'edited'
  image?: string
  action?: string
  name: string
  fileStatus: string
  onDelete: () => void
}

const Card: React.FC<CardProps> = ({ title, subtitle, status, image, name, fileStatus, onDelete }) => {
  return (
    <div style={{ 
        border: 'none', 
        padding: '0', 
        maxWidth: '300px', 
        position: 'relative', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
      <div style={{ position: 'relative', borderRadius: '10px 10px 0 0' }}>
        {image && <img src={image} alt={title} style={{ width: '100%', borderRadius: '10px 10px 0 0' }} />}
        {status === 'error' && (
          <>
            <div style={{ 
              position: 'absolute', 
              top: '0', 
              left: '0', 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#d3a0a0', //'rgba(255, 255, 255, 0.5)', 
              zIndex: 1, 
              borderRadius: '10px 10px 0 0' 
            }}></div>
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '10px', zIndex: 2 }}>
              <p>
                An error occurred while processing your file. Delete the file to try again, and report issues if the problem persists.
              </p>
            </div>
            <div style={{ position: 'absolute', top: '100px', right: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end', zIndex: 2 }}>
              <button
                onClick={onDelete}
                style={{
                  backgroundColor: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                Delete file
              </button>
              <button
                onClick={() => alert('Report issue')}
                style={{
                  backgroundColor: '#6c63ff',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                Report issue
              </button>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '10px' }}>
        <p style={{ margin: '0', padding: '5px 0' }}><strong>{name}</strong></p>
        <p style={{ margin: '0', padding: '5px 0' }}>{status}</p>
      </div>
    </div>
  )
}

export default Card
