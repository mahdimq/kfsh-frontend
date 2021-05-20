import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Container } from '@material-ui/core';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const patient = useSelector((state) => state.patient);

  // const searchPatient = async (mrn) => {
  // 	try {
  // 		await dispatch(getPatient(mrn))

  // 	} catch (err){
  // 		console.error(err);
  // 	}
  // }
  return (
    <Container component='main' maxWidth='xs'>
      {/* <Search callback={searchPatient} /> */}
      {/* <PatientInfo data={patient.patient}/> */}
      <div style={{ color: 'slategray', textAlign: 'center' }}>
        <h1>KFSH Neurophysiology</h1>
        <h2>Clinical Data Management</h2>
        <h2>Intuitive. Beautiful. Simple.</h2>
      </div>

      {user.token ? (
        <h3 style={{ color: 'blue', textAlign: 'center' }}>Welcome Back {user.firstname}!</h3>
      ) : (
        <Button
          onClick={() => history.push('/login')}
          variant='contained'
          size='large'
          color='primary'
          className='profile-btn btn'>
          Login
        </Button>
      )}
    </Container>
  );
}
export default Home;
