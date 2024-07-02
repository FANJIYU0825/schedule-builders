import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ErrorModal from '../../components/misc/ErrorModal'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material/styles'
import { AppProvider } from '../../components/contexts/AppContext'
import { useError, useUserActions, useStepper, useLocalStorage, useSchedule } from '../../utils/hooks'

const mockErrorMessage = 'warning'

jest.mock('../../utils/hooks')
const mockDispatchUserActions = jest.fn()
const mockDispatchStepper = jest.fn()
const mockSetError = jest.fn()
useError.mockReturnValue([mockErrorMessage, mockSetError])
useUserActions.mockReturnValue([null, mockDispatchUserActions])
useStepper.mockReturnValue([{index: 0}, mockDispatchStepper])
useLocalStorage.mockReturnValue([null, null])
useSchedule.mockReturnValue([[], null])

describe('ErrorModal', () => {
  test('renders with the correct message', () => {
    render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ErrorModal />
          </AppProvider>
        </ThemeProvider> 
        )
    const messageElement = screen.getByText(mockErrorMessage)
    expect(messageElement).toBeInTheDocument()
  })

  test('closes and clears error message when "Close" button is clicked', async () => {
    render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ErrorModal />
          </AppProvider>
        </ThemeProvider>    
        )
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    expect(mockSetError).toHaveBeenCalledWith('')
    await waitFor(() => expect(screen.queryByText(mockErrorMessage)).toBeNull())
  })

  test('does not render when message is an empty string', () => {
    useError.mockReturnValue(['', mockSetError])
    render(
        <ThemeProvider theme={theme}>
          <AppProvider courses={[]}>
            <ErrorModal />
          </AppProvider>
        </ThemeProvider>    
        )
    const modalElement = screen.queryByRole('dialog')
    expect(modalElement).not.toBeInTheDocument()
  })
})
