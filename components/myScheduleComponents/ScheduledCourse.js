import { Card, Stack, Box } from '@mui/material'
import { useTheme } from '@emotion/react'
import ButtonRemove from '../misc/ButtonRemove'
import Title from '../cardComponents/typography/Title'
import CourseInfoBox from '../cardComponents/CourseInfoBox'
import { useSchedule } from '../../utils/hooks'
import InfoButton from '../misc/InfoButton'
import EmptyScheduleSlot from './EmptyScheduleSlot'
import { schedulePosition } from '../../utils/utility'

function ScheduledCourse ({ course, coords }) {
  if (!coords) return null
  if (course.preview) return <EmptyScheduleSlot coords={coords} isPreview />

  const [, dispatchSchedule] = useSchedule()
  const theme = useTheme()

  const removeCourse = (c) => {
    dispatchSchedule({ type: 'removeCard', payload: c })
  }

  // Break point for different card heights (study pace)
  const smallBP = 35

  const CreditsInfo = () => {
    return <CourseInfoBox compact value={course.creditsDecimal} unit='Credits' unitAcronym='CP' />
  }

  const AlertInfo = () => {
    return (
      <>
        {course.period.toLowerCase().includes('first cycle') || course.period.toLowerCase().includes('second cycle')
          ? <CourseInfoBox compact value={course} alert />
          : null}
        {course.campus.toLowerCase().includes('flexible')
          ? <CourseInfoBox compact value={course} alert type='remote' />
          : null}
      </>
    )
  }

  return (
    <Card
      style={{
        zIndex: 2,
        borderRadius: theme.misc.borders.largeRadius,
        padding: 4,
        ...schedulePosition(coords)
      }}
    >
      <Stack
        spacing={course.creditsECTSDecimal < smallBP ? 0 : 3}
        height='100%'
        direction={course.creditsECTSDecimal < smallBP ? 'row' : 'column'}
        justifyContent={course.creditsECTSDecimal < smallBP ? 'space-between' : 'center'}
      >
        <Stack
          direction='column'
          alignItems='center'
          justifyContent='center'
          minWidth='0%'
        >
          <Box
            maxWidth={course.creditsECTSDecimal < smallBP ? '100%' : '70%'}
          >
            <Title params={[course.name, course.code]} center truncate={course.creditsECTSDecimal < smallBP ? 2 : 4} expand />
          </Box>
        </Stack>
        {course.creditsECTSDecimal < smallBP
          ? <Stack
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              spacing={1}
            >
            <AlertInfo />
            <CreditsInfo />
            <Stack direction='row'>
              <InfoButton course={course} />
              <Box sx={{ paddingRight: 1 }}>
                <ButtonRemove
                  isInSchedule isBigCard
                  course={course}
                  onHandleRemoveCard={removeCourse}
                  disabled={false}
                />
              </Box>
            </Stack>
            </Stack>
          : <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              width='100%'
              spacing={1}
            >
            <AlertInfo />
            <CreditsInfo />
          </Stack>}
      </Stack>

      {course.creditsECTSDecimal < smallBP
        ? null
        : <Stack direction='row' sx={{ position: 'absolute', top: 8, right: 8 }}>
          <InfoButton course={course} />
          <ButtonRemove
            isInSchedule isBigCard
            course={course}
            onHandleRemoveCard={removeCourse}
            disabled={false}
          />
        </Stack>}

    </Card>
  )
}

export default ScheduledCourse
