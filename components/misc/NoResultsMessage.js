import SearchOffIcon from '@mui/icons-material/SearchOff'
import { useTheme } from '@mui/material/styles'

function NoResultsMessage ({ message }) {
  const theme = useTheme()
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    backgroundColor: theme.palette.third.main,
    borderRadius: theme.misc.borders.radius,
    width: '100%'
  }
  const iconStyle = {
    fontSize: 48,
    color: theme.palette.primary.main
  }
  const messageStyle = {
    fontSize: 16,
    color: theme.palette.primary.main
  }
  return (
    <div style={containerStyle}>
      <SearchOffIcon style={iconStyle} />
      <p style={messageStyle}>{message}</p>
    </div>
  )
}

export default NoResultsMessage
