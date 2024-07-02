import { render } from '@testing-library/react'
import TutorialTextArea from '../../components/landingPage/tutorialAreaComponents/TutorialTextArea'
import { ThemeProvider } from '@mui/material/styles'
import { landingTheme } from '../../styles/landingTheme'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('../../utils/hooks', () => ({
    useUserActions: jest.fn(() => [])
  }))

describe('Tutorial Text Area', () => {
  test('Renders correctly', () => {
    const dispatch = jest.fn()
    const setLoadingPage = jest.fn()
    const setDone = jest.fn()
    const { getByTestId } = render(
      <ThemeProvider theme={landingTheme}>
        <TutorialTextArea
          positionindex={0}
          dispatch={dispatch}
          setLoadingPage={setLoadingPage}
          steps={5}
          landingPage
          setDone={setDone}
        />
      </ThemeProvider>
    )
    const textArea = getByTestId('tutorialTextArea')
    expect(textArea).toBeInTheDocument()
  })

  test('Renders correct pair of buttons when tutorial is at index 3', () => {
    const dispatch = jest.fn()
    const setLoadingPage = jest.fn()
    const setDone = jest.fn()
    const { getByTestId } = render(
        <ThemeProvider theme={landingTheme}>
          <TutorialTextArea
            positionindex={3}
            dispatch={dispatch}
            setLoadingPage={setLoadingPage}
            steps={5}
            landingPage
            setDone={setDone}
          />
        </ThemeProvider>
      )
      const next = getByTestId('prevnext-next')
      const prev = getByTestId('prevnext-prev')
      expect(next).toBeInTheDocument()
      expect(prev).toBeInTheDocument()
  })
  test('Renders correct pair of buttons when tutorial is at index == steps', () => {
    const dispatch = jest.fn()
    const setLoadingPage = jest.fn()
    const setDone = jest.fn()
    const { getByTestId, getByText } = render(
        <ThemeProvider theme={landingTheme}>
          <TutorialTextArea
            positionindex={5}
            dispatch={dispatch}
            setLoadingPage={setLoadingPage}
            steps={5}
            landingPage
            setDone={setDone}
          />
        </ThemeProvider>
      )
      const launch = getByText('Launch App')
      const prev = getByTestId('prevlaunch-prev')
      expect(launch).toBeInTheDocument()
      expect(prev).toBeInTheDocument()
  })
})
