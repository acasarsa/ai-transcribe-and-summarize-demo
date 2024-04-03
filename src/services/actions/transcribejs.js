// 'use server'
// import { createClient } from '@deepgram/sdk'
// const fs = require('fs')
// const YoutubeMp3Downloader = require('youtube-mp3-downloader')
// const ffmpeg = require('ffmpeg-static')
// require('dotenv').config()

// export const deepgramTranscribe = async (url) => {
//   if (!url) throw new Error('URL is required')

//   // Create a Deepgram client using the API key
//   const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')

//   const YD = new YoutubeMp3Downloader({
//     ffmpegPath: ffmpeg,
//     outputPath: './',
//     youtubeVideoQuality: 'highestaudio',
//   })

//   YD.download('ir-mWUYH_uo')

//   YD.on('progress', (data) => {
//     console.log(data.progress.percentage + '% downloaded')
//   })

//   YD.on('finished', async (err, video) => {
//     const videoFileName = video.file
//     console.log(`Downloaded ${videoFileName}`)

//     // Continue on to get transcript here
//     // Call the transcribeUrl method with the audio payload and options
//     const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
//       {
//         url: url,
//       },
//       // Configure Deepgram options for audio analysis
//       {
//         model: 'nova-2',
//         smart_format: true,
//         summarize: 'v2',
//       }
//     )
//     if (error) return { data: error }

//     console.dir(result, { depth: null })
//     // get transcription and summary. getting confidence would be good later too if we wanted to throw some error if the confidence was low.
//     return {
//       data: {
//         transcription: result.results.channels[0].alternatives[0].transcript,
//         summary: result.results.summary,
//       },
//     }
//   })
// }
