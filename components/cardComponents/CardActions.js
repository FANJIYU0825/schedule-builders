import ButtonAddRemove from '../misc/ButtonAddRemove'
import { Stack } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'

/**
 * @description Action buttons for the course cards
 *
 * @param course - The course it contains.
 * @param conversionState - State that defines if the state of the card is converted, e.g "saved" or "scheduled"
 * @param actions - Object containing action handler functions
 * @param {String} panel - What panel the card is located in
*/

function CardActions ({ panel, course, conversionState, actions }) {
  const cardActionContainerStyles = {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }

  let actionRight = null
  let actionRightUndo = null
  let actionLeft = null
  let actionLeftUndo = null
  let textRight = ''
  let textRightUndo = ''
  let textLeft = ''
  let textLeftUndo = ''
  let iconRight = null
  let iconLeft = null
  let conversionStateLeft = null
  let conversionStateRight = null
  let enablePreviewLeft = false
  let enablePreviewRight = false

  if (panel === 'inventory') {
    actionRight = actions.addSchedule
    actionRightUndo = actions.removeSchedule
    actionLeft = actions.addInventory
    actionLeftUndo = actions.removeInventory
    textRight = 'Schedule'
    textRightUndo = 'Unschedule'
    textLeft = 'Remove'
    textLeftUndo = 'Unsave'
    iconRight = <EditCalendarIcon sx={{ mr: '4px' }} />
    iconLeft = <FavoriteIcon sx={{ mr: '4px' }} />
    enablePreviewLeft = false
    enablePreviewRight = true
    conversionStateLeft = conversionState.explorer
    conversionStateRight = conversionState.inventory
  } else { // panel === 'explorer'
    actionRight = actions.addInventory
    actionRightUndo = actions.removeInventory
    actionLeft = actions.addSchedule
    actionLeftUndo = actions.removeSchedule
    textRight = 'Save'
    textRightUndo = 'Unsave'
    textLeft = 'Schedule'
    textLeftUndo = 'Unschedule'
    iconRight = <FavoriteIcon sx={{ mr: '4px' }} />
    iconLeft = <EditCalendarIcon sx={{ mr: '4px' }} />
    enablePreviewLeft = true
    enablePreviewRight = false
    conversionStateLeft = conversionState.inventory
    conversionStateRight = conversionState.explorer
  }

  return (
    <div style={cardActionContainerStyles}>
      <Stack direction='row' spacing={2} sx={{ mr: '10px', ml: '10px', width: '100%' }}>
        <ButtonAddRemove
          course={course}
          isAdded={conversionStateLeft}
          onHandleAddCard={actionLeft}
          onHandleRemoveCard={actionLeftUndo}
          actionText={textLeft}
          addedText={textLeftUndo}
          width='50%'
          panel={panel}
          icon={iconLeft}
          enablePreview={enablePreviewLeft}
        />
        <ButtonAddRemove
          course={course}
          isAdded={conversionStateRight}
          onHandleAddCard={actionRight}
          onHandleRemoveCard={actionRightUndo}
          actionText={textRight}
          addedText={textRightUndo}
          width='50%'
          panel={panel}
          icon={iconRight}
          enablePreview={enablePreviewRight}
        />
      </Stack>
    </div>
  )
}

export default CardActions
