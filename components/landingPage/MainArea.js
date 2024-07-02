import styles from '../../styles/LandingPage.module.css'
import TutorialTextArea from './tutorialAreaComponents/TutorialTextArea'
import PictureArea from './PictureArea'
import { Fade, Grid, Slide } from '@mui/material'

/**
 * @description Component that implements the main area of the landing page. It is responsible for the layout of the
 * picture and tutorial of the landing page. It holds the logic for the transition animations that are used when moving
 * from start page to tutorial.
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
 * @param dispatch Reducer dispatch function
 * @param setLoadingPage Function that sets the loading state of the landing page
*/

function MainArea ({ dispatch, positionindex, setLoadingPage }) {
  /* The amount of steps that the tutorial has. This value does not live in the tutorial component
     since it makes the tutorial component more dynamic.
  */
  const TUTORIAL_STEPS = 5

  return (
    <div className={styles.mainArea}>
      {positionindex
        ? <>
          <Grid
            justifyContent='center'
            alignItems='center'
            container
            sx={{ height: '100vh', marginLeft: 0 }}
          >
            <Grid item xl={6} lg={6} xs={0}>
              <Fade in mountOnEnter unmountOnExit>
                <PictureArea positionindex={positionindex} />
              </Fade>
            </Grid>
            <Grid item xl={6} lg={6} xs={12}>
              <Slide direction='down' in mountOnEnter unmountOnExit>
                <TutorialTextArea
                  setLoadingPage={setLoadingPage}
                  positionindex={positionindex}
                  dispatch={dispatch}
                  steps={TUTORIAL_STEPS}
                  landingPage
                />
              </Slide>
            </Grid>
          </Grid>
        </>
        : <>
          <Grid
            sx={{ height: '100vh', marginLeft: 0 }}
            justifyContent='center'
            alignItems='center'
            container
          >
            <Grid item xl={6} lg={6} xs={12}>
              <TutorialTextArea
                setLoadingPage={setLoadingPage}
                positionindex={positionindex}
                dispatch={dispatch}
                steps={TUTORIAL_STEPS}
                landingPage
              />
            </Grid>
            <Grid item xl={6} lg={6} xs={0}>
              <PictureArea positionindex={positionindex} />
            </Grid>
          </Grid>
        </>}

    </div>
  )
}

export default MainArea
