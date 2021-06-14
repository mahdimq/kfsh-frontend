import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decode } from 'jsonwebtoken';
import { getUserData, fetchAllVisits } from './actions/actions';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';

// Import Components
import Alerts from './components/Alerts';
import Routes from './components/Routes';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useFetchHook } from './hooks/useFetch';

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
      // default: '#f4f5fd'
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
  const [ infoLoaded, setInfoLoaded ] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  // const [ loading ] = useFetchHook(fetchAllVisits());
  const { visits } = useSelector((state) => state.patients);

  /*Check if user is logged in, load token from localstorage
    and save in state if available */
  useEffect(
    () => {
      async function checkUser() {
        const token = localStorage.getItem('user-token') || null;
        if (token) {
          const { firstname, id, is_admin } = decode(token);
          // setUser({ firstname, id, is_admin, token });
          await dispatch(getUserData(token, firstname, id, is_admin));
          await dispatch(fetchAllVisits())
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
      {/* {!loading && ( */}
        <div>
          <Navbar visits={visits} />
          <Alerts />
          <Routes user={user} />
        </div>
      {/* )} */}
    </ThemeProvider>
  );
}

export default App;
