'use client'
import React, { useState } from 'react'
import styled from 'styled-components'

const url = 'https://youtube.com/shorts/_dVnTppFRz4?si=6YIhBWR2e_mVsrtG'

export default function Home() {
  const [link, setLink] = useState(url)

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
      // const parsedData = JSON.parse(cachedData)
      // console.log('Retrieved cached data:', parsedData)
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
    <Wrapper >
      <LeftSide>
      <Input
        value={link}
        onChange={handleLink}
      placeholder="Please enter youtube video link"
      />
      <Button onClick={handleTranscribe} disabled={isLoading}>
        {isLoading ? 'Transcribing...' : 'Transcribe'}
      </Button>
      {errorMessage && <ErrorText style={{ color: 'red' }}>{errorMessage}</ErrorText>}
      </LeftSide>

      <RightSide>
      {transcription && <Text>Transcription: {transcription}</Text>}
      {summary && <Text>Summary: {summary}</Text>}
      </RightSide>
    </Wrapper>
  )
}

const ErrorText = styled.p`
  color: red; 
  margin-top: 10px; 
  font-size: 14px; 
`
const Text = styled.p`
  color: white; 
  margin-bottom: 40px; 
`

const Wrapper = styled.main`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border: 1px solid white; 
  border-radius: 10px; 
  margin: 20px 40px;
`

const LeftSide = styled.div`
  min-height: 300px; 
  padding: 10px 10px 10px 20px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  width: 50%; 
  `
  const Input = styled.input`
  margin-bottom: 20px; 
  border: 1px solid white; 
  border-radius: 6px; 
  padding: 5px 10px; 
  width: 100%; 
  `


const RightSide = styled.div`
  min-height: 300px; 
  max-height: 75vh;
  overflow-y: auto; 
  width: 100% ;
  padding: 10px 20px 10px 10px; 
`

const Button = styled.button`
  background: greenyellow; 
  color: black; 
  max-width: fit-content; 
  padding: 10px; 
  border-radius: 4px; 
`