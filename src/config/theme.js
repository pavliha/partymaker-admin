export default {
  typography: {
    useNextVariants: true,
  },

  palette: {
    primary: {
      light: '#D404DC',
      main: '#9306BC',
      dark: '#9306BC',
    },

    secondary: {
      main: '#282828',
    },

    error: {
      main: '#D6000A',
    },
  },

  overrides: {
    MuiTableCell: {
      root: {
        '&$paddingNone': {
          '&last-child': {
            padding: 'inherit'
          }
        }
      },
      paddingNone: {
        '&last-child': {
          padding: 'inherit'
        }
      }
    }
  }
}
