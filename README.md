# AI Transcribe and Summarize Demo

This project is an AI-powered transcriber designed to work with YouTube videos. It takes a YouTube link, downloads the audio, and uses the Deepgram API to transcribe and summarize the content. Built with TypeScript and Next.js, this tool is perfect for anyone looking to get quick transcriptions and summaries of video content.

## Features

- **YouTube Audio Transcription:** Input a YouTube video link, and get a full text transcription of the audio content.
- **Audio Summarization:** Along with a full transcription, the tool provides a concise summary of the audio content, making it easier to grasp the essence of the video quickly.
- **Client-Side Caching:** Revisiting links? Our tool smartly caches transcriptions on the client side, ensuring faster access to previously processed videos.
- **Future Enhancements:** We are actively working to add more features, including a file picker option for local files and improving the Deepgram model's ability to transcribe song lyrics accurately.

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production.
- [TypeScript](https://www.typescriptlang.org/) - For type-safe code.
- [Deepgram SDK](https://www.deepgram.com/) - For audio transcription and summarization.
- [Styled-Components](https://styled-components.com/) - For styling.
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS.
- And more from our `package.json`.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm

```bash
npm install npm@latest -g
```

### Installation

Clone the repo

```bash
git clone https://github.com/your_username_/Project-Name.git
```

Install NPM packages

```bash
npm install
```

Create a .env.local file in the root directory and add your Deepgram API key.

\* If you don't have a key yet follow the instructions [at the end of the README](#get-deepgram-api-key).

```env
DEEPGRAM_API_KEY=YOUR_API_KEY_HERE
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the Transcriber.

## Usage

Enter a YouTube link into the input field and click the "Transcribe" button. The application will process the video, and you'll be presented with the audio's transcription and summary.

## Roadmap

- [x] **MVP**: YouTube video transcription and summarization
- [ ] File picker for local audio/video files
- [ ] Improve transcription accuracy for song lyrics
- [ ] Explore extending functionality to live conversations
- [ ] Investigate combining speech and image analysis for richer content understanding

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the MIT License.

## Obtaining a Deepgram API Key

\*Deepgram API key comes with $200 of free usage.

Before you can use the AI Transcribe and Summarize Demo, you'll need to obtain an API key from Deepgram. Follow these steps to get your key:

1. Go to [Deepgram's signup page](https://console.deepgram.com/signup) and create an account.
2. After signing up, log in to the Deepgram Console.
3. Navigate to the API Keys section of the console.
4. Click on the "Create New API Key" button.
5. Give your API key a name and optionally restrict its usage to specific IP addresses for added security.
6. Once created, copy your API key. You'll need to add this to your `.env.local` file as described in the installation instructions.

**Note:** Keep your API key secure. Do not share it publicly or with anyone who should not have access to your Deepgram account.
