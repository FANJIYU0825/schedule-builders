import { render, fireEvent } from '@testing-library/react'
import LaunchButton from '../../components/landingPage/LaunchButton'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('LaunchButton', () => {
  test('Renders correctly', () => {
    const setLoadingPage = jest.fn()
    const { getByText } = render(<LaunchButton setLoadingPage={setLoadingPage} location='nav' />)
    const button = getByText('Launch App')
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('marginRight: 50px;')
  })
  test('changes route on button click', () => {
    const setLoadingPage = jest.fn()
    const { getByText } = render(<LaunchButton setLoadingPage={setLoadingPage} location='nav' />)
    const button = getByText('Launch App')
    fireEvent.click(button)
    // Verify that setLoadingPage state is set to true
    expect(setLoadingPage).toHaveBeenCalledWith(true)
  })
})
