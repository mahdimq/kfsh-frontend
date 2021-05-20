import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '../hooks/controls/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4)
  },
  button: {
    marginRight: theme.spacing(3)
  }
}));

function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        component={Link}
        to={`/signup`}
        className={classes.button}
        label='Add New User'
        variant='outlined'
      />

      <Button
        component={Link}
        to={`/users`}
        className={classes.button}
        label='Get All Users'
        variant='outlined'
      />

      <Button
        component={Link}
        to={`/hospital`}
        className={classes.button}
        label='Hospital Form'
        variant='outlined'
      />
    </div>
  );
}

export default Admin;
