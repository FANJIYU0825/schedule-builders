import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function Footer () {
  const theme = useTheme()
  return (
    <AppBar
      elevation={0}
      component='nav'
      sx={{ height: '75px', justifyContent: 'center', alignItems: 'center', top: 'auto', bottom: 0, backgroundColor: '#FFFFFF', color: theme.palette.primary.text }}
    >
      <Toolbar>
        <Typography
          sx={{ fontSize: theme.typography.buttonText, fontWeight: theme.typography.fontWeight, flexGrow: 1 }}
        >
          Cookie Policy
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
