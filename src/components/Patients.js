import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

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
  };

console.log("PATIENTS: ", patients)
  return (
    
    <table style={{border: "solid black 1px", margin: "2em auto"}}>
      {patients.map((u) => (
        <tr style={{ padding: "0.5em",border: 'solid black 1px' }} key={u.id}>
          <td style={{ padding: "0.5em", border: 'solid black 1px' }}>{u.id}: </td>
          <td style={{ padding: "0.5em", border: 'solid black 1px' }}>
            {u.firstname} {u.lastname}
          </td>
          <td style={{ border: 'solid black 1px' }}>Admin: {JSON.stringify(u.is_admin)}</td>
        </tr>
      ))}
    </table>
  )
}

export default Patients;
