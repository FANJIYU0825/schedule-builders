import { Stack, Button, useTheme } from '@mui/material'
import styles from '../../../styles/LandingPage.module.css'
import { forwardRef } from 'react'
import LaunchButton from '../LaunchButton'
import PrevNextPair from './PrevNextPair'
import PrevLaunchPair from './PrevLaunchPair'
import TutorialTextHeader from './TutorialTextHeader'

/**
 * @description Component that implements the tutorial area, (text and stepper). Is meant to be used as
 * a wrapper that encapsulates all functionality that is connected to the tutorial.
 * forwardRef call is needed to handle the transition animations.
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
 * @param {int} steps Amounts of steps in the tutorial
 * @param {boolean} landingPage Boolean that says if the tutorial is rendered in the landing page or not
 * @param dispatch Reducer dispatch function
 * @param setLoadingPage Function that sets the loading state of the landing page
*/

const TutorialTextArea = forwardRef((props, ref) => {
  const theme = useTheme()

  const cardMargin = () => ({
    marginTop: '35px',
    [theme.breakpoints.down('xl')]: {
      marginTop: '0px'
    }
  })

  return (
    <div className={styles.textArea} ref={ref} data-testid='tutorialTextArea'>
      <Stack justifyContent='center' alignItems='center'>
        <TutorialTextHeader
          positionindex={props.positionindex}
          steps={props.steps}
          dispatch={props.dispatch}
          landingPage={props.landingPage}
        />
        <Stack direction='row' gap={5} justifyContent='center' sx={cardMargin}>
          {props.positionindex === 0
            ? <>
              <LaunchButton setLoadingPage={props.setLoadingPage} location='tutorial' />
              <Button
                variant='outlined'
                sx={{ '&:hover': { backgroundColor: theme.palette.primary.main, color: '#FFFFFF' } }}
                onClick={() => props.dispatch({ type: 'increment' })}
              >
                Tutorial
              </Button>
              </>
            : props.positionindex === props.steps
              ? <PrevLaunchPair
                  dispatch={props.dispatch}
                  setDone={props.setDone}
                  landingPage={props.landingPage}
                  setLoadingPage={props.setLoadingPage}
                />
              : <PrevNextPair
                  positionindex={props.positionindex}
                  dispatch={props.dispatch}
                  landingPage={props.landingPage}
                />}
        </Stack>
      </Stack>
    </div>
  )
})

export default TutorialTextArea
