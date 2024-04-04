import { DeepgramApiError, createClient, isDeepgramError } from '@deepgram/sdk'
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

import youtubeLinkConverter from '@/utils/youTubeLinkConverter'
import fs from 'fs'

interface TranscribeResponseData {
  transcription?: string
  summary?: string
  error?: string
  fullResult?: any // for debugging purposes
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranscribeResponseData>
) {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { url } = req.body
  if (!url) {
    res.status(400).json({ error: 'URL is required' })
    return
  }

  const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')
  const videoFileName = await youtubeLinkConverter(url)
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      // { url },
      fs.createReadStream(videoFileName),
      {
        model: 'nova-2',
        smart_format: true,
        summarize: 'v2',
        diarize: true,
        paragraphs: true,
        punctuation: true,
      }
    )

    if (error) {
      // Utilize isDeepgramError for generic error checking
      if (isDeepgramError(error)) {
        // Further refine handling for specific error types
        if (error instanceof DeepgramApiError) {
          const errorMsg = `API Error: ${error.message} (Status: ${error.status})`
          res.status(error.status).json({ error: errorMsg })
        } else {
          const errorMsg = `Error: ${error.message}`
          res.status(500).json({ error: errorMsg })
        }
        return
      }
    }
    // TRANSCRIPTION RESULTS
    res.status(200).json({
      // fullResult: result, // for debugging purposes
      transcription: result.results.channels[0].alternatives[0].transcript,
      summary: result.results.summary.short,
    })
  } catch (error) {
    const unexpectedError =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).json({ error: unexpectedError })
  } finally {
    try {
      fs.unlinkSync(videoFileName)
      console.log(`Successfully deleted ${videoFileName}`)
    } catch (deleteError) {
      console.error(`Error deleting file ${videoFileName}: ${deleteError}`)
    }
  }
}
