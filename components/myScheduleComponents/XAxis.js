import styles from '../../styles/Schedule.module.css'
import { Stack } from '@mui/material'
import { useSchedule } from '../../utils/hooks'

/**
 * @description Component of the x-axis showing the months. It dynamically checks which months to display
 * dependent on the period name of the scheduled courses.
 *
 * @param {string} axisTitle - The title of the axis.
 *
*/
function XAxis ({ axisTitle }) {
  const [scheduleState] = useSchedule()
  const scheduledCourses = scheduleState.scheduledCourses

  const autumnSemesterMonths = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan']
  const springSemesterMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  const hasScheduledCourse = scheduledCourses.length > 0
  const periodName = scheduleState.semester
  const isAutumn = periodName?.toLowerCase().includes('autumn')
  const months = isAutumn ? autumnSemesterMonths : springSemesterMonths

  return (
    <Stack direction='column'>
      <Stack
        direction='row'
        sx={{
          pl: isAutumn ? '0.5rem' : 0,
          pr: isAutumn ? '1.5rem' : 0
        }}
        justifyContent='space-between'
      >
        {months.map((month, i) =>
          <p
            key={month}
            className={classNameOfAxisValue(isAutumn, i, springSemesterMonths, autumnSemesterMonths)}
          >
            {month}
          </p>)}

      </Stack>
      <p className={styles.centerText}>
        {axisTitle}
      </p>
    </Stack>
  )
}

/**
 * @description Pure function that returns the correct classname of the month.
 * The first and last month has differing styles dependent on chosen period.
 *
 * @param {boolean} isAutumn - Boolean value, true if the chosen period is autumn, otherwise false.
 * @param {int} i - index value of the month.
 * @param springSemesterMonths - A list of the spring semester months.
 * @param autumnSemesterMonths - A list of the autumn semester months.
 *
*/
function classNameOfAxisValue (isAutumn, i, springSemesterMonths, autumnSemesterMonths) {
  const indexOfLastSpringMonth = springSemesterMonths.length - 1
  const indexOfLastAutumnMonth = autumnSemesterMonths.length - 1
  let markerClassName = styles.xAxisValue
  if (isAutumn) {
    if (i === indexOfLastAutumnMonth) {
      markerClassName = styles.autumnLast
    }
  } else {
    if (i === 0) {
      markerClassName = styles.springFirst
    } else if (i === indexOfLastSpringMonth) {
      markerClassName = styles.SpringLast
    }
  }
  return markerClassName
}

export default XAxis
