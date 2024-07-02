import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTheme } from '@mui/system'
import { Stack } from '@mui/material'
import PrerequisitePopoverIcon from './PrerequisitePopoverIcon'
import PrerequisitePopoverText from './PrerequisitePopoverText'

/**
 * @description Component that shows all prerequisites of one type listed in a popover.
 *              What type of prerequisites it will show depends on the type parameter.
 * @param courses A list of all courses to check prerequisites for.
 * @param type Can either be 'warning', 'error', or 'info'.
*/
function PrerequisitePopoverList ({ courses, type }) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const prerequisiteText = (course) => {
    return (
      <div key={course.code}>
        <Typography align='left' inline='true' sx={{ padding: '0.5rem 0.5rem 0 0.5rem', fontWeight: 1000, m: 0 }}>
          {course.name}
        </Typography>
        <Typography align='left' inline='true' sx={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
          {course.description}
        </Typography>
      </div>
    )
  }

  const locationText = (course) => {
    return (
      <div key={course.code}>
        <Typography align='left' inline='true' sx={{ padding: '0.5rem 0.5rem 0 0.5rem', fontWeight: 1000, m: 0 }}>
          {course.name}
        </Typography>
        <Typography align='left' inline='true' sx={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
          Location: {course.campus}
        </Typography>
      </div>
    )
  }

  const remoteWarning = (
    <Typography align='left' inline='true' sx={{ padding: '0.5rem 0.5rem 0 0.5rem', m: 0 }}>
      The following remote courses are not eligible for exchange studies:
    </Typography>
  )

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <PrerequisitePopoverIcon
        type={type}
        handlePopoverClose={handlePopoverClose}
        handlePopoverOpen={handlePopoverOpen}
      />

      <Popover
        sx={{
          pointerEvents: 'none',
          textAlign: 'center',
          zIndex: 10000
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{ style: { maxWidth: '400px' } }}
      >
        <Typography variant='h6' sx={{ color: theme.palette.primary.uuRed, paddingLeft: 1, paddingRight: 1 }}>
          <PrerequisitePopoverText type={type} />
        </Typography>

        {type === 'remote' ? remoteWarning : <></>}

        {courses.map((course) => {
          if (type === 'warning' && course.period.includes('First cycle')) {
            return (
              prerequisiteText(course)
            )
          } else if (type === 'error' && course.period.includes('Second cycle')) {
            return (
              prerequisiteText(course)
            )
          } else if (type === 'info' && course.period.includes('General entry requirements')) {
            return (
              prerequisiteText(course)
            )
          } else if (type === 'remote' && course.campus.toLowerCase().includes('flexible')) {
            return (
              locationText(course)
            )
          } else {
            return null
          }
        })}
      </Popover>
    </Stack>
  )
}

export default PrerequisitePopoverList
