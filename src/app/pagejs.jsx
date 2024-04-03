// 'use client'
// import { deepgramTranscribe } from '@/services/actions/transcribe'
// import { useState } from 'react'

// const url = 'https://www.youtube.com/shorts/6NYz8JtiC1U'

// export default function Home() {
//   const [link, setLink] = useState(url)
//   console.log('link:', link)
//   const [transcription, setTranscription] = useState('')
//   const [summary, setSummary] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   const handleLink = (event) => {
//     setLink(event.target.value)
//   }

//   async function handleTranscribe() {
//     await deepgramTranscribe(url).then(({ data }) => {
//       console.log('response data=', data)
//       if (!data.error) {
//         setTranscription(data.transcription)
//         setSummary(data.summary)
//       } else {
//         setErrorMessage(data.error)
//       }
//     })
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <input value={link} onChange={handleLink} style={{ color: 'red' }} />
//       <button onClick={handleTranscribe}>Transcribe</button>
//     </main>
//   )
// }
