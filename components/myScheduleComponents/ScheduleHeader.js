import { useState, useEffect } from 'react'
import { Typography, Stack, useTheme, Modal, Box, TextField } from '@mui/material'
import styles from '../../styles/Schedule.module.css'
import MainButton from '../misc/MainButton'
import HeaderInfoArea from './HeaderInfoArea'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ScheduleExport from './ScheduleExport'
import IosShareIcon from '@mui/icons-material/IosShare'
import ExportWarnings from './ExportWarnings'
import { posthog } from 'posthog-js'
import { toPng } from 'html-to-image'
import { useSchedule } from '../../utils/hooks'
import formbricks from '@formbricks/js'

/**
 * @description Component in the my schedule panel that holds the information of the courses selected and the export to schedule button.
 *
*/
function ScheduleHeader () {
  const theme = useTheme()
  const [scheduleState] = useSchedule()
  const scheduledCourses = scheduleState.scheduledCourses

  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [graphic, setGraphic] = useState(null)
  const [hasExported, setHasExported] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => {
    setOpen(false)
    if (hasExported) {
      // Show the survey
      formbricks.track('Export')
    }
  }
  const handleExport = () => {
    const entryRequirements = scheduledCourses.reduce((total, obj) => obj.period.toLowerCase().includes('second cycle') || obj.period.toLowerCase().includes('first cycle') ? total + 1 : total, 0)
    const remote = scheduledCourses.reduce((total, obj) => obj.campus.toLowerCase().includes('flexible') ? total + 1 : total, 0)
    if (remote > 0) {
      posthog.capture('Exported schedule')
      posthog.capture('Export with remote courses', { amountOfRemoteCourses: remote })
    }
    if (entryRequirements > 0) {
      posthog.capture('Exported schedule')
      posthog.capture('Export with special requirements', { amountOfCoursesSpecialRequirements: entryRequirements })
    } else {
      posthog.capture('Exported schedule')
      posthog.capture('Export successful without any warnings')
    }
    // Indicate that the next closing action of the modal should trigger the survey
    setHasExported(true)
  }

  useEffect(() => {
    toPng(document.getElementById('scheduleGraphic'), { quality: 0.05 })?.then((c) => setGraphic(c))
  }, [scheduledCourses])

  const fileName = (name) => (name ? `${name.toLowerCase().replace(' ', '_')}_UU_Schedule_${Date.now()}.pdf` : `UU_Schedule_${Date.now()}.pdf`)

  return (
    <div className={styles.scheduleHeader}>
      {/* Modal for exporting schedule as PDF */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-describedby='modal-description'
        sx={{ zIndex: 5000, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
      >
        <Box sx={{
          background: 'white',
          minWidth: '20%',
          p: '20px'
        }}
        >
          <Typography id='modal-description' variant='h6' component='h2' sx={{ color: theme.palette.accent.main }}>
            EXPORT SCHEDULE
          </Typography>
          <TextField
            fullWidth
            label='Your name (optional)'
            sx={{ mt: '30px', mb: '16px' }}
            value={name}
            onChange={event => {
              setName(() => event.target.value)
            }}
          />

          <ExportWarnings scheduledCourses={scheduledCourses} />

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <MainButton
              sx={{ height: '100%', display: 'flex', margin: 1 }}
              variant='outlined'
              color='accent'
              onClick={() => closeModal()}
            >
              Close
            </MainButton>
            <MainButton
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 1,
                color: theme.palette.third.main
              }}
              variant='contained'
              color='accent'
              onClick={handleExport}
              component={PDFDownloadLink}
              document={
                <ScheduleExport
                  courses={scheduledCourses}
                  name={name}
                  graphic={graphic}
                />
              }
              fileName={fileName(name)}
            >
              Export
              <IosShareIcon sx={{ transform: 'translateY(-10%)', fontSize: 'medium', ml: 1 }} />
            </MainButton>
          </Box>
        </Box>
      </Modal>

      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{
          width: 1,
          padding: 2,
          height: '6rem',
          maxHeight: '6rem',
          background: theme.palette.secondary.light
        }}
        spacing={2}
      >
        <HeaderInfoArea />

        {/* div here to separate export button from rest of info for small screens */}
        <MainButton
          sx={{ width: 'auto', minWidth: '0%', display: !scheduledCourses.filter(c => c.preview === false).length ? 'none' : 'flex', color: theme.palette.third.main }}
          variant='contained'
          color='accent'
          onClick={openModal}
        >
          <h3>export</h3>
        </MainButton>
      </Stack>
    </div>
  )
}

export default ScheduleHeader
