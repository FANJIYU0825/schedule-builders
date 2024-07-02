import { createContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../../utils/hooks'

export const CourseContext = createContext()

function reducer (state, action) {
  switch (action.type) {
    case 'addCourse':
      return { ...state, savedCourses: [...state.savedCourses, action.payload] }
    case 'removeCourse':
      return { ...state, savedCourses: state.savedCourses.filter(course => !(course.code === action.payload.code && course.campus.toLowerCase() === action.payload.campus.toLowerCase())) }
    case 'setCourses':
      return { ...state, courses: action.payload }
    case 'setSavedCourses':
      return { ...state, savedCourses: action.payload }
    case 'setSemester':
      return { ...state, semester: action.payload }
    case 'setLocation':
      return { ...state, location: action.payload }
    default:
      return state
  }
}

export function CourseProvider ({ children, courses, semester, location }) {
  const [localStorageSavedCourses] = useLocalStorage(semester, location)

  const [courseState, dispatch] = useReducer(reducer, { courses, savedCourses: localStorageSavedCourses !== null ? localStorageSavedCourses : [] })

  useEffect(() => {
    dispatch({ type: 'setCourses', payload: courses })
  }, [courses])

  useEffect(() => {
    dispatch({ type: 'setLocation', payload: location })
    dispatch({ type: 'setSemester', payload: semester })
    dispatch({ type: 'setSavedCourses', payload: localStorageSavedCourses !== null ? localStorageSavedCourses : [] })
  }, [semester, location])

  return (
    <CourseContext.Provider value={[courseState, dispatch]}>
      {children}
    </CourseContext.Provider>
  )
}
