import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material'
import { useFilters, useSchedule } from '../../utils/hooks'
import posthog from 'posthog-js'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { monthMapReverse } from '../../utils/globals'

/**
 * @description Dropdown filter component.
 *
 * @param {string} label - The default label text inside the dropdown field.
 * @param {string} name - The name of the dropdown field.
 * @param values - A list of values that can be chosen in the dropdown.
 *
*/
function DropDown ({ label, name, values }) {
  const [{ filters }, dispatch] = useFilters()
  const [{ semester }] = useSchedule()
  const theme = useTheme()

  const glowOpacity = 65
  const glowOpacityHex = glowOpacity.toString(16)

  const handleChange = (e) => {
    const eventValue = e.target.value

    if (eventValue.includes('') || eventValue.length === 0) {
      dispatch({ type: 'removeFilter', payload: label })
    } else {
      const selectedMonths = filters[label] && filters[label].params.length <= 1 ? [...filters[label].params, eventValue[eventValue.length - 1]] : [eventValue[eventValue.length - 1]]
      dispatch({
        type: 'addFilter',
        payload: {
          option: label,
          input: {
            // TODO: sort months so it is not possible to select weird combos like January - September (in autumn semester)
            params: selectedMonths, // .sort((month, monthCmp) => monthMapReverse[month] - monthMapReverse[monthCmp]),
            semester
          }
        }
      })
      posthog.capture(`Used ${label} filter`)
    }
  }

  const ChangeAnimation = (
    <motion.div
      key={filters[label]}
      style={{
        border: `2px solid ${theme.palette.primary.uuRed + glowOpacityHex}`,
        borderRadius: theme.misc.borders.radius,
        boxShadow: `0px 0px 10px ${theme.palette.primary.uuRed + glowOpacityHex}, 0px 0px 20px ${theme.palette.primary.uuRed + glowOpacityHex} inset`,
        position: 'absolute',
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
    <FormControl
      sx={{ position: 'relative', opacity: 1, m: 1, minWidth: '100%', maxWidth: '100%', margin: '0' }}
      size='small'
    >
      {ChangeAnimation}
      <InputLabel>{name}</InputLabel>
      <Select
        labelId={label}
        id={label}
        value={filters[label] ? filters[label].params : []}
        label={name}
        onChange={(e) => handleChange(e)}
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
            <>
              {filters[label].params && filters[label].params[0] ? <Chip sx={{ maxHeight: '1.5rem' }} key={filters[label].params[0]} label={filters[label].params[0]} /> : null}
              -
              <Chip sx={{ maxHeight: '1.5rem' }} key={filters[label].params[1]} label={filters[label].params[1] ? filters[label].params[1] : null} />
            </>
          </Box>
        )}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {values.map((value, index) =>
          <MenuItem
            key={value + '-' + index}
            value={value}
          >
            {value}
          </MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default DropDown
