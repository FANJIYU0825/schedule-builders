/**
 * The idea of this file is to keep custom built hooks to use in the react application.
 */

import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../components/contexts/FilterContext'
import { CourseContext } from '../components/contexts/CourseContext'
import { UserActionContext } from '../components/contexts/UserActionContext'
import { TutorialStepperContext } from '../components/contexts/TutorialStepperContext'
import { ScheduleContext } from '../components/contexts/ScheduleContext'
import { ErrorContext } from '../components/contexts/ErrorContext'

/*
   * @description Custom hook that gets the current client window size
   *
   * @example
   * // usage
   * const windowSize = useWindowSize()
   * <div> {windowSize.width}px / {windowSize.height}px </div>
   * @returns Object containing the 'width' and 'height' of the client browser window
*/

export function useWindowSize () {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize () {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowSize
}

export function useError () {
  return useContext(ErrorContext)
}

export function useCourses () {
  return useContext(CourseContext)
}

export function useSchedule () {
  return useContext(ScheduleContext)
}

export function useFilters () {
  return useContext(FilterContext)
}

export function useUserActions () {
  return useContext(UserActionContext)
}

/**
 * @description Custom hook that lets you use the tutorial stepper in multiple places without redefining the reducer
 * associated with it.
 * @returns [state, dispatch]
 * state - The state of the stepper. dispatch - the associated dispatch function.
 * @note The dispatch function include operations, "increment", "decrement", "reset", "set".
*/

export function useStepper () {
  return useContext(TutorialStepperContext)
}

export function useLocalStorage (semester, location) {
  const isClient = typeof window === 'object'

  if (!isClient) {
    return [[], []]
  }

  const prevSavedCourses = JSON.parse(window.localStorage.getItem('savedCourses')) || {}
  const prevScheduledCourses = JSON.parse(window.localStorage.getItem('scheduledCourses')) || {}
  const savedCourses = prevSavedCourses[`${semester}-${location}`] || []
  const scheduledCourses = prevScheduledCourses[`${semester}-${location}`] || []
  return [savedCourses, scheduledCourses]
}
