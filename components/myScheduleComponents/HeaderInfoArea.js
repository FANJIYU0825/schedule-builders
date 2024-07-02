import { Typography, Stack, useTheme } from '@mui/material'
import HeaderBox from './HeaderBox'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PrerequisitePopoverList from '../misc/PrerequisitePopoverList'
import { useSchedule } from '../../utils/hooks'
import { capitalFirstLetter } from '../../utils/utility'

/**
 * @description Component in the my schedule panel that holds the information of period, credits, location,
 * warnings and errors of the courses in the my schedule.
 *
*/
function HeaderInfoArea () {
  const theme = useTheme()
  const [scheduleState, _] = useSchedule()
  const { scheduledCourses, semester, location } = scheduleState
  const filteredScheduledCourses = scheduledCourses.filter((c) => c.preview === false)

  // Font and icon size media query
  const sizes = (theme) => ({
    text: {
      fontSize: theme.typography.title,
      [theme.breakpoints.down('xl')]: {
        fontSize: theme.typography.subheading
      }
    },
    icon: {
      height: '35px',
      width: '35px',
      [theme.breakpoints.down('xl')]: {
        height: '25px',
        width: '25px'
      }
    }

  })

  return (
    <Stack direction='row' width='100%' spacing={2}>
      <HeaderBox show text>
        <LocationOnIcon />
        <Typography sx={sizes(theme).text}>
          {/* Location + Semester */}
          {capitalFirstLetter(location)}, {capitalFirstLetter(semester)}
        </Typography>
      </HeaderBox>

      <HeaderBox show text>
        <Typography sx={sizes(theme).text}>
          {filteredScheduledCourses.reduce((total, obj) => Number(obj.creditsDecimal) + total, 0)} / 30 CREDITS
        </Typography>
      </HeaderBox>

      <HeaderBox show>
        <PrerequisitePopoverList
          courses={scheduledCourses}
          type='warning'
        />
        &nbsp;
        <div>
          {filteredScheduledCourses.reduce((total, obj) => obj.period?.toLowerCase().includes('first cycle') ? total + 1 : total, 0)}
        </div>
      </HeaderBox>

      <HeaderBox show>
        <PrerequisitePopoverList
          courses={scheduledCourses}
          type='error'
        />
        &nbsp;
        <div>
          {filteredScheduledCourses.reduce((total, obj) => obj.period.toLowerCase().includes('second cycle') ? total + 1 : total, 0)}
        </div>
      </HeaderBox>
    </Stack>
  )
}

export default HeaderInfoArea
