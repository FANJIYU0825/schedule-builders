import { createTheme } from '@mui/material/styles'

export const landingTheme = createTheme({
  palette: {
    primary: {
      main: '#990000',
      hover: '#c21000',
      text: '#383838'
    },
    secondary: {
      main: '#BEBEBE',
      darker: 'text.secondary'
    },
    third: {
      main: '#fff'
    },
    accent: {
      main: '#990000'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          zIndex: 4000
        }
      },
      defaultProps: {
        disableRipple: true
      }
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          borderColor: 'green'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Gill Alt One MT',
    fontWeight: 300,
    title: {
      fontSize: 42
    },
    titleSmaller: {
      fontSize: 28
    },
    tutorialText: {
      fontSize: 19
    },
    subheading: {
      fontSize: 15
    },
    subtitle: {
      fontSize: 18
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1350,
      xl: 1536
    }
  },
  misc: {
    borders: {
      radius: 0
    }
  }
})
