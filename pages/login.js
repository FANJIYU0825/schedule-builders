import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MainButton from '../components/misc/MainButton'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'

function Login () {
  return (
    <ThemeProvider theme={theme}>
      <Stack width='100vw' height='100vh' alignItems='center'>
        <Stack width='18rem' height='100vh' textAlign='center' pt='8%' gap={2}>
          <h1>Login</h1>
          <p>To access this page, you must be logged in. Contact the administrator for more information.</p>
          <TextField id='username' label='Username' variant='outlined' />
          <TextField id='password' label='Password' variant='outlined' />
          <MainButton sx={{ width: 'auto', height: 'auto' }} variant='contained' color='primary'>Login</MainButton>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default Login
