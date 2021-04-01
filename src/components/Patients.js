import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

// import Table Styles
import "../styles/Patients.css"

function Patients() {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patient);

  useEffect(
    () => {
      async function getPatients() {
        await dispatch(getAllPatients());
        setIsLoaded(true);
      }
      getPatients();
    },
    [ dispatch ]
  );

  if (!isLoaded) {
    return <Spinner />;
  }

  // Helper function to calculate formatted date
  const formatDate = (date) => {
    // NEED TO ADD DATE FORMATTER IN HERE
    let d = new Date(date).toLocaleDateString();
    return d;
  };

  // Helper function to calculate age
  const age = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const patientTable = patients.map((p) => (
    <tr key={p.mrn}>
      <td>{p.mrn}</td>
      <td>{p.firstname}</td>
      <td>{p.middlename}</td>
      <td>{p.lastname}</td>
      <td>{p.gender}</td>
      <td>{formatDate(p.dob)}</td>
      <td>{age(p.dob)}</td>
      <td>{p.age_group}</td>
      <td>{p.nationality}</td>
    </tr>
  ));

  
  return (
    <div style={{margin: '1em'}}>
      <h1 className="patients-title"> Patients</h1>
      <table className="patients-table">
        <tbody>
          <th>MRN</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Age Group</th>
          <th>Nationality</th>
          {patientTable}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
