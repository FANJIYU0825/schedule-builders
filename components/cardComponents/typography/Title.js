import { Typography, Popper, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

/**
 * A component for displaying a title with optional truncation.
 *
 * @param {Array} params - An array containing the name and code.
 * @param {boolean} center - Whether to center-align the title.
 * @param {Object} style - Additional styles to apply to the title.
 * @param {number} truncate (default value: default value: 0) - The number of lines to truncate the title. Set to 0 to disable truncation.
 * @param {boolean} expand (default value: false) - Whether to expand the title on hover.
 */
function Title ({ params, center, style, truncate = 0, expand = false }) {
  const theme = useTheme()
  const [name, code] = params

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMouseEnter = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  const open = expand && truncate ? Boolean(anchorEl) : false
  const id = open ? 'simple-popper' : undefined

  const truncateStyle = truncate
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: truncate - 1,
        WebkitBoxOrient: 'vertical'
      }
    : {}

  return (
    <>
      <Typography
        sx={{
          ...theme.typography.subheading,
          margin: 0,
          textAlign: (center ? 'center' : 'left'),
          ...truncateStyle,
          ...style,
          [theme.breakpoints.down('xl')]: { fontSize: '14px' }
        }}
        color={theme.palette.primary.main}
        gutterBottom
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {`${name}`} {truncate ? null : `(${code})`}
      </Typography>

      {truncate
        ? <Typography
            sx={{
              ...theme.typography.subheading,
              margin: 0,
              textAlign: (center ? 'center' : 'left'),
              ...style,
              [theme.breakpoints.down('xl')]: { fontSize: '14px' }
            }}
            color={theme.palette.primary.main}
            gutterBottom
          >
          {`(${code})`}
        </Typography>
        : null}

      <Popper id={id} sx={{ zIndex: 2 }} open={open} anchorEl={anchorEl}>
        <Card sx={{ p: 1, bgcolor: 'background.paper' }}>
          {`${name} (${code})`}
        </Card>
      </Popper>
    </>
  )
}

export default Title
