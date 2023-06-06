import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const {createUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignUp = (event) => {
    event.preventDefault()

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm)

    // validation password
    if(password !== confirm){
      setError("Your password did not matched!")
      return;
    }
    else if(password.length < 6){
      setError("Password must be 6 character or longer!")
      return;
    }

    createUser(email, password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser)
      form.reset()
      setSuccess("Successfully created user!!")
      navigate('/')
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
    })

  }


  return (
    <div className="form-container">
      <h3 className="form-title">Sign Up</h3>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" name="confirm" id="confirm-password" required />
        </div>
        <p className="error-text">
          {
            error ? error : ''
          }
        </p>
        <p className="success-text">
          {
            success ? success : ''
          }
        </p>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p className="question">
        Already have an account?{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </p>
      <p className="or-line">
        <span></span>
        Or
        <span></span>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default SignUp;
