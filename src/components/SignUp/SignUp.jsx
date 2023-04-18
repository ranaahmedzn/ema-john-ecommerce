import React from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import google from '../../assets/google.png'

const SignUp = () => {
    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign Up</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" name="confirm" id="confirm-password" />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p className='form-question'>Already have an account? <span><Link to="/login">Login</Link></span></p>
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

export default SignUp;