import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { addAlert, fetchUsers } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "./Spinner";


function Users() {
  // const {token, is_admin} = useContext(userContext);
const history = useHistory();
const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	// const users = useSelector((state) => state.users);
  const [things, setThings] = useState(null)

  console.log("USER: ", user.token)
	// Confirm if logged in, if so confirm correct user then load the watchlist
// 	useif (!user.token) {
  useEffect(()=> {
			async function checkLogin() {
				if (user.token) {
          const items = await dispatch(fetchUsers());
          setThings(items )
					history.push('/users');
				} else {
					history.push('/login');
				}
        setIsLoaded(true);
			}
			checkLogin();
    }, [])

	if (!isLoaded) {
		return <Spinner />;
	}

  console.log("THINGS: ", things)
  return (
    <div>
     {/* { users.map(u => <ul key={u.id}><li>{u.id}: {u.firstname} {u.lastname} - {u.is_admin}</li></ul>)} */}
    </div>
  )
}

export default Users
