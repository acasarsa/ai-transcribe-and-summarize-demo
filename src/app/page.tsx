'use client'
import { deepgramTranscribe } from '@/services/actions/transcribe'
import React, { useState } from 'react'

const url = 'https://dpgr.am/spacewalk.wav'

export default function Home() {
  const [link, setLink] = useState(url)
  console.log('link:', link)

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(event.target.value)
  }

  async function handleTranscribe() {
    await deepgramTranscribe(url).then((res) => {
      console.log('response data=', res!.data)
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input value={link} onChange={handleLink} style={{ color: 'red' }} />
      <button onClick={handleTranscribe}>Transcribe</button>
    </main>
  )
}
