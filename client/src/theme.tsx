import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export default responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#f2eed6',
            },
            secondary: {
                main: '#5ac3f6',
            },
            text: {
                primary: '#000000',
            },
            background: {
                default: '#fefbee',
                paper: '#fefbee',
            },
        },
        typography: {
            fontFamily: '"Exo 2", sans-serif',
        },
    }),
)
