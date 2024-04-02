import handleDeepgramFetch from '@/hooks/useDeepgramFetch'

export default function Home() {
  console.log(handleDeepgramFetch)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
