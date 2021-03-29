import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addAlert, updateUser, removeUser, getUserInfo } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string} from 'yup';

// Import Styles
import { StyledFormComp } from '../styles/StyledFormComp';
import Button from '@material-ui/core/Button';

const initialValues = {
	id: '',
	password: '',
	firstname: '',
	lastname: ''
};

const validationSchema = object().shape({
	password: string().required()
});

const Profile = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [userData, setUserData] = useState(initialValues);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const checkUser = async () => {
			if (user.token) {
				const userBio = await dispatch(getUserInfo(user.id));
				setUserData(userBio.payload);
			} else {
				dispatch(addAlert('Please login first'));
				history.push('/login');
			}
		};
		checkUser();
	}, [history, dispatch, user.token, user.id]);

	const savedValues = {
		password: '',
		firstname: userData.firstname || '',
		lastname: userData.lastname || ''
	};

	const handleSubmit = async (data) => {
		try {
			await dispatch(updateUser(user.id, data));
			setIsVisible(false);
		} catch (error) {
			console.error(error);
		}
	};

	// Delete the user and remove token from localstorage
	// then redirect user to homepage
	async function deleteUser() {
    if (!user.is_admin) {
      await dispatch(addAlert(`You need ADMIN PRIVELAGES to delete ${user.firstname}`));
    } else {
      localStorage.removeItem('user-token');
      await dispatch(removeUser(user.id, user.token));
      dispatch(addAlert('user deleted!'));
      history.push('/');
    }
	}

	return (
		<StyledFormComp>
			{!isVisible && (
				<>
					<h3>
						First Name: <span>{user.firstname}</span>
					</h3>
					<h3>
						Last Name: <span>{user.lastname}</span>
					</h3>
					

					<Button
						variant='contained'
						size='large'
						color='secondary'
						onClick={() => setIsVisible(true)}
						className='profile-btn'>
						Edit Profile
					</Button>
				</>
			)}
			{isVisible && (
				<>
					<Formik
						initialValues={savedValues || initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize>
						<Form>
							<Field className='input-box' placeholder='First Name' name='firstname' type='text' />
							<Field className='input-box' placeholder='Last Name' name='lastname' type='text' />

							<Field
								className='input-box'
								placeholder='Please enter password to update profile'
								name='password'
								type='password'
							/>
							<ErrorMessage name='password' />
							<div className='button-group'>
								<div className='btn-col'>
									<Button
										className='profile-btns'
										variant='contained'
										size='large'
										color='primary'
										type='submit'>
										Update
									</Button>

									<Button
										className='profile-btns'
										variant='contained'
										size='large'
										color='secondary'
										onClick={() => setIsVisible(false)}>
										Cancel
									</Button>
								</div>

								<Button
									onClick={deleteUser}
									className='profile-btns'
									variant='contained'
									size='large'
									color='default'>
									Delete
								</Button>
							</div>
						</Form>
					</Formik>
				</>
			)}
		</StyledFormComp>
	);
};

export default Profile;
