import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { Collapse, Divider, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import CloseIcon from '@mui/icons-material/Close'

/**
    @description Renders a dialog box that displays the change log of a project fetched from GitLab API.
    @param {Object} props - Props for ChangeLog component
    @param {boolean} props.open - Controls whether the dialog box is open or closed
    @param {function} props.setOpen - Function to set the open state of the dialog box
    @returns {JSX.Element} - A JSX element that renders the ChangeLog component
*/
function ChangeLog ({ open, setOpen }) {
  const theme = useTheme()
  // Amount of changes that should be displayed.
  const displayLimit = 10
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMore, setShowMore] = useState({})
  const extractDate = (mr) => mr.merged_at.substring(0, 10)
  const extractTime = (mr) => mr.merged_at.substring(11, 16)

  useEffect(() => {
    async function fetchMRinfo () {
      try {
        // Token expires after a year
        const res = await fetch(`https://gitlab.speldesign.uu.se/api/v4/projects/22/merge_requests?private_token=${process.env.NEXT_PUBLIC_GITLAB_API_TOKEN}`)
        const mrData = await res.json()
        setData(mrData.sort((a, b) => new Date(b.merged_at) - new Date(a.merged_at)))
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchMRinfo()
  }, [])

  useEffect(() => {
    const showMoreStateObject = data.reduce((acc, obj) => {
      acc[obj.id] = false
      return acc
    }, {})
    setShowMore(showMoreStateObject)
  }, [data, open])

  const handleShowMore = (id) => {
    setShowMore(prevState => {
      const prevValue = prevState[id]
      return {
        ...prevState,
        [id]: !prevValue
      }
    })
  }

  /* Checks the merge request description and finds what should be included in the change log and what should not be included.
    Includes everything inside "--public" and "--end_public".
    Example:
      --public

        I am included inside the change log.

      --end_public

      I am a secret that should not be visible in the change log.
  */
  const parseDesc = (desc) => {
    const regex = /--public([\s\S]*?)--end_public/g
    const matches = desc.match(regex)
    const publicText = matches && matches.map(match => match.replace('--public', '').replace('--end_public', '').trim()).join(' ')
    return publicText
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog onClose={handleClose} open={open} sx={{ zIndex: 100000 }}>
        <DialogTitle
          sx={{
            fontSize: theme.typography.titleSmaller,
            color: theme.palette.primary.main
          }}
        >
          Change Log
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0 }}>
          <Button
            sx={{
              color: theme.palette.primary.main,
              '&:hover': { color: theme.palette.primary.main },
              position: 'static'
            }}
            onClick={handleClose}
            autoFocus
          >
            <CloseIcon />
          </Button>
        </DialogActions>
        <DialogContent>
          {loading
            ? <DialogContentText>Loading...</DialogContentText>
            : data.length > 0
              ? data.slice(0, displayLimit).map((mr) => {
                return (
                  <div key={mr.id}>
                    <strong style={{ fontSize: 18, marginBottom: '10px' }}>
                      {mr.title}
                    </strong>
                    <DialogContentText sx={{ fontSize: 15, marginTop: '5px', marginBottom: '5px' }}>
                      Added {extractDate(mr)} at {extractTime(mr)}
                    </DialogContentText>
                    <DialogContentText
                      onClick={() => handleShowMore(mr.id)}
                      sx={{ fontSize: 14, color: '#0288d1', cursor: 'pointer', marginBottom: '5px' }}
                    >
                      {showMore[mr.id] ? 'Show less' : 'Show more'}
                    </DialogContentText>
                    <Collapse in={showMore[mr.id]}>
                      <ReactMarkdown>{parseDesc(mr.description)}</ReactMarkdown>
                    </Collapse>
                    <Divider />
                  </div>
                )
              })
              : <DialogContentText>Failed to fetch data. Please try again later.</DialogContentText>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChangeLog
