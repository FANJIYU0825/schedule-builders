import InfoIcon from '@mui/icons-material/Info'
import { IconButton, Tooltip } from '@mui/material'
import { useTheme } from '@emotion/react'
import { SYLLABUS_BASE_URL } from '../../utils/globals'

export default function InfoButton ({ course }) {
  const theme = useTheme()

  return (
    <Tooltip title='Course info' placement='top' arrow>
      <IconButton
        sx={{
          height: '36.5px',
          aspectRatio: '1/1',
          color: theme.palette.primary.mainBrighter
        }}
        href={SYLLABUS_BASE_URL + course.code}
        target='_blank'
        rel='noopener noreferrer'
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  )
}
