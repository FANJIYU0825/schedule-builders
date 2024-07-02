import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'

const WIDTH = '100%'

const SearchField = styled(Autocomplete)(() => ({
  width: WIDTH
}))

export default SearchField
