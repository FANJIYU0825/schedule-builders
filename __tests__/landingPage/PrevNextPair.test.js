import { render, fireEvent } from '@testing-library/react'
import PrevNextPair from '../../components/landingPage/tutorialAreaComponents/PrevNextPair'

describe('Prev Next Button pair', () => {
    test('Pair renders correctly', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
        <PrevNextPair 
            dispatch={dispatch} 
            landingPage={true}
            positionindex={3}/>
        )
        const next = getByTestId('prevnext-next')
        const prev = getByTestId('prevnext-prev')
        expect(next).toBeInTheDocument()
        expect(prev).toBeInTheDocument()
    })
    test('Correct dispatch action fires for clicking next', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
        <PrevNextPair 
            dispatch={dispatch} 
            landingPage={true}
            positionindex={3}/>
        )
        const next = getByTestId('prevnext-next')
        fireEvent.click(next)
        expect(dispatch).toHaveBeenCalledWith({type: 'increment'})
    })
    test('Correct dispatch action fires for clicking prev', () => {
        const dispatch = jest.fn()
        const { getByTestId } = render(
        <PrevNextPair 
            dispatch={dispatch} 
            landingPage={true}
            positionindex={3}/>
        )
        const prev = getByTestId('prevnext-prev')
        fireEvent.click(prev)
        expect(dispatch).toHaveBeenCalledWith({type: 'decrement'})
    })
})