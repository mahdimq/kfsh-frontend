import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number, boolean } from 'yup';
import { registerUser, addAlert } from '../actions/actions';

// Import Styles
import { StyledFormComp } from '../styles/StyledFormComp';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const initialValues = {
  id: '',
  password: '',
  firstname: '',
  lastname: '',
  is_admin: false,
  errors: []
};

const validationSchema = object().shape({
  id: number().required().min(4),
  password: string().required().min(4),
  firstname: string().required(),
  lastname: string().required(),
  is_admin: boolean().required(false)
});

const Registration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ toggle, setToggle ] = useState(true);

  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  // 	const checkRegistration = async () => {
  // 		if (user.token ) {
  // 			history.push('/patients');
  // 		}
  // 	};
  // 	checkRegistration();
  // });


  const handleToggle = () => {
		setToggle(checked => !checked);
  };

  const handleSubmit = async (data) => {
    try {
      await dispatch(registerUser(data));
      history.push('/');
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
  };

  return (
    <StyledFormComp>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Field className='input-box' placeholder='Employee ID' name='id' type='number' />
          <ErrorMessage name='id' />

          <Field className='input-box' placeholder='Password' name='password' type='password' />
          <ErrorMessage name='password' />

          <Field className='input-box' placeholder='First Name' name='firstname' type='text' />
          <Field className='input-box' placeholder='Last Name' name='lastname' type='text' />

          <div className='input-box'>
            <FormControlLabel
              label='Admin Account: '
              control={<Switch checked={!toggle} type="checkbox" onChange={handleToggle} name='is_admin' />}
            />
          </div>

          <div className='button-group'>
            <Button variant='contained' size='large' color='secondary' className='profile-btn' type='submit'>
              Signup
            </Button>
            {/* <Button
              onClick={() => history.push('/login')}
              variant='contained'
              size='large'
              color='primary'
              className='profile-btn'
              style={{ marginLeft: '0.8em' }}
            >
              Login
            </Button> */}
          </div>
        </Form>
      </Formik>
    </StyledFormComp>
  );
};

export default Registration;
