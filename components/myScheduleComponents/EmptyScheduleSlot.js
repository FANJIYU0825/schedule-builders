import { Box } from '@mui/material'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useFilters, useCourses, useSchedule } from '../../utils/hooks'
import { getUniqueValuesByKey, findUniqueStartingMonths, schedulePosition } from '../../utils/utility'
import { SEMESTER_FALL_START_DATE, SEMESTER_SPRING_START_DATE, monthMap } from '../../utils/globals'

function EmptyScheduleSlot ({ coords, isPreview = false }) {
  const theme = useTheme()
  const [{ semester, scheduledCourses }] = useSchedule()
  const [{ courses }] = useCourses()
  const [, dispatchFilterState] = useFilters()
  const [show, setShow] = useState(isPreview)

  const glowOpacity = 65
  const glowOpacityHex = glowOpacity.toString(16)

  const studyPace = coords.yEnd - coords.yStart + 2
  const studyPaceOptions = getUniqueValuesByKey('creditsECTSDecimal', courses)
  const possibleStudyPaces = studyPaceOptions.filter((pace) => pace <= studyPace)

  const width = coords.xEnd - coords.xStart
  const credits = 30 * (studyPace * width / 100 ** 2)
  const roundedCredits = Math.round(credits / 5) * 5
  const creditsOptions = getUniqueValuesByKey('creditsDecimal', courses)
  const possibleCredits = creditsOptions.filter((credit) => credit <= roundedCredits)

  const uniqueStartingMonths = findUniqueStartingMonths(courses)
  const startingMonthOffset = Math.round((coords.xStart / 100) * uniqueStartingMonths.size)
  const endingMonthOffset = Math.round((coords.xEnd / 100) * uniqueStartingMonths.size)
  const firstStartingMonth = semester === 'autumn' ? SEMESTER_FALL_START_DATE.split('-')[1] : SEMESTER_SPRING_START_DATE.split('-')[1]
  const startingMonth = (Number(firstStartingMonth) + startingMonthOffset).toLocaleString('default', { minimumIntegerDigits: 2 })
  const endingMonth = (((Number(firstStartingMonth) + endingMonthOffset)) % 12).toLocaleString('default', { minimumIntegerDigits: 2 })

  const setFilters = () => {
    if (scheduledCourses.length != 0) {
      dispatchFilterState({ type: 'addFilter', payload: { option: 'creditsDecimal', input: possibleCredits } })
      dispatchFilterState({ type: 'addFilter', payload: { option: 'creditsECTSDecimal', input: possibleStudyPaces } })
      dispatchFilterState({ type: 'addFilter', payload: { option: 'occurenceName', input: { semester, params: [monthMap.get(startingMonth), monthMap.get(endingMonth)] } } })
    } else {
      dispatchFilterState({ type: 'clearFilters' })
    }
  }

  const variants = {
    show: {
      opacity: 1,
      scale: [1, 1, 1.01, 1],
      filter: ['blur(5px)', 'blur(0px)'],
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    hide: {
      opacity: 0,
      scale: 1,
      filter: 'blur(5px)',
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <Box
      component={motion.div}
      initial='hide'
      animate={show ? 'show' : 'hide'}
      variants={variants}
      sx={{
        zIndex: 1,
        opacity: 0,
        border: `2px solid ${theme.palette.primary.uuRed}`,
        borderRadius: theme.misc.borders.largeRadius,
        ':hover': { cursor: 'pointer' },
        boxShadow: `0px 0px 20px ${theme.palette.primary.uuRed + glowOpacityHex}, 0px 0px 70px ${theme.palette.primary.uuRed + glowOpacityHex} inset`,
        ...schedulePosition(coords)
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={setFilters}
    />
  )
}

export default EmptyScheduleSlot
