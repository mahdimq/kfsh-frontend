import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, addAlert } from '../actions/actions';

// Style Imports
import { StyledFormComp } from '../styles/StyledFormComp';
import Button from '@material-ui/core/Button';

const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const initialValues = {
		id: '',
		password: '',
		errors: []
	};

	useEffect(() => {
		async function checkLogin() {
			if (user.token) {
				history.goBack();
			}
		}
		checkLogin();
	});

	const handleSubmit = async (data) => {
		try {
			await dispatch(loginUser(data));
			history.push('/');
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
				console.error(err);
			});
		}
	};

	return (
		<StyledFormComp>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form>
				<Field className='input-box' placeholder='Employee ID' name='id' type="number"/>
          <ErrorMessage name='id' />

          <Field className='input-box' placeholder='Password' name='password' type='password' />
          <ErrorMessage name='password' />

					<div className='button-group'>
						<Button
							variant='contained'
							size='large'
							color='secondary'
							className='profile-btn'
							type='submit'>
							Login
						</Button>

					</div>
				</Form>
			</Formik>
		</StyledFormComp>
	);
};

export default Login;
