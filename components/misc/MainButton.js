import { Button } from '@mui/material'
import { styled } from '@mui/system'

/**
 * @description Wrapper for the MUI Button component. Colors can be customized
 * using the 'color' prop, which accepts any value defined in theme.js.
*/

const WIDTH = '100%'
const HEIGHT = '100%'

const MainButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.button.fontSize,
  borderRadius: theme.misc.borders.radius,
  width: WIDTH,
  height: HEIGHT
}))

export default MainButton
