import React from 'react'
import ExportWarnings from '../../components/myScheduleComponents/ExportWarnings'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { theme } from "../../styles/theme"
import { ThemeProvider } from '@mui/material/styles'

jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn()
    })
  }))

const comboCourse = {
    code: '0',
    name: 'combo',
    period: 'Second cycle',
    campus: 'Flexible'
}

const remoteCourse = {
    code: '1',
    name: 'remote',
    period: 'First cycle',
    campus: 'Flexible'
}

const noneCourse = {
    code: '2',
    name: 'none',
    period: 'First cycle',
    campus: 'Uppsala'
}

const entryReqCourse = {
    code: '3',
    name: 'entryReq',
    period: 'Second cycle',
    campus: 'Uppsala'
}

const entryReqCourse2 = {
    code: '4',
    name: 'entryReq',
    period: 'Second cycle',
    campus: 'Uppsala'
}

describe('ExportWarnings component', () => {
    test('renders icon for second cycle entry requirements', () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[entryReqCourse]} />
            </ThemeProvider>
        )
        expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
    })

    test('renders icon for remote courses', () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[remoteCourse]} />
            </ThemeProvider>
        )
        expect(screen.getByTestId('FmdBadIcon')).toBeInTheDocument()
    })

    test('renders correct popover for second cycle entry req. courses', async () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[entryReqCourse]} />
            </ThemeProvider>
        )
        userEvent.hover(screen.getByTestId('ErrorIcon'))
        await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(entryReqCourse.name)).toBeInTheDocument())
    })

    test('renders correct popover for remote courses', async () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[remoteCourse]} />
            </ThemeProvider>
        )
        userEvent.hover(screen.getByTestId('FmdBadIcon'))
        await waitFor(() => expect(screen.getByText('Remote Course')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(remoteCourse.name)).toBeInTheDocument())
    })

    test('renders correct popover for remote courses with second cycle entry req.', async () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[comboCourse]} />
            </ThemeProvider>
        )
        userEvent.hover(screen.getByTestId('FmdBadIcon'))
        await waitFor(() => expect(screen.getByText('Remote Course')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(comboCourse.name)).toBeInTheDocument())
        userEvent.unhover(screen.getByTestId('FmdBadIcon'))

        userEvent.hover(screen.getByTestId('ErrorIcon'))
        await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(comboCourse.name)).toBeInTheDocument())
    })

    test('renders correct popover for multiple courses', async () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[remoteCourse, entryReqCourse, entryReqCourse2]} />
            </ThemeProvider>
        )

        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()

        userEvent.hover(screen.getByTestId('FmdBadIcon'))
        await waitFor(() => expect(screen.getByText('Remote Course')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(remoteCourse.name)).toBeInTheDocument())
        userEvent.unhover(screen.getByTestId('FmdBadIcon'))
        
        userEvent.hover(screen.getByTestId('ErrorIcon'))
        await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
        await waitFor(() => expect(screen.getAllByText(entryReqCourse.name)))
    })

    test('renders correct popover for courses with no warnings', async () => {
        render(
            <ThemeProvider theme={theme}>
              <ExportWarnings scheduledCourses={[noneCourse]} />
            </ThemeProvider>
        )
        expect(screen.queryByTestId('FmdBadIcon')).toBeNull()
        expect(screen.queryByTestId('ErrorIcon')).toBeNull()
    })
})