import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { useError } from '../../utils/hooks'

function ErrorModal () {
  const theme = useTheme()
  const [message, setError] = useError()
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    setError('')
  }

  useEffect(() => {
    if (message !== '') setOpen(true)
  }, [message])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        transitionDuration={{ appear: 200, enter: 200, exit: 0 }}
        sx={{
          zIndex: 10000
        }}
      >
        <DialogTitle
          sx={{
            fontSize: theme.typography.title.fontSize,
            color: theme.palette.primary.uuRed
          }}
        >
          Warning
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: theme.palette.primary.main,
              fontSize: theme.typography.subheading.fontSize
            }}
          >
            {message}
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

export default ErrorModal
