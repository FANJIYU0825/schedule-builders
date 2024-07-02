import HorizontalStepper from '../HorizontalStepper'
import styles from '../../../styles/LandingPage.module.css'
import { Typography, useTheme } from '@mui/material'

/**
 * @description Component that implements the tutorial text header of the tutorial textarea, (text and stepper).
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
 * @param {int} steps Amounts of steps in the tutorial
 * @param {boolean} landingPage Boolean that says if the tutorial is rendered in the landing page or not
 * @param dispatch Reducer dispatch function
*/

function TutorialTextHeader ({ positionindex, landingPage, dispatch, steps }) {
  const theme = useTheme()

  const titles = [
    'SCHEDULE BUILDER',
    'EXPLORE COURSES',
    'BUILD AN INVENTORY',
    'BUILD YOUR SCHEDULE',
    'BULLETPROOF YOUR SCHEDULE',
    'EXPORT YOUR SCHEDULE'
  ]
  const subtitles = [
    'This App helps you discover and collect courses to build your schedule with.',
    'Use the free text search and filters to find courses that you would like to study. Make sure that all of your courses are in the same location!',
    'Add the courses that sound interesting to your inventory. Don\'t worry, just because you have added them there does not mean you have to take them. If you don\'t want to have a course in your saved courses anymore, you can delete it from there.',
    'Add courses from your saved courses to your schedule. Click on any empty space in your schedule to see the courses in your saved courses that could fill it.',
    'We will ask you to find backup courses for courses in your schedule that have strict prerequisites. That way, if you don\'t get into your first choice of course two months from now, you wont have to find a replacement.',
    'Once you have a bulletproof schedule you can press the export button and receive a PDF containing your schedule. Send this alongside your exchange application to help our exchange officers to get you registered.'
  ]

  /**
     * This is a mediaquery for the font sizes of the tutorial text area.
     * It is needed for it to be possible to change the size of the MUI typography element
     * after some theme breakpoint.
    */
  const fontsizes = (theme) => ({
    fontSize: theme.typography.title.fontSize,
    [theme.breakpoints.down('xl')]: {
      fontSize: theme.typography.titleSmaller.fontSize
    }
  })

  return (
    <>
      {positionindex !== 0 &&
        <HorizontalStepper
          positionindex={positionindex}
          dispatch={dispatch}
          steps={steps}
          landingPage={landingPage}
        />}
      <Typography
        data-testid='tutorialTextHeaderTitle'
        sx={{
          fontSize: fontsizes(theme),
          fontWeight: 400,
          flexGrow: 1,
          letterSpacing: '1px'
        }}
      >
        {titles[positionindex]}
      </Typography>
      <h6 className={landingPage ? styles.textAreaSubtitleLanding : styles.textAreaSubtitleSaved}>
        {subtitles[positionindex]}
      </h6>
    </>
  )
}

export default TutorialTextHeader
