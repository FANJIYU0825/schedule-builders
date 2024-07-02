import { render, fireEvent } from '@testing-library/react'
import PrevLaunchPair from '../../components/landingPage/tutorialAreaComponents/PrevLaunchPair'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('Prev Launch Button pair', () => {
    test('Pair renders correctly', () => {
        const dispatch = jest.fn()
        const { getByTestId, getByText } = render(
        <PrevLaunchPair 
            dispatch={dispatch} 
            landingPage={true}
            positionindex={3}/>
        )
        const launch = getByText('Launch App')
        const prev = getByTestId('prevlaunch-prev')
        expect(launch).toBeInTheDocument()
        expect(prev).toBeInTheDocument()
    })
    test('Correct dispatch action fires for clicking prev', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
        <PrevLaunchPair  
            dispatch={dispatch} 
            landingPage={true}
            positionindex={3}/>
        )
        const prev = getByTestId('prevlaunch-prev')
        fireEvent.click(prev)
        expect(dispatch).toHaveBeenCalledWith({type: 'decrement'})
    })
})