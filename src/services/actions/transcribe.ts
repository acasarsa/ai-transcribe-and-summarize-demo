'use server'
import { createClient } from '@deepgram/sdk'
import youtubeLinkConverter from './youtubeLinkConverter'
const fs = require('fs')
require('dotenv').config()

// export interface TranscriptionResponse {
//   transcription: string
//   summary: string
//   // Add other fields you might need from the response
// }
// interface DeepgramErrorResponse {
//   err_code: string
//   err_msg: string
//   request_id: string
// }

// type ApiResponse = TranscriptionResponse | DeepgramErrorResponse
export type ApiResponse =
  | { error: string } // Simplified error representation
  | { transcription: string; summary: string }
// need videoFileName as a prop
export const deepgramTranscribe = async (url: string): Promise<ApiResponse> => {
  if (!url) {
    return { error: 'URL is required' }
  }

  // Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')
  const videoFileName = youtubeLinkConverter(url)
  // Continue on to get transcript here

  // Call the transcribeUrl method with the audio payload and options
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.createReadStream(videoFileName),
      // Configure Deepgram options for audio analysis
      {
        model: 'nova-2',
        smart_format: true,
        summarize: 'v2',
      }
    )
    if (error) {
      error: error.toString()
    }

    console.dir(result, { depth: null })
    // get transcription and summary. getting confidence would be good later too if we wanted to throw some error if the confidence was low.
    return {
      transcription: result!.results.channels[0].alternatives[0].transcript,
      summary: result!.results.summary,
    }
  } catch (catchError) {
    return { error: 'An unexpected error occurred during transcription.' }
  }
}
