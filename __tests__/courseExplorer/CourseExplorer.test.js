import CourseScrollAreaExplorer from "../../components/courseExplorerComponents/CourseScrollAreaExplorer"
import { render, screen, fireEvent } from '@testing-library/react'
import { useCourses, useFilters, useUserActions, useStepper, useError, useLocalStorage, useSchedule, useWindowSize } from '../../utils/hooks'
import { AppProvider } from "../../components/contexts/AppContext"

jest.mock('../../utils/hooks')


const mockCourse = {
  "name": "Animal Structure and Function",
  "campus": "Uppsala",
  "internationInstitution": "Biology Education Centre",
  "code": "1BG203",
  "occurenceName": "2023-10-31 to 2024-01-14",
  "period": "First Cycle",
  "creditsDecimal": 15,
  "creditsECTSDecimal": 100,
  "prerequisites": "Completed courses worth 60 credits in biology including 1) The Evolution and Diversity of Organisms (15 credits) and Physiology (15 credits), or 2) Biology A: Patterns and Processes (22.5 credits), or Biology A: Patterns, Processes and Science Education (22.5 credits), and Physiology (15 credits).",
  "academicPeriodName": "Autumn Semester 2023/24"
}

const mockDispatchFilters = jest.fn()
const mockDispatchUserActions = jest.fn()
const mockDispatchStepper = jest.fn()
const mockSetError = jest.fn()
const mockDispatchCourses = jest.fn()
useCourses.mockReturnValue([{ courses: [mockCourse], savedCourses: [] }, mockDispatchCourses])
useWindowSize.mockReturnValue({width: 1500, height: 900})
useFilters.mockReturnValue([{ toggleSavedCourses: false }, mockDispatchFilters])
useUserActions.mockReturnValue([null, mockDispatchUserActions])
useStepper.mockReturnValue([{index: 0}, mockDispatchStepper])
useError.mockReturnValue(['', mockSetError])
useLocalStorage.mockReturnValue([null, null])
useSchedule.mockReturnValue([{ scheduledCourses: [] }, null])

describe('CourseExplorer', () => {
    test('can add a course to the inventory', () => {
      
      render(
        <AppProvider courses={[mockCourse]} semester='autumn' location='uppsala'>
            <CourseScrollAreaExplorer 
              toggleSavedCourses={false}
              filteredCourses={[mockCourse]} 
            />
        </AppProvider>
      )
  
      // Add course to inventory
      const addCourseButton = screen.getByText('Save')
      fireEvent.click(addCourseButton)
      
      expect(mockDispatchCourses).toHaveBeenCalledWith({ type: 'addCourse', payload: mockCourse })
      expect(screen.getByText(mockCourse.name + ' (' + mockCourse.code + ')')).toBeInTheDocument()
    })
  })