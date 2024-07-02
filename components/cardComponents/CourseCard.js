import { Stack, Grid, Divider, Typography, Collapse, Grow } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import CardActions from './CardActions'
import CardBoxGroup from './CardBoxGroup'
import CourseMetaData from './CourseMetaData'
import CourseCardContainer from './containers/CourseCardContainer'
import Link from '@mui/material/Link'
import { useWindowSize } from '../../utils/hooks'
import { SYLLABUS_BASE_URL } from '../../utils/globals'

/**
 * @description Card component that holds the course information - course name, department, location, period etc..
 *
 * @param course - The course it contains.
 * @param conversionState - State that defines if the state of the card is converted, e.g "saved" or "scheduled"
 * @param actions - Object containing action handler functions
 * @param {String} panel - What panel the card is located in
*/
function CourseCard ({ course, conversionState, actions, panel }) {
  const theme = useTheme()
  const [expandText, setExpandText] = useState(false)
  const descriptionRef = useRef(null)
  const { width } = useWindowSize()

  const descriptionStyles = {
    ...theme.typography.subtitle,
    height: expandText ? '260px' : '100px',
    overflow: expandText ? 'scroll' : 'hidden',
    position: 'relative',
    p: '5px',
    [theme.breakpoints.down('xl')]: {
      height: expandText ? '210px' : '100px'
    },
    ...(!expandText &&
      {
        '::before': {
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`
        }
      }
    ),
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '20px'
    }
  }

  const handleExpand = () => {
    setExpandText((prev) => !prev)
    descriptionRef.current.scrollTop = 0
  }

  const getCharacterThreshold = () => {
    // Yes this is a dumpster fire, please fix it if you find a better way
    if (width > 1845) return 210
    if (width < 1350) return 270
    else return 180
  }

  const ExpandText = (
    course.description
      ? course.description.length > getCharacterThreshold()
        ? (
          <span
            style={{
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: theme.palette.primary.main,
              cursor: 'pointer'
            }}
            onClick={handleExpand}
          >
            {expandText ? 'Show less' : 'Read more'}
            {expandText ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
          )
        : (
          <span
            style={{
              fontSize: '14px',
              display: 'flex',
              visibility: 'hidden'
            }}
          >
            Placeholder
          </span>
          )
      : (
        <span
          style={{
            ...theme.typography.subtitle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: theme.palette.secondary.darker
          }}
        >
          No description available for this course
        </span>
        )
  )

  return (
    <Grow in>
      <Grid item md={12} lg={6} xl={6}>
        <CourseCardContainer
          sx={{
            [theme.breakpoints.down('xl')]: {
              height: '470px'
            }
          }}
        >
          <Stack spacing={1}>
            <CourseMetaData course={course} />
            <Divider />
            <Collapse in={expandText} collapsedSize={100}>
              <Typography
                ref={descriptionRef}
                sx={descriptionStyles}
              >
                {course.description + ' '}
                <br />
                <br />
                <Link target='_blank' rel='noopener noreferrer' color={theme.palette.accent.main} href={SYLLABUS_BASE_URL + course.code}>Syllabus</Link>
              </Typography>
            </Collapse>
            {ExpandText}
            <CardBoxGroup course={course} expandText={expandText} />
            <CardActions
              panel={panel}
              actions={actions}
              conversionState={conversionState}
              course={course}
            />
          </Stack>
        </CourseCardContainer>
      </Grid>
    </Grow>
  )
}

export default CourseCard
