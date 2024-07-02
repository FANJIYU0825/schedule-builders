import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSchedule } from '../../utils/hooks'

/**
 * @description Button that adds a course to the chosen panel.
 *
 * @param course - The course to add.
 * @param {boolean} isAdded - True if the course has been added, otherwise false.
 * @param {string} addedText - A text stating if the course has been added.
 * @param {string} actionText - A text stating that the course can be added.
 * @param onHandleAddCard - Function that adds the card.
 * @param width - Width of the button as a CSS property.
 * @param panel - The panel that holds the button.
 *
*/
function ButtonAdd ({ enablePreview = false, course, isAdded, addedText, actionText, onHandleAddCard, icon, width, panel }) {
  const theme = useTheme()
  const [, dispatchSchedule] = useSchedule()

  const handleMouseEnter = (course) => {
    if (enablePreview) dispatchSchedule({ type: 'addPreviewCard', payload: course })
  }

  const handleMouseLeave = () => {
    if (enablePreview) dispatchSchedule({ type: 'clearPreviewCard' })
  }

  return (
    <Button
      variant='contained'
      onClick={() => {
        handleMouseLeave()
        onHandleAddCard(course)
      }}
      disabled={isAdded}
      sx={{
        backgroundColor: theme.palette.primary.uuRed,
        borderRadius: '10px',
        width,
        maxHeight: '37px'
      }}
      onMouseEnter={() => {
        handleMouseEnter(course)
      }}
      onMouseLeave={() => {
        handleMouseLeave()
      }}
    >
      {icon} {isAdded ? addedText : actionText}
    </Button>
  )
}

export default ButtonAdd
