import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import NavButton from './NavButton'
import styles from '../../../styles/LandingPage.module.css'
import MobileMenu from './MobileMenu'
import LinearIndeterminate from './LinearIndeterminate'
import LaunchButton from '../LaunchButton'
import ChangeLog from './ChangeLog'
import { useState } from 'react'

/**
 * @description Component that implements the landing page navbar.
 *
 * @param {boolean} loadingPage Boolean that says if the page is in loading state or not
 * @param dispatch Reducer dispatch function
 * @param setLoadingPage Function that sets the loading state of the landing page
*/

function Navbar ({ dispatch, setLoadingPage, loadingPage }) {
  const theme = useTheme()
  const [changeLogOpen, setChangeLogOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <AppBar
        elevation={0}
        component='nav'
        sx={{ backgroundColor: '#FFFFFF', color: theme.palette.primary.text, zIndex: 3000 }}
      >
        {loadingPage && <LinearIndeterminate />}
        <Toolbar>
          <img className={styles.navlogo} src='/images/uulogo.png' onClick={() => dispatch({ type: 'reset' })} style={{ cursor: 'pointer' }} />
          <Typography
            sx={{ fontWeight: theme.typography.fontWeight, flexGrow: 1 }}
            onClick={() => dispatch({ type: 'reset' })}
            style={{ cursor: 'pointer' }}
          >
            SCHEDULE BUILDER
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', gap: '50px' }}>
            <NavButton onClick={() => setChangeLogOpen(true)}> Change Log </NavButton>
            <LaunchButton setLoadingPage={setLoadingPage} location='nav' />
          </Box>
          <MobileMenu setChangeLogOpen={setChangeLogOpen} />
        </Toolbar>
      </AppBar>
      <ChangeLog open={changeLogOpen} setOpen={setChangeLogOpen} />
    </Box>
  )
}

export default Navbar
