import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FmdBadIcon from '@mui/icons-material/FmdBad'

/**
 * @description Helper component to PrerequisitePopover and PrerequisitePopoverList.
 * This component renders an icon depending on the type of alert you want to show.
 *
 * @param type - The type of alert to show.
 * @param handlePopoverClose - Function that closes the popover.
 * @param handlePopoverOpen - Function that opens the popover.
 *
*/

function PrerequisitePopoverIcon ({ type, handlePopoverClose, handlePopoverOpen }) {
  switch (type) {
    case 'remote':
      return <FmdBadIcon sx={{ height: '25px', width: '25px' }} color='warning' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
    case 'warning':
      return <WarningAmberIcon sx={{ height: '25px', width: '25px' }} color='warning' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
    case 'error':
      return <ErrorIcon sx={{ height: '25px', width: '25px' }} color='error' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
    case 'info':
      return <CheckCircleIcon sx={{ height: '25px', width: '25px' }} color='success' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
    default:
      return ''
  }
}

export default PrerequisitePopoverIcon
