import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
    margin: theme.spacing(0.5, 0, 0)
  }
}))

export default function Button({ label, onClick, variant, color, size, ...other }) {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      onClick={onClick}
      color={color || 'primary'}
      size={size || 'medium'}
      {...other}
      classes={{root: classes.root}}>
      {label}
    </MuiButton>
  );
}
