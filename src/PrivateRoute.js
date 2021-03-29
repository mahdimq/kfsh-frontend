import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import userContext from './userContext';

function PrivateRoute({ exact, path, children }) {
	const { user } = useContext(userContext);

	if (!user) {
		return <Redirect to='/login' />;
	}

	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
}

export default PrivateRoute;
