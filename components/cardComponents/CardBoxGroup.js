import CourseInfoBox from './CourseInfoBox'
import { Stack, Grow } from '@mui/material'

/**
 * @description Grouping of the course information boxes, shown or not depending on the description text being expanded or retracted
 *
 * @param course - The course it contains.
 * @param expandText - State that tells component if the text is expanded or not
*/

function CardBoxGroup ({ course, expandText }) {
  return (
    <>
      {!expandText &&
        <div style={{ marginTop: '30px' }}>
          <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
            <Grow
              in={!expandText}
              style={{ transformOrigin: 'center' }}
              {...(!expandText ? { timeout: 600 } : {})}
            >
              <div>
                <CourseInfoBox value={course} alert />
              </div>
            </Grow>
            <Grow
              in={!expandText}
              style={{ transformOrigin: 'center' }}
              {...(!expandText ? { timeout: 1000 } : {})}
            >
              <div>
                <CourseInfoBox value={course} unit='Pace' unitAcronym='%' />
              </div>
            </Grow>
            <Grow
              in={!expandText}
              style={{ transformOrigin: 'center' }}
              {...(!expandText ? { timeout: 600 } : {})}
            >
              <div>
                <CourseInfoBox value={course.creditsDecimal} unit='Credits' unitAcronym='CP' />
              </div>
            </Grow>
          </Stack>
        </div>}
    </>
  )
}

export default CardBoxGroup
