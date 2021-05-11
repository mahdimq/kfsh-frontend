import React, { useState, useEffect } from 'react';
import { fetchUsers, loadHospitalData } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

// Import Users Table Styles
import "../styles/Users.css"

// ADMIN COMPONENT ONLY
function Users() {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  // const { locations, departments, tests } = useSelector((state) => state.data);
  const data = useSelector((state) => state.data);

  console.log("LOCATIONS< DEPARTMENTS< TESTS: ", data)

  // useEffect(
  //   ()=> {
  //     async function getData(){
  //       await dispatch(loadHospitalData());
  //       setIsLoaded(true);
  //     }
  //     getData();
  //   },
  //   [dispatch]
  // )

  useEffect(
    () => {
      async function getUsers() {
        await dispatch(fetchUsers());
        setIsLoaded(true);
      }
      getUsers();
    },
    [ dispatch ]
  );

  if (!isLoaded) {
    return <Spinner />;
  };


  const usersTable = users.map((u) => (
    <tr key={u.id}>
      <td>{u.id}</td>
      <td>{u.firstname}</td>
      <td>{u.lastname}</td>
      <td>{JSON.stringify(u.is_admin)}</td>
    </tr>
  ));

  return (
    <div style={{margin: '1em'}}>
      <h1 className="users-title">Neurophysiology Technologists</h1>
      <table className="users-table">
        <tbody>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Admin Status</th>
          {usersTable}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
