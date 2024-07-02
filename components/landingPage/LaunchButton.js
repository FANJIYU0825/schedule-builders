import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function LaunchButton ({ setLoadingPage, location }) {
  const router = useRouter()

  const handleRoute = () => {
    setLoadingPage(true)
    router.push('/app')
  }

  return (
    <Button
      variant='contained'
      onClick={handleRoute}
      sx={location === 'nav' ? { mr: '50px' } : {}}
      endIcon={location === 'tutorial' && <ArrowForwardIcon />}
    >
      Launch App
    </Button>
  )
}

export default LaunchButton
