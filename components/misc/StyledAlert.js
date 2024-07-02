import Alert from '@mui/material/Alert'
import { styled } from '@mui/system'

const HEIGHT = '100vh'
const WIDTH = '100vw'
const FONT_SIZE = '20px'
const ICON_SIZE = 40

const StyledAlert = styled(Alert)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  height: HEIGHT,
  width: WIDTH,
  fontSize: FONT_SIZE,
  '& .MuiAlert-icon': {
    fontSize: ICON_SIZE
  }
}))

export default StyledAlert
