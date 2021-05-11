import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decode } from 'jsonwebtoken';
import { getUserData } from './actions/actions';
import userContext from './userContext';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';

// Import Components
import Alerts from './components/Alerts';
import Routes from './components/Routes';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  // shape: {
  //   borderRadius: "50%"
  // },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  }
  // props: {
  //   MuiIconButton: {
  //     disableRipple: true
  //   }
  // }
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '220px'
  }
});

function App() {
  const classes = useStyles();
  const [ infoLoaded, setInfoLoaded ] = useState(false);
  const [ user, setUser ] = useState(null);
  const dispatch = useDispatch();

  /*Check if user is logged in, load token from localstorage
    and save in state if available */
  useEffect(
    () => {
      async function checkUser() {
        const token = localStorage.getItem('user-token') || null;
        if (token) {
          const { firstname, id, is_admin } = decode(token);
          setUser({ firstname, id, is_admin, token });
          await dispatch(getUserData(token, firstname, id, is_admin));
        }
        setInfoLoaded(true);
      }
      checkUser();
    },
    [ dispatch ]
  );

  if (!infoLoaded) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <userContext.Provider value={user}>
          <Navbar />
          <Alerts />
          <Routes />
        </userContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
