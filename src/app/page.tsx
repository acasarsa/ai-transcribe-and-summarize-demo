'use client'
import React, { useState } from 'react'

const url = 'https://dpgr.am/spacewalk.wav'

export default function Home() {
  const [link, setLink] = useState(url)
  console.log('link:', link)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [transcription, setTranscription] = useState('')
  const [summary, setSummary] = useState('')

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(event.target.value)
  }

  async function handleTranscribe() {
    setIsLoading(true) // Start loading
    setErrorMessage('') // Reset error message

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }), // Use the user-provided link
      })

      if (!response.ok) {
        throw new Error('Failed to fetch transcription')
      }

      const data = await response.json()

      if (data.error) {
        setErrorMessage(data.error)
      } else {
        setTranscription(data.transcription)
        setSummary(data.summary.short)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred'
      setErrorMessage(errorMessage)
    } finally {
      setIsLoading(false) // End loading
    }
    // console.log(summary)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input value={link} onChange={handleLink} style={{ color: 'red' }} />
      <button onClick={handleTranscribe} disabled={isLoading}>
        {isLoading ? 'Transcribing...' : 'Transcribe'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
      {transcription && <p>Transcription: {transcription}</p>}
      {summary && <p>Summary: {summary}</p>}
    </main>
  )
}
