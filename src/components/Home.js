import React from 'react';
import { useHistory } from 'react-router-dom';
import {  useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

function Home() {
	const history = useHistory();
	const user = useSelector((state) => state.user);

	return (
		<div style={{textAlign: "center"}}>
				<h1>KFSH Neurophysiology</h1>
				<h2>Patient Data. Simplified.</h2>

				  {user.token ?
					 <h3>Welcome Back {user.firstname}!</h3> 
				 : (

					<Button
					style={{ marginLeft: '0.8em' }}
					onClick={() => history.push('/login')}
					variant='contained'
					size='large'
					color='primary'
					className='profile-btn'>
					Login
				</Button>
				 )}

			</div>
		
	);
}
export default Home;
