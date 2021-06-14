import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Import Components
import Home from './Home';
import Login from '../pages/Users/Login';
import Registration from '../pages/Users/Registration';
import Users from '../pages/Users/Users';
import Admin from './Admin';
import Patients from '../pages/Patients/Patients';
import VisitForm from '../pages/Visits/VisitForm';
import Hospital from '../pages/Hospital/Hospital';
import Visits from '../pages/Visits/Visits';
import Visit from '../pages/Visits/Visit'
import VisitDetails from '../pages/Visits/VisitDetails';
import Patient from '../pages/Patients/Patient';
import ReportForms from '../pages/Hospital/ReportForms';
import PatientForm from '../pages/Patients/PatientForm';

function Routes({user}) {
  
  // const {users} = useSelector((state) => state.users);
  // const state = useSelector(state => state.hospital)
  // const dispatch = useDispatch();


  // const fetchData = async() => {
  //   try {
  //     await dispatch(loadHospitalData())
  //     await dispatch(fetchUsers())
  //   } catch (error){
  //     await dispatch(addAlert(error, 'error'))
  //   }
  // }
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     await dispatch(loadHospitalData())
  //   //     await dispatch(fetchUsers())
  //   //   } catch (error){
  //   //     await dispatch(addAlert(error, 'error'))
  //   //   }
  //   // }
  //   fetchData()
    
  // }, [])

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/admin'>
        <Admin />
      </Route>

      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/hospital'>
        <Hospital />
      </Route>

      <Route path='/signup'>
        <Registration />
      </Route>

      <Route path='/users'>
        <Users />
      </Route>

      <Route exact path='/patients'>
        <Patients/>
      </Route>

      <Route exact path='/patients/:mrn'>
        <Patient />
      </Route>

      <Route exact path='/visits'>
        <Visits />
      </Route>

      <Route exact path='/visits/:log'>
        <Visit />
      </Route>

      <Route exact path='/other'>
        <VisitDetails />
      </Route>

      <Route exact path="/reports">
        <ReportForms />
      </Route>

      <Route exact path="/addpatient">
        <PatientForm />
      </Route>

      <Route exact path="/:mrn/addvisit">
        <VisitForm/>
      </Route>

      <Route exact path="/hospitaldata">
        <Hospital user={user}/>
      </Route>

      <Redirect to='/' />
    </Switch>
  );
}

export default Routes;
