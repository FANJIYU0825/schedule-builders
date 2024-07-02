import { styled } from '@mui/system'
import { Card } from '@mui/material'

const CourseCardContainer = styled(Card)(({ theme }) => ({
  margin: '5px',
  padding: '10px',
  height: '500px',
  borderRadius: theme.misc.borders.largeRadius,
  marginBottom: '10px',
  position: 'relative'
}))

export default CourseCardContainer
