import FreeTextSearch from '../filterSearchComponents/FreeTextSearch'
import DropDown from '../filterSearchComponents/DropDown'
import MonthDropDown from '../filterSearchComponents/MonthDropDown'
import { Badge, Stack, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { findUniqueStartingMonths, getUniqueValuesByKey, handleFilter, isObjectEmpty } from '../../utils/utility.js'
import { useEffect } from 'react'
import DepartmentDropdown from './DepartmentDropdown'
import { useFilters, useStepper, useUserActions } from '../../utils/hooks'
import ClearIcon from '@mui/icons-material/Clear'
import MainButton from '../misc/MainButton'
import SemesterLocationButton from './SemesterLocationButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExploreIcon from '@mui/icons-material/ExploreOutlined'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { monthMap } from '../../utils/globals'

/**
 * @description Component containing the search field and filter fields of credit points, study pace, starting month, departments, prerequisites, and location.
 *
 * @param dispatchFilters - Function that sets the filtered courses.
 * @param handleOpenSemesterModal - Function that runs when the SemesterModal is opened.
 *
*/
function FilterControls ({ courses, amtSavedCourses, dispatchFilters, handleOpenSemesterModal }) {
  const [{ filters, toggleSavedCourses, showFilters }, dispatchFilterState] = useFilters()
  const [, dispatchUserActions] = useUserActions()
  const [stepperState, dispatchStepper] = useStepper()
  const theme = useTheme()

  const creditPoints = getUniqueValuesByKey('creditsDecimal', courses).sort(function (a, b) { return a - b })
  const studyPace = getUniqueValuesByKey('creditsECTSDecimal', courses).sort(function (a, b) { return a - b })
  const prerequisites = ['First cycle', 'Second cycle', 'General entry requirements']

  const uniqueStartingMonths = findUniqueStartingMonths(courses)

  const months = Array.from(uniqueStartingMonths).map(monthNumber => monthMap.get(monthNumber))

  const sortedMonths = months.sort((a, b) => {
    const monthA = new Date(Date.parse(a + ' 1, 2000')).getMonth()
    const monthB = new Date(Date.parse(b + ' 1, 2000')).getMonth()
    return monthA - monthB
  })

  useEffect(() => {
    // Shows filters if they are changed and not already shown
    if (!showFilters && !isObjectEmpty(filters)) {
      dispatchFilterState({ type: 'toggleShowFilters' })
    }
  }, [filters])

  useEffect(() => {
    if (!isObjectEmpty(filters)) {
      // User has completed the first step of the tutorial
      dispatchUserActions({ type: 'filterApplied' })
      if (stepperState.index < 1) {
        // The user completed the step by action and not by clicking next
        dispatchStepper({ type: 'set', payload: 1 })
      }
    }
    handleFilter(courses, filters, dispatchFilters)
  }, [filters, courses])

  const variants = {
    open: {
      height: 130,
      zIndex: 1,
      opacity: [0, 0, 1],
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    closed: {
      height: 0,
      zIndex: -1,
      opacity: [1, 0, 0],
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <Grid container spacing={2} sx={{ mb: '1rem' }}>
      <Grid item xs={7}>
        <FreeTextSearch
          label='name'
        />
      </Grid>

      <Grid item xs={2.5}>
        <Badge
          sx={{ width: '100%', height: '100%' }}
          badgeContent={Object.keys(filters).length}
          color='primary'
        >
          <MainButton
            sx={{
              borderColor: theme.palette.secondary.main,
              color: theme.palette.third.main,
              whiteSpace: 'nowrap'
            }}
            color={showFilters ? 'primary' : 'accent'}
            variant='contained'
            onClick={() => dispatchFilterState({ type: 'toggleShowFilters' })}
            alt='show filters'
          >
            {showFilters ? <FilterAltOffIcon /> : <FilterAltIcon />} &nbsp; Filters
          </MainButton>
        </Badge>
      </Grid>

      <Grid item xs={2.5}>
        <MainButton
          variant='contained'
          disabled={isObjectEmpty(filters)}
          onClick={() => dispatchFilterState({ type: 'clearFilters' })}
          startIcon={<ClearIcon />}
        >
          Clear
        </MainButton>
      </Grid>

      {/* This is a sub-grid for the part of the filters that can be hidden */}
      <Grid
        component={motion.div}
        initial='closed'
        animate={showFilters ? 'open' : 'closed'}
        variants={variants}
        container
        spacing={2}
        item
        xs={12}
      >
        <Grid item xs={4}>
          <DropDown
            name='Credit Points'
            label='creditsDecimal'
            values={creditPoints}
          />
        </Grid>
        <Grid item xs={4}>
          <DropDown
            name='Study Pace (%)'
            label='creditsECTSDecimal'
            values={studyPace}
          />
        </Grid>
        <Grid item xs={4}>
          <MonthDropDown
            name='Time Interval'
            label='occurenceName'
            values={sortedMonths}
          />
        </Grid>
        <Grid item xs={4}>
          <DepartmentDropdown
            label='internationInstitution'
          />
        </Grid>
        <Grid item xs={4}>
          <DropDown
            name='Entry Requirements'
            label='period'
            values={prerequisites}
          />
        </Grid>
        <Grid item xs={4}>
          <SemesterLocationButton courses={courses} handleOpenSemesterModal={handleOpenSemesterModal} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ToggleButtonGroup
          sx={{ width: '100%' }}
          value={toggleSavedCourses}
          onChange={() => { dispatchFilterState({ type: 'toggleSavedCourses' }) }}
          exclusive
        >
          <ToggleButton
            color={toggleSavedCourses ? 'primary' : 'accent'}
            value={false}
            key='false'
            sx={{ width: '100%', padding: '0.5rem' }}
          >
            <ExploreIcon fontSize='large' /> &nbsp; explore
          </ToggleButton>
          <ToggleButton
            color={!toggleSavedCourses ? 'primary' : 'accent'}
            value
            key='true'
            sx={{ overflow: 'hidden', width: '100%', padding: '0.5rem', position: 'relative' }}
          >
            <Stack
              justifyContent='center'
              alignItems='center'
              sx={{ position: 'relative', height: '100%', aspectRatio: '1 / 1' }}
              component={motion.div}
              key={amtSavedCourses}
              initial={{
                scale: 1
              }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.3,
                repeat: 1,
                ease: 'easeInOut'
              }}
            >
              <motion.div
                key={amtSavedCourses}
                style={{
                  borderRadius: '50%',
                  height: '90%',
                  width: '90%',
                  position: 'absolute',
                  filter: 'blur(10px)',
                  background: theme.palette.primary.uuRed
                }}
                initial={{
                  opacity: 0
                }}
                animate={{
                  scale: [0, 10],
                  opacity: [0, 1, 0.5, 0]
                }}
                transition={{
                  duration: 1
                }}
              />
              <Badge
                sx={{ position: 'absolute', color: 'white' }}
                badgeContent={amtSavedCourses}
                color='accent'
                overlap='circular'
              >
                <FavoriteBorderIcon
                  color={!toggleSavedCourses ? 'primary' : 'accent'}
                  fontSize='large'
                />
              </Badge>
            </Stack>
            &nbsp; &nbsp; saved courses
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )
}

export default FilterControls
