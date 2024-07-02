import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import SearchField from './SearchField'
import { getUniqueValuesByKey, isObjectEmpty } from '../../utils/utility.js'
import { useEffect, useState } from 'react'
import { useCourses, useFilters } from '../../utils/hooks'
import { InputAdornment } from '@mui/material'
import styles from '../../styles/filters.module.css'

/**
 * @description Free text search component that the user can search for course names in. It will filter
 * the searched courses after every added or removed search letter.
 *
 * @param {string} label - The default label text inside the search field.
 *
*/
function FreeTextSearch ({ label }) {
  const [{ courses }] = useCourses()
  const courseNames = getUniqueValuesByKey('name', courses)
  const [{ filters }, dispatch] = useFilters()
  const [value, setValue] = useState(null)

  const handleChange = (value) => {
    setValue(value)
    if (value === null || value === '') {
      dispatch({ type: 'removeFilter', payload: label })
    } else {
      dispatch({ type: 'addFilter', payload: { option: label, input: [value] } })
    }
  }

  useEffect(() => {
    if (isObjectEmpty(filters)) {
      setValue('')
    }
  }, [filters])

  const shrink = value !== ''

  return (
    <>
      <SearchField
        disablePortal
        freeSolo
        onChange={(_, value) => handleChange(value)}
        options={courseNames}
        value={value}
        renderInput={params =>
          <TextField
            onChange={(e) => handleChange(e.target.value)}
            {...params}
            label='Search for courses...'
            InputLabelProps={{
              shrink,
              className: shrink ? '' : styles.transformInputLabel
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />}
      />
    </>
  )
}

export default FreeTextSearch
