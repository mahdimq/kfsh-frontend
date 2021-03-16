import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';
import userContext from './userContext';
import PatientInfo from './components/PatientInfo';
import Procedures from './components/Procedures';

function App() {
	const [user, setUser] = useState(null);

	return (
		<div className='App'>
			<BrowserRouter>
				<userContext.Provider value={{ user, setUser }}>
					<header className='App-header'>
						KFSH NEUROPHYSIOLOGY DATABASE
						{/* <Login /> */}
						{/* <PatientInfo /> */}
						<Procedures />
					</header>
				</userContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
