import { render, screen } from '@testing-library/react'
import CourseCard from '../../components/cardComponents/CourseCard'
import { useLocalStorage, useSchedule, useWindowSize, useFilters } from '../../utils/hooks'
import { AppProvider } from '../../components/contexts/AppContext'

jest.mock('../../utils/hooks')

useSchedule.mockReturnValue([{}, null])
useLocalStorage.mockReturnValue([[], []])
useFilters.mockReturnValue([[], null])
useWindowSize.mockReturnValue({width: 1500, height: 900})

const mockCourse = {
    "name": "Animal Structure and Function",
    "campus": "Uppsala",
    "internationInstitution": "Biology Education Centre",
    "language": "English",
    "academicPeriodName": "Autumn semester 2021/22",
    "code": "1BG203",
    "occurenceName": "2021-10-28 to 2022-01-16",
    "durationAcademicPeriods": "",
    "period": "First cycle - continuing course",
    "teacher": "On campus",
    "creditsDecimal": 15,
    "creditsECTSDecimal": 100,
    "description": "80 credits in biology equivalent to the basic course in biology within the Bachelor's Programme in Biology/Molecular Biology.",
    "remarks": 17505,
}

const mockCourseNoDesc = {
    "name": "Animal Structure and Function",
    "campus": "Uppsala",
    "internationInstitution": "Biology Education Centre",
    "language": "English",
    "academicPeriodName": "Autumn semester 2021/22",
    "code": "1BG203",
    "occurenceName": "2021-10-28 to 2022-01-16",
    "durationAcademicPeriods": "",
    "period": "First cycle - continuing course",
    "teacher": "On campus",
    "creditsDecimal": 15,
    "creditsECTSDecimal": 100,
    "remarks": 17505,
}   

describe("CourseCard", () => {
    test("Course card renders correctly", () => {
        render(
            <AppProvider>
                <CourseCard 
                    course={mockCourse} 
                    conversionState={false} 
                    actions={{
                        addSchedule: jest.fn(),
                        removeSchedule: jest.fn(),
                        removeInventory: jest.fn(),
                        addInventory: jest.fn()
                      }}
                    panel="explorer" 
                />
            </AppProvider>
        )
        expect(screen.getByText('Animal Structure and Function (1BG203)')).toBeInTheDocument()
    })
})

describe("CourseCard", () => {
    test("Card renders correctly when there is no description", () => {
        render(
            <AppProvider>
                <CourseCard 
                    course={mockCourseNoDesc} 
                    conversionState={true} 
                    actions={{
                        addSchedule: jest.fn(),
                        removeSchedule: jest.fn(),
                        removeInventory: jest.fn(),
                        addInventory: jest.fn()
                      }}
                    panel="explorer" 
                />
            </AppProvider>
        )
        expect(screen.getByText('Animal Structure and Function (1BG203)')).toBeInTheDocument()
        expect(screen.getByText('No description available for this course')).toBeInTheDocument()
    })
})

describe("CourseCard", () => {
    test("Schedule preview is rendered correctly", () => {
        render(
            <AppProvider>
                <CourseCard 
                    course={mockCourseNoDesc} 
                    conversionState={true} 
                    actions={{
                        addSchedule: jest.fn(),
                        removeSchedule: jest.fn(),
                        removeInventory: jest.fn(),
                        addInventory: jest.fn()
                      }}
                    panel="explorer" 
                />
            </AppProvider>
        )
        expect(screen.getByTestId('schedule-preview')).toBeInTheDocument()
    })
})