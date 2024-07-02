import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function CourseDepartment ({ department }) {
  const theme = useTheme()
  return (
    <Typography
      sx={{ fontSize: theme.typography.subheadingSmall, mr: '5px' }}
      variant='subtitle2'
      color={theme.palette.secondary.darker}
    >
      {department}
    </Typography>
  )
}

export default CourseDepartment
