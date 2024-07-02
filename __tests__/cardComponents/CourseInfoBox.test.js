import React from 'react'
import CourseInfoBox from '../../components/cardComponents/CourseInfoBox'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material/styles'

jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn()
    })
}))
  
const course = {
  period: 'First cycle',
  prerequisites: 'Some prerequisites',
}

describe('CourseInfoBox alert component', () => {
  test('renders a PrerequisitePopover with a warning type when the course period includes "First Cycle"', async () => {
    const iconName = 'WarningAmberIcon'
    render(
      <ThemeProvider theme={theme}>
        <CourseInfoBox alert value={course} />
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
        <CourseInfoBox alert value={course} />
      </ThemeProvider>
    )
    expect(screen.getByTestId(iconName)).toBeInTheDocument()
    userEvent.hover(screen.getByTestId(iconName))
    await waitFor(() => expect(screen.getByText('Second Cycle Entry Requirements')).toBeInTheDocument())
  })

  test('renders a PrerequisitePopover with an info type when the course period includes "General entry requirements"', async () => {
    course.period = 'General entry requirements'
    const iconName = 'CheckCircleIcon'
    render(
      <ThemeProvider theme={theme}>
        <CourseInfoBox alert value={course} />
      </ThemeProvider>
    )
    expect(screen.getByTestId(iconName)).toBeInTheDocument()
    userEvent.hover(screen.getByTestId(iconName))
    await waitFor(() => expect(screen.getByText('General Entry Requirements')).toBeInTheDocument())
  })

  test('does not render any icon when the course period does not match any of the conditions', async () => {
    course.period = 'Third Cycle'
    render(
      <ThemeProvider theme={theme}>
        <CourseInfoBox alert value={course} />
      </ThemeProvider>
    )
    expect(screen.queryByTestId('CheckCircleIcon')).toBeNull()
    expect(screen.queryByTestId('WarningAmberIcon')).toBeNull()
    expect(screen.queryByTestId('ErrorIcon')).toBeNull()
  })
})