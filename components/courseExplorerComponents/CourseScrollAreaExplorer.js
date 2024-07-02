import styles from '../../styles/CourseScroll.module.css'
import { useState, useRef, useEffect } from 'react'
import { updateCoords } from '../../utils/utility'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CourseCard from '../cardComponents/CourseCard'
import NoResultsMessage from '../misc/NoResultsMessage'
import { useSchedule, useUserActions, useStepper, useError, useCourses } from '../../utils/hooks'

/**
 * @description Component that implements the scrolling area of the explorer panel/column.
 * It is meant to be used as a container for the items that the scroll area holds.
 * The component keeps a window of courses and then removes courses from the top when scrolling
 * to the bottom and vice versa. This is to optimize rendering by minimizing components to render.
 * @param toggleSavedCourses - State variable for wether the explorer is in saved courses mode or not.
 * @param filteredCourses - List of the filtered courses.
 * @param {boolean} fetchError - State variable for wether the fetch request was successful or not.
*/
function CourseScrollAreaExplorer ({ toggleSavedCourses, filteredCourses, fetchError }) {
  const limit = 10
  const bufferSize = limit * 2
  const [endIndex, setEndIndex] = useState(bufferSize)
  const [startIndex, setStartIndex] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [courseWindow, setCourseWindow] = useState(filteredCourses?.slice(0, bufferSize))
  const [, setError] = useError()
  const [scheduleState, dispatchSchedule] = useSchedule()
  const [{ savedCourses }, dispatchCourses] = useCourses()
  const [, dispatchUserActions] = useUserActions()
  const [stepperState, dispatchStepper] = useStepper()
  const ref = useRef(null)
  const fetchPreviousScrollOffset = 0.49
  const fetchNextScrollOffset = 0.43

  useEffect(() => {
    setCourseWindow(filteredCourses.slice(0, bufferSize))
    setStartIndex(0)
    setEndIndex(bufferSize)
  }, [filteredCourses])

  const handleScroll = (target) => {
    const scrollTop = Math.round(target.scrollTop)
    const clientHeight = Math.round(target.clientHeight)
    const scrollHeight = Math.round(target.scrollHeight)
    const scrollMargin = 0.99

    if (scrollTop === 0) {
      fetchPrevious(target)
    } else if (scrollTop + clientHeight >= scrollHeight * scrollMargin) {
      fetchNext(target)
    }
  }

  const fetchPrevious = (target) => {
    if (startIndex === 0) return
    setIsFetching(true)
    const newWindow = [...filteredCourses.slice(startIndex - limit, endIndex - limit)]
    setStartIndex(prev => prev - limit)
    setEndIndex(prev => prev - limit)
    setCourseWindow(newWindow)
    setIsFetching(false)
    ref.current.scrollTop = Math.round(target.scrollHeight) * fetchPreviousScrollOffset
  }

  const fetchNext = (target) => {
    if (endIndex >= filteredCourses.length - 1) return
    if (startIndex + limit + 1 > filteredCourses.length) {
      setIsFetching(true)
      const newWindow = [...filteredCourses.slice(startIndex, filteredCourses.length - 1)]
      setCourseWindow(newWindow)
      setEndIndex(filteredCourses.length + 1)
      setIsFetching(false)
    } else {
      setIsFetching(true)
      const newWindow = [...filteredCourses.slice(startIndex + limit, endIndex + limit)]
      setCourseWindow(newWindow)
      setStartIndex((prev) => prev + limit)
      setEndIndex((prev) => prev + limit)
      setIsFetching(false)
    }
    ref.current.scrollTop = Math.round(target.scrollTop) * fetchNextScrollOffset
  }

  const checkExplorerConversion = (course) => savedCourses.some((item) => item.code === course.code && item.campus.toLowerCase() === course.campus.toLowerCase())
  const checkInventoryConversion = (course) => scheduleState.scheduledCourses.some((item) => item.code === course.code && item.campus.toLowerCase() === course.campus.toLowerCase() && !item.preview)

  const handleUserActions = () => {
    dispatchUserActions({ type: 'courseScheduled' })
    if (stepperState.index < 3) {
      dispatchStepper({ type: 'set', payload: 3 })
    }
  }

  const handleErrors = (course) => {
    if (course.campus.toLowerCase() === 'flexible') {
      setError('Courses with flexible campus are only eligible for exchange students within the EU/EEA.')
    }
    const updatedCoords = updateCoords([...scheduleState.scheduledCourses, course], scheduleState.semester)
    if (Object.values(scheduleState.scheduledCourses).some((coord) => coord.preview)) return
    if (Object.values(updatedCoords).some((coord) => coord.yEnd > 125)) {
      console.log(updatedCoords)
      setError('You must not exceed 125% study pace.')
    }
  }

  const onHandleAddToSchedule = (course) => {
    // Add the card to the schedule state
    dispatchSchedule({ type: 'addCard', payload: course })
    // Handle any errors
    handleErrors(course)
    // Handle any user action state updates (stepper)
    handleUserActions()
  }

  const onHandleRemoveFromSchedule = (course) => {
    dispatchSchedule({ type: 'removeCard', payload: course })
    if (savedCourses.some((c) => c.code !== course.code)) {
      dispatchCourses({ type: 'addCourse', payload: course })
    }
  }

  const onHandleRemoveCardFromInventory = (course) => {
    dispatchCourses({ type: 'removeCourse', payload: course })
  }

  const onHandleAddCardToInventory = (course) => {
    dispatchCourses({ type: 'addCourse', payload: course })
  }

  return (
    <div
      className={styles.courseScrollArea}
      ref={ref}
      onScroll={(e) => handleScroll(e.target)}
    >
      <Grid container sx={{ width: '100%' }}>
        {!fetchError
          ? filteredCourses?.length
            ? (
                courseWindow?.map((course, index) => {
                  return (
                    <CourseCard
                      key={'courseCard' + index}
                      course={course}
                      actions={{
                        addSchedule: onHandleAddToSchedule,
                        removeSchedule: onHandleRemoveFromSchedule,
                        removeInventory: onHandleRemoveCardFromInventory,
                        addInventory: onHandleAddCardToInventory
                      }}
                      panel={toggleSavedCourses ? 'inventory' : 'explorer'}
                      conversionState={{ inventory: checkInventoryConversion(course), explorer: checkExplorerConversion(course) }}
                    />
                  )
                })
              )
            : <NoResultsMessage message='No courses found for the current selection.' />
          : <NoResultsMessage message='Something went wrong when fetching courses, please try again!' />}
        {isFetching && (
          <Box sx={{ width: '100%', color: 'red' }}>
            <LinearProgress color='inherit' />
          </Box>
        )}
      </Grid>
    </div>
  )
}

export default CourseScrollAreaExplorer
