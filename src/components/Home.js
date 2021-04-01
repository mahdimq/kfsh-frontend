import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';

import Button from '@material-ui/core/Button';
import '../styles/Home.css';
import { getPatient } from '../actions/actions';
import PatientInfo from './PatientInfo';

function Home() {
	const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
	const patient = useSelector(state => state.patient)

	const searchPatient = async (mrn) => {
		try {
			await dispatch(getPatient(mrn))
			
		} catch (err){
			console.error(err);
		}
	}

	console.log("PATIENT IN HOME: ", patient)

  return (
    <section className='hero background-image'>
      <Search callback={searchPatient} />
			<PatientInfo data={patient.patient}/>
      <div className='hero-content-area'>
        <h1>KFSH Neurophysiology</h1>
        <h3>Patient Data. Simplified.</h3>

        {
          user.token ? <h3>Welcome Back {user.firstname}!</h3> :
          <Button
            onClick={() => history.push('/login')}
            variant='contained'
            size='large'
            color='primary'
            className='profile-btn btn'
          >
            Login
          </Button>}
      </div>
    </section>
  );
}
export default Home;
