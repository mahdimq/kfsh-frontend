import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decode } from 'jsonwebtoken';
import { getUserData } from './actions/actions';
import userContext from "./userContext"

// Import Components
import Alerts from './components/Alerts';
import Routes from './components/Routes';
import Header from './components/Header';
import Spinner from './components/Spinner';

// Styled components
// import { GlobalStyle } from './styles/GlobalStyles';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [user, setUser] = useState(null)
	const dispatch = useDispatch();

	/*Check if user is logged in, load token from localstorage
    and save in state if available */
	useEffect(() => {
		async function checkUser() {
			const token = localStorage.getItem('user-token') || null;
			if (token) {
				const { firstname, id, is_admin } = decode(token);
				setUser({firstname, id, is_admin, token })
				await dispatch(getUserData(token, firstname, id, is_admin));
			}
			setInfoLoaded(true);
		}
		checkUser();
	}, [dispatch]);

	if (!infoLoaded) {
		return <Spinner />;
	}

	return (
		<div>
			<userContext.Provider value={user}>
			<Header />
			<Alerts /> 
			<Routes />
			</userContext.Provider>
		</div>
	);
}

export default App;
