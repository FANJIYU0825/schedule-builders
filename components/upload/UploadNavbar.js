import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import styles from '../../styles/LandingPage.module.css'
import NavButton from '../landingPage/navbarComponents/NavButton'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LinearIndeterminate from '../landingPage/navbarComponents/LinearIndeterminate'

/**
 * @description Component that implements the upload page navbar.
*/

function UploadNavbar ({ setOpenHelper }) {
  const [loadingPage, setLoadingPage] = useState(false)
  const router = useRouter()

  const handleRoute = () => {
    setLoadingPage(true)
    router.push('/')
  }

  const theme = useTheme()

  return (
    <AppBar
      elevation={0}
      component='nav'
      sx={{ backgroundColor: '#FFFFFF', color: theme.palette.primary.text, zIndex: 3000 }}
    >
      {loadingPage ? <LinearIndeterminate /> : null}
      <Toolbar>
        <img className={styles.navlogo} src='/images/uulogo.png' onClick={handleRoute} />
        <Typography
          sx={{ fontWeight: theme.typography.fontWeight, flexGrow: 1, color: theme.palette.primary.main }}
        >
          SCHEDULE BUILDER - UPLOAD
        </Typography>
        <NavButton sx={{ fontSize: '18px' }} onClick={() => setOpenHelper(true)}> Help </NavButton>
      </Toolbar>
    </AppBar>
  )
}

export default UploadNavbar
