import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import NavButton from './NavButton'

function MobileMenu ({ setChangeLogOpen }) {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <IconButton
        onClick={handleOpenNavMenu}
        sx={{ display: { xs: 'flex', md: 'none' } }}
        data-testid='mobile-menu-button'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: 3500
        }}
      >
        <MenuItem>
          <NavButton onClick={() => setChangeLogOpen(true)}>Change Log</NavButton>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MobileMenu
