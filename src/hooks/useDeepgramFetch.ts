import { createClient } from '@deepgram/sdk'

const API_KEY: string | undefined = process.env.DEEPGRAM_API_KEY
const url = 'https://dpgr.am/spacewalk.wav'

const handleDeepgramFetch = async (url: string) => {
  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')

  // STEP 2: Call the transcribeUrl method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    {
      url: url,
    },
    // STEP 3: Configure Deepgram options for audio analysis
    {
      model: 'nova-2',
      smart_format: true,
    }
  )

  if (error) throw error
  // STEP 4: Print the results
  if (!error) console.dir(result, { depth: null })
}

export default handleDeepgramFetch
