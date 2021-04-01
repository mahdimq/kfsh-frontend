import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/actions';

// Import logos
import kfshLogo from '../images/kfshLogo.png';

import { StyledNavbar, StyledHeader, StyledLogo } from '../styles/StyledHeader';

function Header() {
  const navLinks = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    navLinks.current.classList.toggle('nav--visible');
  };

  const logout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem('user-token');
  };

  return (
    <StyledHeader>
      <StyledNavbar>
        <nav className='container logo-container row '>
          <button onClick={toggleNavbar} className='nav-toggle' aria-label='open navigation'>
            <span className='hamburger' />
          </button>

          <div className='logo'>
            <Link to='/'>
              <StyledLogo src={kfshLogo} alt='kfsh-logo' />
            </Link>
          </div>

          <div ref={navLinks} className='nav'>
            {
              user.token ? <ul className='nav__list '>
                {
                  user.token ? <li className='nav__item'>Welcome {user.firstname}</li> :
                  null}

                <Link to='/patients'>
                  <li className='nav__item'>Patients</li>
                </Link>

                <Link to='/profile'>
                  <li className='nav__item'>Profile</li>
                </Link>

                {
									user.is_admin ? 
									<Link to="/admin">
										
										<li className='nav__item'>Admin</li>
									</Link>
									 :
                  null}

                <Link to='/'>
                  <li onClick={logout} className='nav__item'>
                    Logout
                  </li>
                </Link>
              </ul> :
              <ul className='nav__list '>
                <Link to='/login'>
                  <li className='nav__item'>Log In</li>
                </Link>
              </ul>}
          </div>
        </nav>
      </StyledNavbar>
    </StyledHeader>
  );
}

export default Header;
