import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function SubTitleValue ({ value, unit, unitAcronym, color }) {
  const theme = useTheme()
  return (
    <Typography
      variant='body2'
      color={color}
      sx={{ zIndex: 1, textAlign: 'center', fontSize: theme.typography.subheadingSmall, userSelect: 'none' }}
    >
      <b style={{ fontWeight: 600 }}>{value} {unitAcronym}</b>
      <br />
      {unit}
    </Typography>
  )
}

export default SubTitleValue
