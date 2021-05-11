import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, addAlert } from '../../actions/actions';
import { Avatar, CssBaseline, Typography, Container, Grid } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 0, 3),
    // marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const initialValues = {
  id: '',
  password: ''
};

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true
  );

  useEffect(() => {
    async function checkLogin() {
      if (user.token) {
        history.goBack();
      }
    }
    checkLogin();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData));
      history.push('/');
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
        console.error(err);
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
      </div>

      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              name='id'
              label='Employee ID'
              value={formData.id}
              onChange={handleChange}
              id='id'
              required
              type='number'
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              name='password'
              label='Password'
              value={formData.password}
              onChange={handleChange}
              id='password'
              required
              type='password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='primary'
              size='large'
              label='Login'
              fullWidth
            />
          </Grid>

          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="Registration.js" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Grid>
      </Form>

      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
