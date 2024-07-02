import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@mui/material/styles'
import { landingTheme } from '../styles/landingTheme'
import MainContainer from '../components/landingPage/MainContainer'
import { TutorialStepperProvider } from '../components/contexts/TutorialStepperContext'
import { UserActionProvider } from '../components/contexts/UserActionContext'
import CookieConsent from '../components/misc/CookieConsent'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/app')
  }, [])

  return (
    <>
      <Head>
        <title>Schedule Builder - Home </title>
        <meta name='description' />
        <link rel='icon' href='/header_icon.svg' />
      </Head>
      <ThemeProvider theme={landingTheme}>
        <TutorialStepperProvider>
          <UserActionProvider>
            <MainContainer />
          </UserActionProvider>
        </TutorialStepperProvider>
        <CookieConsent />
      </ThemeProvider>
    </>
  )
}
