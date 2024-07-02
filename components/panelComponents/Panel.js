import { Stack } from '@mui/material'

/**
 * @description Component that can expand or collapse and has a panel button to its right side, left side, or no button, dependent if its location is "left", "right", or "middle".
 *
 * @param children - The child components which will be the panel's content.
 *
*/
function Panel ({ children }) {
  return (
    <Stack
      direction='column'
      flexShrink={1}
      flexGrow={1}
      sx={{
        width: '100%',
        paddingTop: '1.2rem',
        paddingX: '1.2rem',
        backgroundColor: 'white'
      }}
    >
      {children}
    </Stack>
  )
}

export default Panel
