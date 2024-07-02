import EditIcon from '@mui/icons-material/Edit'
import { useSchedule } from '../../utils/hooks'
import { capitalFirstLetter } from '../../utils/utility'

/**
 * @description Component for the button that lets a user pick semester and location, it opens the SemesterModal.
 *
 * @param handleOpenSemesterModal - Function that runs when the SemesterModal is opened.
 *
 */

function SemesterLocationButton ({ handleOpenSemesterModal }) {
  const [{ location, semester }] = useSchedule()

  const buttonStyles = {
    display: 'flex',
    height: '100%',
    maxHeight: '40px',
    width: '100%',
    border: '1px solid #c4c4c4',
    backgroundColor: '#FFF',
    alignItems: 'center',
    fontFamily: 'Gill Alt One MT',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    color: '#666666',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
    borderRadius: '4px'
  }

  const infoStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '14px 8.5px'
  }

  const iconStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }

  return (
    <button style={buttonStyles} onClick={() => handleOpenSemesterModal()}>
      <div style={infoStyles}>
        {`${capitalFirstLetter(location)}, ${capitalFirstLetter(semester)}`}
      </div>
      <div style={iconStyles}>
        <EditIcon />
      </div>

    </button>
  )
}

export default SemesterLocationButton
