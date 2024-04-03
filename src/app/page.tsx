'use client'
import { deepgramTranscribe } from '@/services/actions/transcribe'
import React, { useState } from 'react'

const url = 'https://www.youtube.com/watch?v=tJ8CfpXajdo'

interface IPageProps {
  transcription?: string
  summary?: string
  error?: string
}

export default function Home({ transcription, summary, error }: IPageProps) {
  const [link, setLink] = useState(url)
  console.log('link:', link)
  // const [transcription, setTranscription] = useState('')
  // const [summary, setSummary] = useState('')
  // const [errorMessage, setErrorMessage] = useState('')

  const handleLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
  }

  async function handleTranscribe() {
    // const videoFileName = await youtubeLinkConverter(url)
    const apiResult = await deepgramTranscribe(url)

    // Check for error in the response
    if ('error' in apiResult) {
      return {
        props: {
          error: apiResult.error, // Pass the error message to the page
        },
      }
    }

    // If no error, destructure transcription and summary from the apiResult
    const { transcription, summary } = apiResult

    return {
      props: {
        transcription,
        summary,
      },
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input value={link} onChange={handleLink} style={{ color: 'red' }} />
      <button onClick={handleTranscribe}>Transcribe</button>
    </main>
  )
}

// export const getServerSideProps: GetServerSideProps<IPageProps> = async (
//   context
// ) => {
//   const { url } = context.query as { url: string }
//   const apiResult = await deepgramTranscribe(url)

//   // Check for error in the response
//   if ('error' in apiResult) {
//     return {
//       props: {
//         error: apiResult.error, // Pass the error message to the page
//       },
//     }
//   }

//   // If no error, destructure transcription and summary from the apiResult
//   const { transcription, summary } = apiResult

//   return {
//     props: {
//       transcription,
//       summary,
//     },
//   }
// }
