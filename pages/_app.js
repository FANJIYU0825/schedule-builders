import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { UserProvider } from '@auth0/nextjs-auth0/client'

// Initialize Posthog login and Formbricks login (window !== undefined to make sure it is running on the client)
if (typeof window !== 'undefined') {
  const isDev = process.env.NODE_ENV === 'development'
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    api_host: 'https://eu.posthog.com',
    loaded: (posthog) => {
      if (isDev) posthog.opt_out_capturing()
    }
  })
}

function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => {
      posthog.capture('$pageview')
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
