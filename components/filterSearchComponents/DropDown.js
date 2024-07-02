import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material'
import { useFilters } from '../../utils/hooks'
import posthog from 'posthog-js'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

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
  const theme = useTheme()

  const glowOpacity = 65
  const glowOpacityHex = glowOpacity.toString(16)

  const handleChange = (e) => {
    const eventValue = e.target.value

    if (eventValue.includes('') || eventValue.length === 0) {
      dispatch({ type: 'removeFilter', payload: label })
    } else {
      dispatch({ type: 'addFilter', payload: { option: label, input: eventValue } })
      posthog.capture(`Used ${label} filter`)
    }
  }

  const maxTags = 2

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
        value={filters[label] ? filters[label] : []}
        label={name}
        onChange={handleChange}
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
            {selected.map((value, index) => (
              <>
                {index < maxTags || selected.length == maxTags + 1 ? <Chip sx={{ maxHeight: '1.5rem' }} key={value} label={value} /> : null}
                {index == maxTags && selected.length != maxTags + 1 ? <Chip sx={{ maxHeight: '1.5rem' }} key={value} label={`+${selected.length - maxTags} more`} /> : null}
              </>
            ))}
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
