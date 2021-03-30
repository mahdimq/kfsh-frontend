import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

// ADMIN COMPONENT ONLY
function Users() {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

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


  return (
    <table style={{border: "solid black 1px", margin: "2em auto"}}>
      {users.map((u) => (
        <tr style={{ padding: "0.5em",border: 'solid black 1px' }} key={u.id}>
          <td style={{ padding: "0.5em", border: 'solid black 1px' }}>{u.id}: </td>
          <td style={{ padding: "0.5em", border: 'solid black 1px' }}>
            {u.firstname} {u.lastname}
          </td>
          <td style={{ border: 'solid black 1px' }}>Admin: {JSON.stringify(u.is_admin)}</td>
        </tr>
      ))}
    </table>
  );
}

export default Users;
