import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { AuthContext } from '../../providers/AuthProviders';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <nav className='header'>
                <img src={logo} alt="" />
                <div>
                    <NavLink to="/">Shop</NavLink>
                    <NavLink to="/orders">Order Review</NavLink>
                    <NavLink to="/inventory">Inventory</NavLink>
                    {
                        !user ? <><NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink></> :
                        <div className='user-and-sign-out'>
                            <span>Welcome, {user.email}</span>
                            <button className='btn-sign-out' onClick={handleLogOut}>Sign Out</button>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;