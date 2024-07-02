import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function UploadOptionSelect ({ name, values, state, setState }) {
  const handleChange = (event) => {
    setState(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          value={state}
          label={name}
          onChange={handleChange}
        >
          <MenuItem value=''>None</MenuItem>
          {values.map((item, index) =>
            <MenuItem key={index} value={item}>{item}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

export default UploadOptionSelect
