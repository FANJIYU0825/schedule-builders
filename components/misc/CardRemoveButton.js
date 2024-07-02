import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'

/**
 * @description Button that adds a course to the chosen panel.
 *
 * @param course - The course to add.
 * @param {boolean} isAdded - True if the course has been added, otherwise false.
 * @param {string} addedText - A text stating if the course has been added.
 * @param {string} actionText - A text stating that the course can be added.
 * @param onHandleRemoveCard - Function that adds the card.
 * @param width - Width of the button as a CSS property
 *
*/
function CardRemoveButton ({ course, isAdded, addedText, actionText, onHandleRemoveCard, width }) {
  const theme = useTheme()

  return (
    <Button
      variant='outlined'
      onClick={() => onHandleRemoveCard(course)}
      // disabled={isAdded}
      sx={{
        color: theme.palette.primary.uuRed,
        backgroundColor: '#FFF',
        borderRadius: '10px',
        width,
        maxHeight: '37px'
      }}
    >
      <DeleteIcon sx={{ mr: '4px' }} /> {isAdded ? addedText : actionText}
    </Button>
  )
}

export default CardRemoveButton
