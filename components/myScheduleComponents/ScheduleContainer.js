import styles from '../../styles/Schedule.module.css'
import YAxis from './YAxis'
import XAxis from './XAxis'
import { Stack, Box } from '@mui/material'
import YAxisMarker from './YAxisMarker'
import { useSchedule } from '../../utils/hooks'
import ScheduledCourse from './ScheduledCourse'
import { useTheme } from '@emotion/react'
import EmptyScheduleSlot from './EmptyScheduleSlot'

/**
 * @description Component that holds the area of where the schedule courses appear, together with the y- and x-axis.
*/
function ScheduleContainer () {
  const [scheduleState] = useSchedule()
  const theme = useTheme()

  const SeparatorLine = ({ y }) => {
    return (
      <div
        style={{
          borderTop: `2px solid ${theme.palette.primary.uuRed}`,
          position: 'absolute',
          bottom: 0,
          height: y + '%',
          width: '100%'
        }}
      />
    )
  }

  return (
    <Stack
      className={styles.scheduleContainer}
      id='scheduleGraphic'
      // TODO: replace with ref?
      // id used for referencing this DOM node in the PDF export
      style={{ paddingLeft: '5%', paddingTop: '1%' }}
      // padding used to make space for y axis labels
    >
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.light,
          padding: 0.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        <YAxis axisTitle='Study Pace' />
        <Box sx={{
          position: 'relative',
          height: 100 * 100 / 125 + '%'
        }}
        >
          <YAxisMarker value={125} />
          <YAxisMarker value={100} />
          <SeparatorLine y={100} />
          {scheduleState.scheduledCourses?.map((course, idx) =>
            <ScheduledCourse
              key={'scheduledCourse' + idx}
              course={course}
              coords={scheduleState.coords ? scheduleState.coords[course.code] : null}
            />
          )}
          {scheduleState.emptyRectangles?.map((rect, idx) =>
            <EmptyScheduleSlot
              key={'emptyScheduleSlot' + idx}
              coords={rect}
            />
          )}
        </Box>
      </Box>
      <XAxis />
    </Stack>
  )
}

export default ScheduleContainer
