import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Import Components
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Profile from './Profile';
import Users from './Users';
import Patients from './Patients';

function Routes() {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>

			<Route path='/login'>
				<Login />
			</Route>

			<Route path='/signup'>
				<Registration />
			</Route>

			<Route path='/users'>
				<Users />
			</Route>

			<Route path='/patients'>
				<Patients />
			</Route>

			<Route path='/profile'>
				<Profile />
			</Route>


			<Redirect to='/' />
		</Switch>
	);
}

export default Routes;
