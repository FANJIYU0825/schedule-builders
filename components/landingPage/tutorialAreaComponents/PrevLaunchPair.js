import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LaunchButton from '../LaunchButton'

/**
 * @description Component that displays the Previous-Launch pair of buttons in the tutorial area
 *
 * @param {int} setDone State setter for when tutorial is completed
 * @param {boolean} landingPage Boolean that says if the tutorial is rendered in the landing page or not
 * @param dispatch Reducer dispatch function
 * @param setLoadingPage State setter for when page is loading
*/

function PrevLaunchPair ({ dispatch, setDone, landingPage, setLoadingPage }) {
  return (
    <>
      <Button
        data-testid='prevlaunch-prev'
        variant='outlined'
        onClick={() => dispatch({ type: 'decrement' })}
      >
        Previous
      </Button>
      {landingPage
        ? <LaunchButton setLoadingPage={setLoadingPage} location='tutorial' />
        : <Button
            variant='contained'
            onClick={() => setDone(true)}
          >
          <DeleteIcon />
        </Button>}
    </>
  )
}

export default PrevLaunchPair
