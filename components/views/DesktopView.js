import CourseExplorer from '../courseExplorerComponents/CourseExplorer'
import MySchedule from '../myScheduleComponents/MySchedule'
import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { useStepper, useUserActions, useSchedule, useCourses } from '../../utils/hooks'
import CookieConsent from '../misc/CookieConsent'
import { Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * @description Component containing the application content for larger screens such as desktops and laptops.
 * @param handleOpenSemesterModal - Function that runs when the SemesterModal is opened.
 * @param semester - The current semester state set.
 * @param location - The current location state set.
 * @param {boolean} fetchError - State variable for wether the fetch request was successful or not.
*/
function DesktopView ({ handleOpenSemesterModal, semester, location, fetchError }) {
  const [, dispatchUserActions] = useUserActions()
  const [{ savedCourses }] = useCourses()
  const [stepperState, dispatchStepper] = useStepper()
  const [{ scheduledCourses }] = useSchedule()
  const theme = useTheme()

  // TODO: move to context
  // Effect that updates the local storage values for savedCourses as the state changes
  useEffect(() => {
    const currentSavedCourses = window.localStorage.getItem('savedCourses') || '{}'
    const newSavedCourses = { ...JSON.parse(currentSavedCourses), [`${semester}-${location}`]: savedCourses }
    window.localStorage.setItem('savedCourses', JSON.stringify(newSavedCourses))
  }, [savedCourses])

  // TODO: move to context
  // Effect that updates the local storage values for scheduledCourses as the state changes
  useEffect(() => {
    const currentScheduledCourses = window.localStorage.getItem('scheduledCourses') || '{}'
    const newScheduledCourses = { ...JSON.parse(currentScheduledCourses), [`${semester}-${location}`]: scheduledCourses }
    window.localStorage.setItem('scheduledCourses', JSON.stringify(newScheduledCourses))
  }, [scheduledCourses])

  // This effect handles the updating of the tutorial stepper
  useEffect(() => {
    if (savedCourses.length > 0) {
      dispatchUserActions({ type: 'courseSaved' })
      if (stepperState.index < 2) {
        dispatchStepper({ type: 'set', payload: 2 })
      }
    }
  }, [savedCourses])

  return (
    <>
      <CssBaseline />
      <Stack minWidth='100vw' direction='row' spacing={2} backgroundColor={theme.palette.primary.mainBrighter}>
        <CourseExplorer
          handleOpenSemesterModal={handleOpenSemesterModal}
          fetchError={fetchError}
        />
        <MySchedule />
      </Stack>
      <CookieConsent />
    </>
  )
}

export default DesktopView
