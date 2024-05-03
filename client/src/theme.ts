import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#5ac3f6',
        100: '#a6d5fa',
        200: '#5ac3f6',
        300: '#81bfdd',
      },
      text: {
        primary: '#000000',
        secondary: '#00000099',
        disabled: '#00000061',
      },
      background: {
        default: '#fefbee',
        paper: '#fefbee',
        100: '#fefbee',
        200: '#f2eed6',
        300: '#e5deb7',
        400: '#bebba2',
      },
    },
    typography: {
      fontFamily: '"Exo 2", sans-serif',
      h1: {
        fontSize: 36,
      },
      h2: {
        fontSize: 20,
      },
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            '&:before': {
              display: 'none',
            },
          },
          rounded: {
            borderRadius: 8,
            ':first-of-type': {
              borderRadius: 8,
            },
            ':last-of-type': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 8,
            minHeight: 0,
          },
          content: {
            alignItems: 'center',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paperAnchorBottom: {
            maxHeight: '90%',
            minHeight: '40%',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        },
      },
    },
  }),
)

declare module '@mui/material/styles' {
  interface TypeBackground {
    100: string
    200: string
    300: string
    400: string
  }
}

export default theme
