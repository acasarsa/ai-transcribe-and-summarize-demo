import { createClient } from '@deepgram/sdk'
require("dotenv").config();

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY

const handleDeepgramFetch = async (url: string) => {

  if(!url) return; 
  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(API_KEY || '')

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
