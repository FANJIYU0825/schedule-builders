import { Stack } from '@mui/material'
import Title from './typography/Title'
import SubTitleLocation from './typography/SubTitleLocation'
import CourseDepartment from './typography/CourseDepartment'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useTheme } from '@mui/material/styles'

/**
 * @description The metadata for each card
 *
 * @param course - The course it contains.
*/

function CourseMetaData ({ course }) {
  const theme = useTheme()
  return (
    <>
      <Title params={[course.name, course.code]} style={{ height: '4em' }} />
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ height: '40px' }}>
        <CourseDepartment department={course.internationInstitution} />
        <Stack direction='row' alignItems='center'>
          <LocationOnIcon sx={{ color: theme.palette.primary.uuRed }} />
          <SubTitleLocation subtitle={course.campus} />
        </Stack>
      </Stack>
    </>
  )
}

export default CourseMetaData
