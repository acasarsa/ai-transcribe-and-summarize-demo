'use server'
import { createClient } from '@deepgram/sdk'
require('dotenv').config()

export const deepgramTranscribe = async (url: string): Promise<any> => {
  if (!url) throw new Error('URL is required')

  // Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')

  try {
    // Call the transcribeUrl method with the audio payload and options
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: url,
      },
      // Configure Deepgram options for audio analysis
      {
        model: 'nova-2',
        smart_format: true,
        summarize: 'v2',
      }
    )
    if (error) return { data: error }

    console.dir(result, { depth: null })
    // get transcription and summary. getting confidence would be good later too if we wanted to throw some error if the confidence was low.
    return {
      data: {
        transcription: result!.results.channels[0].alternatives[0].transcript,
        summary: result!.results.summary,
      },
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
