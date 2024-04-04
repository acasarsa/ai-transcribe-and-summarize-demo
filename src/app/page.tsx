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

    // Step 1: Check cache
    const cachedData = localStorage.getItem(link)

    if (cachedData) {
      const parsedData = JSON.parse(cachedData)
      console.log('Retrieved cached data:', parsedData)
      const { transcription, summary } = JSON.parse(cachedData)
      setTranscription(transcription)
      setSummary(summary)
      setIsLoading(false)
      return
    }
    try {
      // Step 2: Fetch data because it's not in the cache
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }), // Use the user-provided link
      })

      if (!response.ok) {
        throw new Error('Failed to fetch transcription')
      }

      const data = await response.json()

      // Step 3: Store fetched data in cache
      localStorage.setItem(
        link,
        JSON.stringify({
          // fullResult: data.fullResult,
          transcription: data.transcription,
          summary: data.summary,
        })
      )

      // Process and set the data
      if (data.error) {
        setErrorMessage(data.error)
      } else {
        setTranscription(data.transcription)
        setSummary(data.summary)
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    } finally {
      setIsLoading(false) // End loading
    }
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
