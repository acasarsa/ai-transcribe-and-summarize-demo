'use server'
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const ffmpeg = require('ffmpeg-static')

const youtubeLinkConverter = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const YD = new YoutubeMp3Downloader({
      ffmpegPath: ffmpeg,
      outputPath: './',
      youtubeVideoQuality: 'highestaudio',
    })

    // extract the video ID
    const videoId = extractVideoIdFromUrl(url)
    YD.download(videoId)

    YD.on('progress', (data: any) => {
      console.log(data.progress.percentage + '% downloaded')
    })

    YD.on('finished', (err: any, video: any) => {
      if (err) {
        reject(err)
      } else {
        console.log(`Downloaded ${video.file}`)
        resolve(video.file) // Resolve the promise with the video file name
      }
    })

    YD.on('error', (error: any) => {
      reject(error) // Reject the promise on error
    })
  })
}

// Utility function to extract video ID from YouTube URL (you need to implement this based on your needs)
function extractVideoIdFromUrl(url: string): string {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
  )
  if (match && match[1]) {
    return match[1]
  }
  throw new Error('Invalid YouTube URL')
}

export default youtubeLinkConverter
