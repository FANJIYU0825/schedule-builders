import { render, fireEvent } from '@testing-library/react'
import CookieConsent from '../../components/misc/CookieConsent'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material/styles'
import { posthog } from 'posthog-js'

describe('CookieConsent component', () => {
  beforeEach(() => {
    // Mock the localStorage and posthog functions used in the component
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    posthog.opt_in_capturing = jest.fn();
    posthog.opt_out_capturing = jest.fn();
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders the cookie consent modal', () => {
    window.localStorage.getItem.mockReturnValue(null)
    const { getByText } = render(<ThemeProvider theme={theme}><CookieConsent /></ThemeProvider>)
    const acceptButton = getByText('Accept')
    const declineButton = getByText('Decline')
    expect(acceptButton).toBeInTheDocument()
    expect(declineButton).toBeInTheDocument()
  })

  test('opens the modal when there is no cookie consent saved in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(null)
    const { getByText } = render(<ThemeProvider theme={theme}><CookieConsent /></ThemeProvider>)
    const modalTitle = getByText('WE USE COOKIES')
    expect(modalTitle).toBeInTheDocument()
  })

  test('does not open the modal when there is a cookie consent saved in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(true)
    const { queryByText } = render(<ThemeProvider theme={theme}><CookieConsent /></ThemeProvider>)
    const modalTitle = queryByText('WE USE COOKIES')
    expect(modalTitle).not.toBeInTheDocument()
  })

  test('clicking Accept button calls posthog.opt_in_capturing and saves cookie consent in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(null)
    const { getByText } = render(<ThemeProvider theme={theme}><CookieConsent /></ThemeProvider>)
    const acceptButton = getByText('Accept')
    fireEvent.click(acceptButton)
    expect(posthog.opt_in_capturing).toHaveBeenCalled()
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cookieConsent', true)
  })

  test('clicking Decline button calls posthog.opt_out_capturing and saves cookie consent in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(null)
    const { getByText } = render(<ThemeProvider theme={theme}><CookieConsent /></ThemeProvider>)
    const declineButton = getByText('Decline')
    fireEvent.click(declineButton)
    expect(posthog.opt_out_capturing).toHaveBeenCalled()
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cookieConsent', false)
  })
})
