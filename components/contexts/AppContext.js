import { ErrorProvider } from './ErrorContext'
import { UserActionProvider } from './UserActionContext'
import { TutorialStepperProvider } from './TutorialStepperContext'
import { ScheduleProvider } from './ScheduleContext'
import { CourseProvider } from './CourseContext'
import { FilterProvider } from './FilterContext'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../styles/theme'

/**
 * @description - Wrapper context that contains all contexts used in the app.
 *
 * @param {children} - Components contained by the context
 * @param {courses} - List of courses to initialize with
 */

export function AppProvider ({ children, courses, semester, location }) {
  return (
    <ErrorProvider>
      <UserActionProvider>
        <TutorialStepperProvider>
          <ScheduleProvider semester={semester} location={location}>
            <CourseProvider semester={semester} location={location} courses={courses}>
              <ThemeProvider theme={theme}>
                <FilterProvider>
                  {children}
                </FilterProvider>
              </ThemeProvider>
            </CourseProvider>
          </ScheduleProvider>
        </TutorialStepperProvider>
      </UserActionProvider>
    </ErrorProvider>
  )
}
