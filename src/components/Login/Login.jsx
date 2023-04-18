import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import google from "../../assets/google.png";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const [error, setError] = useState('')
  const {signIn} = useContext(AuthContext)
  
  const handleLogin = (event) =>{
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)

    signIn(email, password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser)
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
    })


  }

  return (
    <div className="form-container">
      <h3 className="form-title">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
        </div>
        <p className="error-text">
          {
            error ? error : ''
          }
        </p>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p className="question">
        New to Ema-John?{" "}
        <span>
          <Link to="/signup">Create New Account</Link>
        </span>
      </p>
      <p className="or-line">
        <span></span>
        Or
        <span></span>
      </p>
      <div className="continue-with-google">
        <img src={google} alt="" />
        <span>Continue with Google</span>
      </div>
    </div>
  );
};

export default Login;
