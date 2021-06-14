import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, addAlert } from '../../actions/actions';

import {
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  Container,
  Box
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Checkbox from '../../hooks/controls/Checkbox';
import Button from '../../hooks/controls/Button';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main
    backgroundColor: '#253053'
  }
}));

const initialValues = {
  id: '',
  password: '',
  firstname: '',
  lastname: '',
  is_admin: false
};

export default function SignUp({ addOrEdit, recordForEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.users)

  const validation = (fieldValues = formData) => {
    const temp = { ...errors };
    if ('id' in fieldValues)
      temp.id = formData.id.length !== 0 ? '' : 'Employee ID is required';
    if ('firstname' in fieldValues)
      temp.firstname = formData.firstname ? '' : 'First Name is required';
    if ('lastname' in fieldValues)
      temp.lastname = formData.lastname ? '' : 'Last Name is required';
    if ('password' in fieldValues)
      temp.password =
        formData.password.length > 4 ? '' : 'Password should be more than 4 characters';

    setErrors({ ...temp });
    if (fieldValues === formData) return Object.values(temp).every((i) => i === '');
  };

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true,
    validation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        // addOrEdit(formData, handleReset);
        await dispatch(registerUser(formData));
      } catch (err) {
        dispatch(addAlert(err, 'error'));
      }
      handleReset();
      history.push('/users');
    }
  };

  {
    if (!user.token)
      return (
        <div className={classes.paper}>
          <Typography variant='h4' align='center' gutterBottom>
            Please login to add a new user
          </Typography>
          <Button
            label='Login'
            size='large'
            color='secondary'
            onClick={() => history.push('/login')}
          />
        </div>
      );
  }

  return (
    <Container component='main' maxWidth='xs'>
      {user.token && !user.is_admin ? (
        <div style={{margin: '2em', textAlign: "center"}}>
          <Typography variant='h4' component='div'>
            Unauthorized. Admin privelages required!
          </Typography>
          <Button label="Home" onClick={() => history.push('/')} size="large" color="secondary" variant="contained" />
        </div>
      ) : (
        <React.Fragment>
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
          </div>

          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name='firstname'
                  label='First Name'
                  value={formData.firstname}
                  onChange={handleChange}
                  id='firstname'
                  required
                  error={errors.firstname}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  name='lastname'
                  label='Last Name'
                  value={formData.lastname}
                  onChange={handleChange}
                  id='lastname'
                  required
                  error={errors.lastname}
                />
              </Grid>

              {recordForEdit ? null : (
                <Grid item xs={12}>
                  <Input
                    name='id'
                    label='Employee ID'
                    value={formData.id}
                    onChange={handleChange}
                    id='id'
                    required
                    type='number'
                    error={errors.id}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Input
                  name='password'
                  label='Password'
                  value={formData.password}
                  onChange={handleChange}
                  id='password'
                  required
                  type='password'
                  error={errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <Checkbox
                  name='is_admin'
                  label='Admin Account'
                  value={formData.is_admin}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  type='submit'
                  fullWidth
                  variant='outlined'
                  color='primary'
                  size='large'
                  label='Sign Up'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  size='large'
                  label='Reset'
                  variant='outlined'
                  onClick={handleReset}
                  color='secondary'
                />
              </Grid>
            </Grid>
          </Form>
        </React.Fragment>
      )}
    </Container>
  );
}
