import SearchField from './SearchField'
import { TextField, Chip, Box } from '@mui/material'
import { getUniqueValuesByKey } from '../../utils/utility.js'
import { useCourses, useFilters } from '../../utils/hooks'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

/**
 * @description Free text search component with dropdown values. Containing the different departments.
 *
 * @param {string} label - The default label text inside the search field.
 *
*/
function DepartmentDropdown ({ label }) {
  const [{ filters }, dispatch] = useFilters()
  const [{ courses }] = useCourses()
  const theme = useTheme()
  const departmentNames = getUniqueValuesByKey(label, courses)

  const handleChange = (v) => {
    if (v.length === 0) {
      dispatch({ type: 'removeFilter', payload: label })
    } else {
      dispatch({ type: 'addFilter', payload: { option: label, input: v } })
    }
  }

  const maxTags = 1

  const glowOpacity = 65
  const glowOpacityHex = glowOpacity.toString(16)

  const ChangeAnimation = (
    <motion.div
      key={filters[label]}
      style={{
        border: `2px solid ${theme.palette.primary.uuRed + glowOpacityHex}`,
        borderRadius: theme.misc.borders.radius,
        boxShadow: `0px 0px 10px ${theme.palette.primary.uuRed + glowOpacityHex}, 0px 0px 20px ${theme.palette.primary.uuRed + glowOpacityHex} inset`,
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut'
      }}
    />
  )

  return (
    <Box id='hello' sx={{ position: 'relative' }}>
      <SearchField
        options={departmentNames}
        limitTags={maxTags}
        multiple
        onChange={(_, v) => handleChange(v)}
        value={filters[label] ? filters[label] : []}
        size='small'
        sx={{
          position: 'relative',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
          zIndex: 2
        }}
        renderInput={(params) =>
          <TextField
            {...params}
            label='Department'
            size='small'
          />}
        renderTags={(value, getTagProps) =>
          <Chip
            label={`${value.length} selected`}
            sx={{
              maxHeight: '1.5rem',
              ml: 1
            }}
          />}
      />
      {ChangeAnimation}
    </Box>
  )
}

export default DepartmentDropdown
