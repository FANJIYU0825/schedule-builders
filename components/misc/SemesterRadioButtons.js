import { useTheme } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

/**
 * @description The radio buttons for the SemesterModal.
 * @param setSelectedLocation - Function that sets the location state.
 * @param setSelectedSemester - Function that sets the semester state.
 * @param selectedLocation - State that holds the currently selected location, i.e the specific radio selected.
 * @param selectedSemester - State that holds the currently selected semester, i.e the specific radio selected.
 */

function SemesterRadioButtons ({ setSelectedSemester, setSelectedLocation, selectedLocation, selectedSemester }) {
  const theme = useTheme()

  const handleChangeSemester = (target) => {
    setSelectedSemester(target)
  }

  const handleChangeLocation = (target) => {
    setSelectedLocation(target)
  }

  const radioStyles = {
    color: theme.palette.primary.uuRed,
    '&.Mui-checked': {
      color: theme.palette.primary.uuRed
    }
  }

  return (
    <FormControl sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <FormLabel sx={{ color: theme.palette.primary.uuRed, fontSize: 20 }}>Semester</FormLabel>
      <RadioGroup row value={selectedSemester}>
        <FormControlLabel
          value='autumn'
          label='Autumn'
          control={
            <Radio
              sx={radioStyles}
              onChange={() => handleChangeSemester('autumn')}
            />
          }
        />
        <FormControlLabel
          value='spring'
          label='Spring'
          control={
            <Radio
              sx={radioStyles}
              onChange={() => handleChangeSemester('spring')}
            />
          }
        />
      </RadioGroup>
      <FormLabel sx={{ color: theme.palette.primary.uuRed, fontSize: 20, mt: '10px' }}>Location</FormLabel>
      <RadioGroup row value={selectedLocation}>
        <FormControlLabel
          value='uppsala'
          label='Uppsala'
          control={
            <Radio
              sx={radioStyles}
              onChange={() => handleChangeLocation('uppsala')}
            />
            }
        />
        <FormControlLabel
          value='visby'
          label='Visby'
          control={
            <Radio
              sx={radioStyles}
              onChange={() => handleChangeLocation('visby')}
            />
            }
        />
      </RadioGroup>
    </FormControl>
  )
}

export default SemesterRadioButtons
