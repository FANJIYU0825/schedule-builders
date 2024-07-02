import { useTheme, Typography, Modal, Card, CardContent, Stack } from '@mui/material'
import SemesterRadioButtons from './SemesterRadioButtons'
import MainButton from './MainButton'

/**
 * @description Component for the semester / location switch modal.
 *
 * @param handleSave - Function called when user presses the save button.
 * @param setSelectedLocation - State setter for the current selected location radio button.
 * @param setSelectedSemester - State setter for the current selected semester radio button.
 * @param selectedLocation - Current location radio button selected.
 * @param selectedSemester - Current semester radio button selected.
 * @param {Boolean} open - State for if the modal is open or not.
 * @param setOpen - State setter for the open state.
 *
 */

function SemesterModal ({ handleSave, setSelectedLocation, setSelectedSemester, selectedLocation, selectedSemester, open, setOpen }) {
  const theme = useTheme()

  const closeModal = (_, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      // Don't allow the user to proceed without picking a semester and location
      return
    }
    setOpen(false)
  }

  const handleSaveAndClose = () => {
    handleSave()
    closeModal()
  }

  const infoString = 'In order to get you started, we want you to select a semester as well as which location you want to study at. These settings can be changed later on.'

  const modalStyles = {
    zIndex: 4000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '10px'
  }

  const containerStyles = {
    height: '500px',
    width: '540px',
    borderRadius: '10px',
    p: '20px'
  }

  return (
    <Modal open={open} onClose={closeModal} sx={modalStyles} disableAutoFocus>
      <Card sx={containerStyles}>
        <CardContent>
          <Stack spacing={3}>
            <Typography sx={{ fontSize: 32, color: theme.palette.primary.uuRed, textTransform: 'uppercase' }} gutterBottom>
              Semester and location
            </Typography>
            <Typography sx={theme.typography.subtitleSemester}>
              {infoString}
            </Typography>
            <SemesterRadioButtons
              setSelectedSemester={setSelectedSemester}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
              selectedSemester={selectedSemester}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MainButton
                sx={{ height: '50px', width: '150px', color: theme.palette.third.main, borderRadius: '10px', fontSize: 18 }}
                variant='contained'
                color='accent'
                onClick={() => handleSaveAndClose()}
              >
                Save
              </MainButton>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default SemesterModal
