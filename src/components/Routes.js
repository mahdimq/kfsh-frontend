import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Import Components
import Home from './Home';
import Login from '../pages/Users/Login';
import Registration from '../pages/Users/Registration';
import Users from '../pages/Users/Users';
import Admin from './Admin';
// import PatientsList from './PatientsList';
// import Patients from './Patients';
import Patients from '../pages/Patients/Patients';
import HospitalForm from '../pages/Hospital/HospitalForm';
import Procedures from '../pages/Procedures/Procedures';
import VisitForm from '../pages/Visits/VisitForm';
import ProcedureForm from '../pages/Procedures/ProcedureForm';
import Hospital from '../pages/Hospital/Hospital';
import Visits from '../pages/Visits/Visits';
import Visit from '../pages/Visits/Visit';
import VisitDetails from '../pages/Visits/VisitDetails';
import Patient from '../pages/Patients/Patient';
import TestForm from '../pages/Visits/TestForm';

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

      <Route exact path='/patients'>
        <Patients />
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

      {/* 
      <Route exact path='/procedures'>
        <Procedures/>
      </Route> */}

      <Redirect to='/' />
    </Switch>
  );
}

export default Routes;
