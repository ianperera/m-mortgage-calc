import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, blueGrey, blue } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#86af48'
    },
    secondary: {
      main: '#4BB5c1'
    },
    text: {
      primary: grey[800],
      secondary: grey[200]
    },
    background: {
      paper: '#f0f0f0'
    },
    divider: '#86af48'
  },
  typography: {
    fontFamily: '"Fira Sans", sans-serif'
  }
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline>
          <Component {...props} />
        </CssBaseline>
       
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
