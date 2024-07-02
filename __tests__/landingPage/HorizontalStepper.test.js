import { render, screen, fireEvent } from '@testing-library/react'
import HorizontalStepper from '../../components/landingPage/HorizontalStepper'

jest.mock('../../utils/hooks', () => ({
  useUserActions: jest.fn(() => [])
}))

describe('HorizontalStepper tests', () => {
  test('renders the stepper with the correct number of steps', () => {
    render(<HorizontalStepper positionindex={2} dispatch={jest.fn()} steps={5} landingPage />)
    const stepper = screen.getByTestId('tutorial-stepper')
    expect(stepper).toBeInTheDocument()
  })
  test('Dispatch action when clicking steps', () => {
    const dispatch = jest.fn()
    render(
      <HorizontalStepper
        positionindex={2}
        dispatch={dispatch}
        steps={5}
        landingPage
      />
    )
    for (let i = 1; i < 5; i++) {
      fireEvent.click(screen.getByTestId(`step-label-${i}`))
      expect(dispatch).toHaveBeenCalledWith({ type: 'set', payload: i })
    }
  })
  test('clicking on a step label does not call dispatch function when not used in landing page', () => {
    const dispatch = jest.fn()
    render(
      <HorizontalStepper
        positionindex={2}
        dispatch={dispatch}
        steps={5}
        landingPage={false}
      />
    )
    for (let i = 1; i < 5; i++) {
      fireEvent.click(screen.getByTestId(`step-label-${i}`))
      expect(dispatch).not.toHaveBeenCalled()
    }
  })
})
