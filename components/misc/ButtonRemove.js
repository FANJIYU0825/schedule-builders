import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/system'

/**
 * @description Button that removes a course from the current panel.
 *
 * @param course - The course to add.
 * @param onHandleRemoveCard - Function that removes the card from the panel.
 * @param {boolean} disabled - True if the card cannot be removed, otherwise false.
 * The card might become un-removable from the saved courses panel if it has also been added to the schedule.
 *
*/
function ButtonRemove ({ course, onHandleRemoveCard, disabled }) {
  const theme = useTheme()
  return (
    <Tooltip title='Delete' placement='top' arrow>
      <IconButton
        onClick={() => onHandleRemoveCard(course)}
        disabled={disabled}
        variant='contained'
          // Hack height: Without this the icon button is 0.5px smaller than the text button in the inventory
        sx={{
          backgroundColor: theme.palette.third.primary,
          height: '36.5px',
          borderRadius: theme.misc.borders.radius,
          color: theme.palette.primary.uuRed,
          '&:hover': {
            boxShadow: 3
          }
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}

export default ButtonRemove
