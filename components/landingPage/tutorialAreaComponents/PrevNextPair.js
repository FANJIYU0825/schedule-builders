import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button } from '@mui/material'

/**
 * @description Component that displays the Previous-Next pair of buttons in the tutorial area
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
 * @param {boolean} landingPage Boolean that says if the tutorial is rendered in the landing page or not
 * @param dispatch Reducer dispatch function
*/

function PrevNextPair ({ dispatch, landingPage, positionindex }) {
  return (
    <>
      <Button
        data-testid='prevnext-prev'
        variant='outlined'
        onClick={() => dispatch({ type: 'decrement' })}
        disabled={positionindex === 1 && !landingPage}
      >
        Previous
      </Button>
      <Button
        data-testid='prevnext-next'
        variant='contained'
        onClick={() => dispatch({ type: 'increment' })}
        endIcon={<ArrowForwardIcon />}
      >
        Next
      </Button>
    </>
  )
}

export default PrevNextPair
