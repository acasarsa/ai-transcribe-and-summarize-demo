"use client"
import React, {useState} from 'react'


import handleDeepgramFetch from '@/hooks/useDeepgramFetch'
const url = 'https://dpgr.am/spacewalk.wav'

export default function Home() {
  const [link, setLink] = useState(url);

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(event.target.value)
  };

  const handleTranscribe = (): void => {
    handleDeepgramFetch(url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input value={link} onChange={handleLink} style={{color:'red'}}/>
      <button onClick={handleTranscribe}>Transribe</button>
    </main>
  )
}
