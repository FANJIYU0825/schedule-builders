import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useTheme } from '@mui/material'
import { useUserActions } from '../../utils/hooks'

/**
 * @description Component that implements the stepper that is used in the tutorial of the website. It can be reused
 * to create other steppers.
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
 * @param {int} steps Amounts of steps in the tutorial
 * @param dispatch Reducer dispatch function
 * @param {boolean} landingPage Boolean that says if the tutorial is rendered in the landing page or not
*/

function HorizontalStepper ({ positionindex, dispatch, steps, landingPage }) {
  const tutorialSteps = Array.from({ length: steps }, (_, index) => index + 1)
  const checkedSteps = Array.from({ length: positionindex }, (_, index) => index + 1)
  const theme = useTheme()
  const [userActions] = useUserActions()

  function isChecked (step) {
    if (userActions) {
      return checkedSteps.includes(step) || userActions.includes(step)
    }
    return checkedSteps.includes(step)
  }

  return (
    <Box sx={{ width: '100%', mb: '20px' }}>
      <Stepper
        data-testid='tutorial-stepper'
        activeStep={positionindex - 1}
        sx={{
          '& .MuiStepConnector-line': {
            borderTopWidth: '2px'
          },
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
            borderColor: theme.palette.primary.main
          },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
            borderColor: theme.palette.primary.main
          }
        }}
      >
        {tutorialSteps.map((step, index) => {
          return (
            <Step key={index} completed={isChecked(step + 1)}>
              <StepLabel data-testid={`step-label-${step}`} onClick={landingPage ? () => dispatch({ type: 'set', payload: step }) : null} />
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
export default HorizontalStepper
