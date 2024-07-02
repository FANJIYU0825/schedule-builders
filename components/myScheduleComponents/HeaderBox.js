import { useTheme } from '@emotion/react'
import { Paper } from '@mui/material'

function HeaderBox ({ warning, elevation = 1, show, children, bgcolor = '#FFF', text = false, isInCard = false }) {
  const theme = useTheme()

  return (
    <Paper
      elevation={elevation}
      sx={{
        display: show ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: theme.misc.borders.radius,
        // The specific height of 36.5px is due to the ButtonRemove component have that height
        height: isInCard ? '36.5px' : '100%',
        paddingX: isInCard ? '0' : '0.5vw',
        paddingY: isInCard ? '0' : '10px',
        aspectRatio: text || warning ? 'auto' : '1 / 1',
        backgroundColor: bgcolor,
        overflow: 'hidden',
        mb: isInCard ? '0' : '5px',
        // Checks if its a number element and changes
        // to a more number friendly font if this is the case
        fontFamily: !text && 'Helvetica'
      }}
    >
      {children}
    </Paper>
  )
}

export default HeaderBox
