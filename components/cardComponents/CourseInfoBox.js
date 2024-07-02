import { Paper, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SubTitleValue from './typography/SubTitleValue'
import AlertInfo from '../misc/AlertInfo'
import { useState } from 'react'
import SchedulePreview from './SchedulePreview'

/**
 * @description The box component inside the card components that holds one part of the course information.
 *
 * @param {string} value - The information to display.
 * @param {string} unit - The unit of that information.
 * @param {string} unitAcronym - The acronym of the uni.
 * @param {boolean} alert - True if the component has a popover/alert on hover, otherwise false.
 * @param {string} type - What kind of box that should be displayed, e.g the prerequisites box or the others.
 *
*/
function CourseInfoBox ({ containerOnly, children, compact, value, unit, unitAcronym, alert, type = 'prerequisites' }) {
  const theme = useTheme()
  // The anchorEl state is passed to the PrerequisitePopover component, allowing
  // the popover to be activadted when hovering over the box (and not just the icon).
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const boxDimensions = () => {
    if (compact) {
      return {
        width: '50px'
      }
    }
    if (unit === 'Pace') {
      return {
        width: '105px',
        maxWidth: '6vw',
        [theme.breakpoints.down('xl')]: {
          width: '85px',
          maxWidth: '85px'
        }
      }
    } else {
      return {
        width: '85px',
        maxWidth: '5vw',
        [theme.breakpoints.down('xl')]: {
          width: '75px',
          maxWidth: '75px'
        }
      }
    }
  }

  const Contents = () => (
    !alert
      ? <SubTitleValue
          value={unit === 'Pace' ? value.creditsECTSDecimal : value}
          unit={!compact ? unit : null}
          unitAcronym={unitAcronym}
          color={theme.palette.primary.main}
        />
      : <>
        <Stack alignContent='center' spacing={0.25}>
          {!compact ? <SubTitleValue value={type === 'prerequisites' ? 'Entry Requirement' : 'Remote Course'} unit='' /> : null}
          <AlertInfo anchorEl={anchorEl} course={value} type={type} />
        </Stack>
        </>
  )

  const PreviewGraphic = () => (
    unit === 'Pace' ? <SchedulePreview course={value} /> : null
  )
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.third.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1 / 1',
        padding: '2px',
        borderRadius: theme.misc.borders.largeRadius,
        border: `2px solid ${unit === 'Pace' ? theme.palette.primary.uuRed : theme.palette.secondary.main}`,
        ...boxDimensions()
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onBlur={handlePopoverClose}
    >
      {containerOnly
        ? children
        : <>
          <Contents />
          <PreviewGraphic />
          </>}
    </Paper>
  )
}

export default CourseInfoBox
