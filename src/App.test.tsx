import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import App from './App'

const mock = new MockAdapter(axios)
const API_URL = 'https://run.mocky.io/v3/3c20b2a9-4a8b-46b6-83cb-01b83e680738'

const mockData = [
  {
    id: 1,
    title: 'Card 1',
    status: 'ready' as 'ready' | 'transcribing' | 'error' | 'edited',
    cover: 'https://via.placeholder.com/150',
    name: 'Name 1',
    fileStatus: 'File Status 1',
    languages: ['English', 'Spanish']
  },
  {
    id: 2,
    title: 'Card 2',
    status: 'transcribing' as 'ready' | 'transcribing' | 'error' | 'edited',
    cover: 'https://via.placeholder.com/150',
    name: 'Name 2',
    fileStatus: 'File Status 2',
    languages: ['English']
  }
]

mock.onGet(API_URL).reply(200, mockData)

test('renders App component and toggles view', async () => {
  render(<App />)

  // Verify cards are rendered
  expect(await screen.findByText('Card 1')).toBeInTheDocument()
  expect(await screen.findByText('Card 2')).toBeInTheDocument()

  // Verify toggle button works
  const toggleButton = screen.getByRole('button')

  // Switch to tile view
  fireEvent.click(toggleButton)
  expect(await screen.findByText('Card 1')).toBeInTheDocument()
  expect(await screen.findByText('Card 2')).toBeInTheDocument()

  // Switch back to scroller view
  fireEvent.click(toggleButton)
  expect(await screen.findByText('Card 1')).toBeInTheDocument()
  expect(await screen.findByText('Card 2')).toBeInTheDocument()
})
