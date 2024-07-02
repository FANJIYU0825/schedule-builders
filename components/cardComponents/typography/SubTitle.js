import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function SubTitle ({ subtitle }) {
  const theme = useTheme()

  return (
    <Typography
      variant='subtitle2'
      sx={{ fontSize: theme.typography.helptext.fontSize }}
      color={theme.palette.primary.main}
    >
      {subtitle}
    </Typography>
  )
}

export default SubTitle
