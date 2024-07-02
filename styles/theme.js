import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#383838', // Dark grey
      mainBrighter: '#545454', // Brighter dark grey
      hover: '#c21000', // Red
      uuRed: '#990000', // Uppsala University red
      uuRedHover: '#880000' // Uppsala University red hover
    },
    secondary: {
      main: '#BEBEBE', // Light grey
      light: '#E6E6E6', // Lighter grey
      shadow: '#D9D9D9', // Shadow grey
      darker: 'text.secondary' // Darker grey
    },
    third: {
      main: '#fff' // White
    },
    accent: {
      main: '#990000', // Uppsala University red, TODO: replace uuRed with this
      link: '#0288d1' // Blue
    }
  },
  typography: {
    fontFamily: 'Gill Alt One MT',
    fontWeight: 400,
    title: {
      fontSize: 20
    },
    scheduleTitle: {
      smaller: {
        fontSize: 30
      },
      fontSize: 42
    },
    subheading: {
      fontSize: 15,
      textTransform: 'uppercase'
    },
    subheadingSmall: {
      fontSize: 13
    },
    helptext: {
      fontSize: 12
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Berling'
    },
    subtitleSemester: {
      fontSize: 18,
      fontFamily: 'Berling'
    },
    courseCode: {
      // Course code has different font since Gill Sans number 1 looks like the letter 'i'
      fontSize: 14,
      fontFamily: 'Helvetica'
    },
    courseCodeSmall: {
      fontSize: 11
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
      // MUI standard is 4px
      radius: '4px',
      largeRadius: '10px'
    }
  }

})
