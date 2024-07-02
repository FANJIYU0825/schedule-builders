import posthog from 'posthog-js'
import MainButton from './MainButton'
import { Card, useTheme, Typography, Box, Modal } from '@mui/material'
import { useState, useEffect } from 'react'

/**
 * @description Modal that displays the cookie consent information, allows the user to opt-in
 * or opt-out of analytics being captured.
 *
 */

function CookieConsent () {
  const theme = useTheme()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(window.localStorage.getItem('cookieConsent') === null)
  })

  const closeModal = () => {
    setOpen(false)
  }

  const acceptCookies = () => {
    posthog.opt_in_capturing()
    setOpen(false)
    window.localStorage.setItem('cookieConsent', true)
  }

  const declineCookies = () => {
    posthog.opt_out_capturing()
    setOpen(false)
    window.localStorage.setItem('cookieConsent', false)
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-describedby='modal-description'
      sx={{
        zIndex: 5000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box sx={{
        position: 'fixed',
        width: 1,
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Card
          elevation={20}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            minHeight: '10%',
            p: 4,
            pt: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              id='modal-description'
              variant='h6'
              component='h2'
              sx={{ color: (theme.typography.scheduleTitle ? theme.typography.scheduleTitle : theme.typography.title) }}
            >
              WE USE COOKIES
            </Typography>

            On this site, anonymized data is collected in order to analyze and improve the user experience.
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: 2
          }}
          >
            <MainButton
              color='accent'
              variant='outlined'
              sx={{ mx: 1 }}
              onClick={() => declineCookies()}
            >
              Decline
            </MainButton>
            <MainButton
              color='accent'
              variant='contained'
              sx={{ color: theme.palette.third.main, mx: 1 }}
              onClick={() => acceptCookies()}
            >
              Accept
            </MainButton>
          </Box>
        </Card>
      </Box>
    </Modal>
  )
}

export default CookieConsent
