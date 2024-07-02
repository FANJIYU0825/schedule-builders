import { Typography, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function SubTitleLocation ({ subtitle }) {
  const theme = useTheme()

  return (
    <Stack direction='row'>
      <Typography
        variant='subtitle2'
        sx={{ fontSize: theme.typography.subheadingSmall, width: '50%' }}
        color={theme.palette.secondary.darker}
      >
        {subtitle}
      </Typography>
    </Stack>
  )
}

export default SubTitleLocation
