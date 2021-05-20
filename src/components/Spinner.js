import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    top: '30%',
    left: '50%',
    // justifyContent: 'center',
    // alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={80} color="secondary" thickness={2.5}/>
    </div>
  );
}