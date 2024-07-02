import { Button, styled } from '@mui/material'

const NavButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.subtitle.fontSize,
  fontWeight: theme.typography.fontWeight,
  color: theme.palette.primary.text,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline #CCCCCC',
    textDecorationThickness: '6px',
    textUnderlineOffset: '10px'
  },
  textTransform: 'none'
}))

export default NavButton
