import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Header = () => {
    const {user, logOut} = useContext(AuthContext)

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
                    <Link to="/">Shop</Link>
                    <Link to="/orders">Order Review</Link>
                    <Link to="/inventory">Inventory</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    {user && <span>
                        Welcome, {user.displayName}
                        <button onClick={handleLogOut}>Sign Out</button>
                    </span>}
                </div>
            </nav>
        </div>
    );
};

export default Header;