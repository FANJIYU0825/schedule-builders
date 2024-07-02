import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material'

function UploadHelper ({ openHelper, setOpenHelper }) {
  const theme = useTheme()

  const handleClose = () => {
    setOpenHelper(false)
  }

  return (
    <div>
      <Dialog
        open={openHelper}
        onClose={handleClose}
        transitionDuration={{ appear: 200, enter: 200, exit: 0 }}
        maxWidth='xl'
      >
        <DialogTitle
          sx={{
            fontSize: theme.typography.title.fontSize,
            color: theme.palette.primary.uuRed
          }}
        >
          Columns that need to be present in the uploaded CSV-file
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 18, color: 'black' }}>
            Columns need to be spelt exactly as specified within the quotes!
          </DialogContentText>
          <DialogContentText
            sx={{
              color: theme.palette.primary.main,
              fontSize: theme.typography.subheading.fontSize
            }}
          >
            <ol style={{ letterSpacing: '0.25px' }}>
              <li>"Name": The name of the course</li>
              <li>"Campus": The location of where the course is given (Uppsala/Visby/Flexible)</li>
              <li>"Internation institution": The department that the course is under</li>
              <li>"Academic period name": The semester that the course is held (e.g "Autumn semester 2021")</li>
              <li>"Code": The course code of the course</li>
              <li>"Occurence name": The start and end date of the course on the format YYYY-MM-DD to YYYY-MM-DD (e.g "2021-10-28 to 2022-01-16")</li>
              <li>"Period": The cycle of the course (i.e First cycle/Second cycle)</li>
              <li>"Credits (decimal)": The credits of the course on decimal form </li>
              <li>"Credits ECTS (decimal)": The ECTS credits of the course on decimal form </li>
              <li>"Description": A short description of the course, including its prerequisites</li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: theme.palette.primary.main,
              '&:hover': { color: theme.palette.primary.uuRed }
            }} onClick={handleClose} autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UploadHelper
