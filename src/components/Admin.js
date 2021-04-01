import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

function Admin() {
  return (
    <div style={{margin: "2em"}}>
      <Link to='/signup'>
        <Button style={{margin: "1em"}} variant='contained' size='medium' color='primary' className='profile-btn btn'>
          Add a New Tech
        </Button>
      </Link>
      <Link to='/users'>
        <Button style={{margin: "1em"}} variant='contained' size='medium' color='primary' className='profile-btn btn'>
          Get All Users
        </Button>
      </Link>
    </div>
  );
}

export default Admin;
