import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTheme } from '@mui/system'
import { Stack } from '@mui/material'
import PrerequisitePopoverIcon from './PrerequisitePopoverIcon'
import PrerequisitePopoverText from './PrerequisitePopoverText'

/**
 * @description The popover component that shows the prerequisites for a course.
 *
 * @param {object} anchorEl - The anchor element for the popover.
 * @param {string} content - The content of the popover.
 * @param {string} type - The type of alert to show.
 *
*/

function PrerequisitePopover ({ anchorEl, content, type }) {
  const theme = useTheme()

  const open = Boolean(anchorEl)

  const generalEntryReqText = 'General entry requirements. Refer to the syllabus provided in the course description above for further information.'

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
    >
      <PrerequisitePopoverIcon
        type={type}
      />

      <Popover
        sx={{
          pointerEvents: 'none',
          textAlign: 'center'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        disableRestoreFocus
        PaperProps={{ style: { maxWidth: '400px' } }}
      >
        <Typography variant='h6' sx={{ color: theme.palette.primary.uuRed, paddingLeft: 1, paddingRight: 1 }}>
          <PrerequisitePopoverText type={type} />
        </Typography>
        <Typography sx={{ p: 1 }}>{content?.length === 0 ? generalEntryReqText : content}</Typography>
      </Popover>
    </Stack>
  )
}

export default PrerequisitePopover
