import React from 'react'
import ScheduledCourse from '../../components/myScheduleComponents/ScheduledCourse'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material/styles'
import { AppProvider } from '../../components/contexts/AppContext'

jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn()
    })
}))


const course = {
    period: 'First cycle',
    prerequisites: 'Some prerequisites',
    occurenceName: '2023-08-28 to 2023-10-30',
    campus: 'Uppsala'
}

const coords = {
    yStart: 1,
    xStart: 1,
    yEnd: 125,
    xEnd: 100,
    height: 50
}

describe('Warnings in CourseCardSchedule component', () => {
    test('renders a PrerequisitePopover with a warning type when the course period includes "First Cycle"', async () => {
      const iconName = 'WarningAmberIcon'
      render(
      <ThemeProvider theme={theme}>
        <AppProvider courses={[]}>
          <ScheduledCourse 
            course={course}
            coords={coords}
          />
        </AppProvider>
      </ThemeProvider>
      )
      expect(screen.getByTestId(iconName)).toBeInTheDocument()
      userEvent.hover(screen.getByTestId(iconName))
        await waitFor(() => expect(screen.getByText('First Cycle Entry Requirements')).toBeInTheDocument())
    })

    test('renders a PrerequisitePopover with an error type when the course period includes "Second Cycle"', async () => {
        course.period = 'Second cycle'
        const iconName = 'ErrorIcon'
        render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ScheduledCourse 
              course={course}
              coords={coords}
            />
          </AppProvider>
        </ThemeProvider>
        )
        expect(screen.getByTestId(iconName)).toBeInTheDocument()
        userEvent.hover(screen.getByTestId(iconName))
        await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
    })

    test('renders a PrerequisitePopover with a remote type when the course is remote', async () => {
        course.campus = 'Flexible'
        const iconName = 'FmdBadIcon'
        render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ScheduledCourse 
              course={course}
              coords={coords}
            />
          </AppProvider>
        </ThemeProvider>
        )
        expect(screen.getByTestId(iconName)).toBeInTheDocument()
        userEvent.hover(screen.getByTestId(iconName))
        await waitFor(() => expect(screen.getByText('Remote Course')).toBeInTheDocument())
    })

    test('renders two PrerequisitePopover with remote and error type when the course is remote and has second cycle prereq.', async () => {
        course.campus = 'Flexible'
        course.period = 'Second cycle'
        let iconName = 'FmdBadIcon'
        render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ScheduledCourse 
              course={course}
              coords={coords}
            />
          </AppProvider>
        </ThemeProvider>
        )
        expect(screen.getByTestId(iconName)).toBeInTheDocument()
        userEvent.hover(screen.getByTestId(iconName))
        await waitFor(() => expect(screen.getByText('Remote Course')).toBeInTheDocument())
        userEvent.unhover(screen.getByTestId(iconName))

        iconName = 'ErrorIcon'
        expect(screen.getByTestId(iconName)).toBeInTheDocument()
        userEvent.hover(screen.getByTestId(iconName))
        await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
        userEvent.unhover(screen.getByTestId(iconName))
    })

    test('renders a PrerequisitePopover with info type when the period is G and campus is not Flexible', async () => {
        course.period = 'G'
        course.campus = 'Uppsala'
        const iconName = 'CheckCircleIcon'
        render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ScheduledCourse 
              course={course}
              coords={coords}
            />
          </AppProvider>
        </ThemeProvider>
        )
        expect(screen.queryByTestId('CheckCircleIcon')).toBeNull()
        expect(screen.queryByTestId('FmdBad')).toBeNull()
        expect(screen.queryByTestId('WarningAmberIcon')).toBeNull()
        expect(screen.queryByTestId('ErrorIcon')).toBeNull()
    })
})