import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import google from '../../assets/google.png'

const Login = () => {
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p className='form-question'>New to Ema-John? <span><Link to="/signup">Create New Account</Link></span></p>
                <p className='or-line'>
                    <span></span>
                    Or
                    <span></span>
                </p>
                <div className='continue-with-google'>
                    <img src={google} alt="" />
                    <span>Continue with Google</span>
                </div>
            </form>
        </div>
    );
};

export default Login;