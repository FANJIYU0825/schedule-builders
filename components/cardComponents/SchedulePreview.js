import { Box, IconButton, Popper, Paper, Stack, Typography } from '@mui/material'
import { getCoords } from '../../utils/utility'
import { useSchedule } from '../../utils/hooks'
import { useTheme } from '@mui/material/styles'
import HelpIcon from '@mui/icons-material/Help'
import { useState } from 'react'
import CourseInfoBox from './CourseInfoBox'

function SchedulePreview ({ course }) {
  const [scheduleState, _] = useSchedule()
  const theme = useTheme()

  const xSnap = 10

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget.parentNode)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const coords = getCoords(course, scheduleState.semester)

  const PreviewGraphic = ({ coords }) => {
    const width = Math.round((coords.xEnd - coords.xStart) / xSnap) * xSnap
    return (
      <Stack
        position='absolute'
        width='90%'
        height='90%'
        sx={{
          overflow: 'hidden',
          borderRadius: theme.misc.borders.largeRadius,
          aspectRatio: '1 / 1'
        }}
        data-testid='schedule-preview'
      >
        <Box sx={{
          backgroundColor: theme.palette.secondary.light,
          position: 'absolute',
          width: `${width}%`,
          minWidth: `${width}%`,
          height: `${coords.height}%`,
          left: `${Math.round(coords.xStart / xSnap) * xSnap}%`,
          bottom: '0%',
          borderRadius: theme.misc.borders.radius
        }}
        />
      </Stack>
    )
  }

  const HelpPopover = () => (
    <>
      <IconButton
        sx={{
          position: 'absolute',
          bottom: '0%',
          transform: 'translate(0%, 50%)'
        }}
        onClick={handlePopoverOpen}
      >
        <HelpIcon sx={{
          zIndex: 200,
          color: theme.palette.accent.main
        }}
        />
        {/* This box is to hide the line behind the HelpIcon, which is otherwise visible in the transparent parts of the SVG */}
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '10%',
            height: '10%',
            minWidth: '10%',
            minHeight: '10%'
          }}
        />
      </IconButton>

      <Popper
        sx={{
          zIndex: 10000,
          textAlign: 'center'
        }}
        open={Boolean(anchorEl)}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        placement='bottom'
      >
        <Paper sx={{ maxWidth: '400px' }}>
          <Typography variant='h6' sx={{ color: theme.palette.primary.uuRed, paddingLeft: 1, paddingRight: 1 }}>
            Course Placement
          </Typography>
          <Typography sx={{ p: 1 }}>
            The square represents the study pace associated with a given course, where the background shade corresponds to the course's position within the schedule. The width corresponds to the duration of the course, while the height corresponds to the study pace during this period.
          </Typography>
          <Typography sx={{ p: 1, color: theme.palette.primary.uuRed }}>
            A few examples of how this might look
          </Typography>
          <Stack direction='row' justifyContent='space-evenly' sx={{ p: 1 }}>
            <Stack direction='column' alignItems='center'>
              <Typography sx={{ p: 1 }}>
                100% Study Pace <br />
                15 Credits <br />
                Aug - Oct
              </Typography>
              <CourseInfoBox containerOnly unit='Pace'>
                <PreviewGraphic coords={{ xStart: 0, xEnd: 50, height: 100 }} />
              </CourseInfoBox>
            </Stack>
            <Stack direction='column' alignItems='center'>
              <Typography sx={{ p: 1 }}>
                25% Study Pace <br />
                7.5 Credits <br />
                Aug - Jan
              </Typography>
              <CourseInfoBox containerOnly unit='Pace'>
                <PreviewGraphic coords={{ xStart: 0, xEnd: 100, height: 25 }} />
              </CourseInfoBox>
            </Stack>
            <Stack direction='column' alignItems='center'>
              <Typography sx={{ p: 1 }}>
                67% Study Pace <br />
                10 Credits <br />
                Nov - Jan
              </Typography>
              <CourseInfoBox containerOnly unit='Pace'>
                <PreviewGraphic coords={{ xStart: 50, xEnd: 100, height: 67 }} />
              </CourseInfoBox>
            </Stack>
          </Stack>
        </Paper>
      </Popper>
    </>
  )

  return (
    <>
      <PreviewGraphic coords={coords} />
      <HelpPopover />
    </>
  )
}

export default SchedulePreview
