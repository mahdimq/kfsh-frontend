import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/actions';
import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  Card,
  CardContent,
  MenuItem
} from '@material-ui/core';

// Import logos
import kfshLogo from '../images/kfshLogo.png';

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    // transform: 'translateZ(0)',
    padding: theme.spacing(0, 5)
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    maxWidth: '120px',
    padding: theme.spacing(0.75),
    // marginRight: theme.spacing(2),
    cursor: 'pointer'
  },
  icon: {
    padding: 0
  },
  desktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  mobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  mobileName: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState(null);

  // const [search, setSearch] = useState('');
  // const navLinks = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSupportMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  async function handleLogout() {
    await dispatch(logoutUser());
    localStorage.removeItem('user-token');
    history.push('/');
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const supportCard = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Support
            </Typography>
            <Typography variant='body1'>Muhammad Qadir</Typography>
            <Typography variant='body2' className={classes.pos} color='textSecondary'>
              0540540672
            </Typography>
          </CardContent>
        </Card>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = () => {
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}>

        {user.token && (
          <MenuItem>
            <Typography variant='h6' className={classes.mobileName} noWrap>
              Hello {user.firstname},
            </Typography>
          </MenuItem>
        )}

      {/* Support Card */}
        <MenuItem>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Support
              </Typography>
              <Typography variant='body1'>Muhammad Qadir</Typography>
              <Typography variant='body2' className={classes.pos} color='textSecondary'>
                0540540672
              </Typography>
            </CardContent>
          </Card>
        </MenuItem>

      {/* Users & Admin icons */}
        {user.token &&
        user.is_admin && (
          <>
            <MenuItem>
              <IconButton className={classes.icon} aria-label='Users'>
                <GroupIcon />
              </IconButton>
              <Button size='small'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/users'>
                  Users
                </Link>
              </Button>
            </MenuItem>

            <MenuItem>
              <IconButton className={classes.icon} aria-label='Admin Menu'>
                <SettingsIcon />
              </IconButton>
              <Button size='small'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin'>
                  Admin Menu
                </Link>
              </Button>
            </MenuItem>
          </>
        )}

      {/* Patients, Login/Logout Icons */}
        {user.token ? (
        <>
          <MenuItem>
          <IconButton className={classes.icon} aria-label='Patients'>
            <LocalHospitalIcon fontSize='small' />
          </IconButton>
          <Button>
            <Link style={{ textDecoration: 'none', color: 'black' }} to='/patients'>
              Patients
            </Link>
          </Button>
        </MenuItem>

          <MenuItem>
            <IconButton className={classes.icon} aria-label='Logout'>
              <ExitToAppIcon />
            </IconButton>
            <Button size='small' onClick={handleLogout}>
              Logout
            </Button>
          </MenuItem>
        </>
        ) : (
          <MenuItem>
            <IconButton className={classes.icon} aria-label='Login'>
              <PowerSettingsNewIcon />
            </IconButton>
            <Button size='small'>
              <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'>
                Login
              </Link>
            </Button>
          </MenuItem>
        )}
      </Menu>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <Grid container alignItems='center'>
            <Box edge='start' className={classes.logo}>
              <Link to='/'>
                <img src={kfshLogo} alt='logo' className={classes.logo} />
              </Link>
            </Box>

            <Grid item className={classes.grow} />

            {/* DESKTOP SECTION */}

            <Grid item className={classes.desktop}>
              {user.token && (
                <Link to='/patients'>
                  <IconButton aria-label='add patient'>
                    <LocalHospitalIcon fontSize='small' />
                  </IconButton>
                </Link>
              )}

              {user.token &&
              user.is_admin && (
                <>
                  <Link to='/users'>
                    <IconButton aria-label='Users'>
                      <GroupIcon fontSize='small' />
                    </IconButton>
                  </Link>

                  <Link to='/admin' style={{ textDecoration: 'none', color: 'black' }}>
                    <IconButton aria-label='Admin Menu'>
                      <SettingsIcon fontSize='small' />
                    </IconButton>
                  </Link>
                </>
              )}

              {/* Support button  */}
              <IconButton onClick={handleSupportMenuOpen} aria-label='Settings'>
                <HelpIcon fontSize='small' />
              </IconButton>

              {/* Show user custom buttons */}
              {user.token ? (
                <IconButton onClick={handleLogout} aria-label='Admin Menu'>
                  <ExitToAppIcon fontSize='small' />
                </IconButton>
              ) : (
                <Link to='/login'>
                  <IconButton>
                    <PowerSettingsNewIcon fontSize='small' />
                  </IconButton>
                </Link>
              )}

              {supportCard}
            </Grid>

            {/* Hamburger icon */}
            <div className={classes.mobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}>
                <MenuIcon />
              </IconButton>
            </div>
          </Grid>
        </Toolbar>

        {/* MOBILE SECTION */}
  
        {renderMobileMenu(user.firstname)}
      </AppBar>
    </div>
  );
}
