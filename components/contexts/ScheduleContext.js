import { createContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../../utils/hooks'
import { updateCoords } from '../../utils/utility'
import { fillGridArea, initializeGrid, findEmptyRectangles } from '../../utils/grid'
import posthog from 'posthog-js'

export const ScheduleContext = createContext()

const addCard = (scheduleState, course, isPreview) => {
  const scheduledCourses = scheduleState.scheduledCourses
  const updatedCoords = updateCoords([...scheduledCourses, course], scheduleState.semester)
  if (Object.values(updatedCoords).some((coord) => coord.yEnd > 125)) {
    posthog.capture('Exceeded 125% study pace')
    return scheduleState
  }

  return {
    ...scheduleState,
    coords: updatedCoords,
    scheduledCourses: [...scheduledCourses, { ...course, preview: isPreview }],
    occupiedGrid: fillGridArea(scheduleState.occupiedGrid, updatedCoords[course.code], true)
  }
}

const removeCard = (scheduleState, course) => {
  const scheduledCourses = scheduleState.scheduledCourses.filter(c => c.code !== course.code)
  const updatedCoords = updateCoords(scheduledCourses, scheduleState.semester)
  return {
    ...scheduleState,
    coords: updatedCoords,
    scheduledCourses,
    occupiedGrid: fillGridArea(scheduleState.occupiedGrid, scheduleState.coords[course.code], false)
  }
}

const setScheduledCourses = (scheduleState, courses) => {
  return {
    ...scheduleState,
    coords: updateCoords(courses, scheduleState.semester),
    scheduledCourses: courses
    // TODO: update grid?
  }
}

const setSemester = (scheduleState, semester) => {
  return {
    ...scheduleState,
    semester
  }
}

const setLocation = (scheduleState, location) => {
  return {
    ...scheduleState,
    location
  }
}

const updateGrid = (scheduleState) => {
  let grid = initializeGrid(125, 100, false)

  if (scheduleState.scheduledCourses.length !== 0) {
    scheduleState.scheduledCourses.forEach(course => {
      grid = fillGridArea(grid, scheduleState.coords[course.code], true)
    })
  }

  return {
    ...scheduleState,
    occupiedGrid: grid
  }
}

function reducer (state, action) {
  switch (action.type) {
    case 'addCard':
      return addCard(state, action.payload, false)
    case 'addPreviewCard':
      return addCard(state, action.payload, true)
    case 'clearPreviewCard':
      return setScheduledCourses(state, state.scheduledCourses.filter(c => !c.preview))
    case 'setScheduledCourses':
      return setScheduledCourses(state, action.payload)
    case 'setSemester':
      return setSemester(state, action.payload)
    case 'setLocation':
      return setLocation(state, action.payload)
    case 'removeCard':
      return removeCard(state, action.payload)
    case 'updateGrid':
      return updateGrid(state)
    case 'updateEmptyRectangles':
      return { ...state, emptyRectangles: findEmptyRectangles(state.occupiedGrid) }
  }
}

export function ScheduleProvider ({ children, semester, location }) {
  const [, localStorageScheduledCourses] = useLocalStorage(semester, location)

  const [scheduleState, dispatch] = useReducer(reducer, {
    semester,
    location,
    scheduledCourses: localStorageScheduledCourses !== null ? localStorageScheduledCourses : [],
    coords: updateCoords(localStorageScheduledCourses !== null ? localStorageScheduledCourses : [], semester),
    occupiedGrid: initializeGrid(125, 100, false),
    emptyRectangles: []
  })

  useEffect(() => {
    dispatch({ type: 'updateGrid' })
    dispatch({ type: 'updateEmptyRectangles' })
  }, [scheduleState.scheduledCourses])

  useEffect(() => {
    dispatch({ type: 'setLocation', payload: location })
    dispatch({ type: 'setSemester', payload: semester })
    dispatch({ type: 'setScheduledCourses', payload: localStorageScheduledCourses !== null ? localStorageScheduledCourses : [] })
  }, [semester, location])

  return (
    <ScheduleContext.Provider value={[scheduleState, dispatch]}>
      {children}
    </ScheduleContext.Provider>
  )
}
