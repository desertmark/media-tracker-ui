import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#EEEEEE',
        },
        info: pink,
        text: {
            secondary: "#FFFFFF"
        }
    },
    overrides: {
        MuiDivider: {
            light: {
                backgroundColor: '#EEEEEE'
            }
        }
    }
});

export default function AppTheme({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}