import { render } from '@testing-library/react'
import TutorialTextHeader from '../../components/landingPage/tutorialAreaComponents/TutorialTextHeader'
import { landingTheme } from '../../styles/landingTheme'
import { ThemeProvider } from '@mui/material/styles'

jest.mock('../../utils/hooks', () => ({
    useUserActions: jest.fn(() => [])
  }))

describe('TutorialTextHeader', () => {
    test('Tutorial text header render', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
            <ThemeProvider theme={landingTheme} >
                <TutorialTextHeader 
                    positionindex={3} 
                    landingPage={true} 
                    dispatch={dispatch} 
                    steps={5}
                />
            </ThemeProvider>
        )
        const title = getByTestId('tutorialTextHeaderTitle')
        expect(title).toBeInTheDocument()
    })
    test('Tutorial titles', () => {
        const dispatch = jest.fn()
        const { getByText } = render(
            <ThemeProvider theme={landingTheme} >
                <TutorialTextHeader 
                    positionindex={3} 
                    landingPage={true} 
                    dispatch={dispatch} 
                    steps={5}
                />
            </ThemeProvider>
        )
        // The title with index 3
        const title = getByText('BUILD YOUR SCHEDULE')
        expect(title).toBeInTheDocument()
    })
    test('Stepper present when index > 0', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
            <ThemeProvider theme={landingTheme} >
                <TutorialTextHeader 
                    positionindex={3} 
                    landingPage={true} 
                    dispatch={dispatch} 
                    steps={5}
                />
            </ThemeProvider>
        )
        const stepper = getByTestId('tutorial-stepper')
        expect(stepper).toBeInTheDocument()
    })
    test('Stepper not present when index === 0', () => {
        const dispatch = jest.fn()
        const { queryByTestId } = render(
            <ThemeProvider theme={landingTheme} >
                <TutorialTextHeader 
                    positionindex={0} 
                    landingPage={true} 
                    dispatch={dispatch} 
                    steps={5}
                />
            </ThemeProvider>
        )
        const stepper = queryByTestId('tutorial-stepper')
        expect(stepper).not.toBeInTheDocument()
    })
})
