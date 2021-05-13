import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Import Components
import Home from './Home';
import Login from '../pages/Users/Login';
import Registration from '../pages/Users/Registration';
import Profile from './Profile';
import Users from '../pages/Users/Users';
import Admin from './Admin';
// import PatientsList from './PatientsList';
// import Patients from './Patients';
import Patients from '../pages/Patients/Patients';
import HospitalForm from '../pages/Hospital/HospitalForm';
import Procedures from '../pages/Procedures/Procedures'
import VisitForm from '../pages/Patients/VisitForm';
import ProcedureForm from '../pages/Procedures/ProcedureForm';
import Hospital from '../pages/Hospital/Hospital';
import Visits from '../pages/Patients/Visits'

function Routes() {
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

      <Route path='/patients'>
        {/* <PatientsList /> */}
        <Patients/>
      </Route>

      <Route exact path='/visits/:mrn'>
        <Visits/>
      </Route>

      <Route exact path='/procedures'>
        <Procedures/>
      </Route>

      <Route path='/profile'>
        <Profile />
      </Route>

      <Redirect to='/' />
    </Switch>
  );
}

export default Routes;
