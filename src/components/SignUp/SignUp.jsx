import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import google from "../../assets/google.png";
import { AuthContext } from "../../providers/AuthProviders";

const SignUp = () => {
  const [error, setError] = useState('')
  const {createUser} = useContext(AuthContext)

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
    }
    else if(password.length < 6){
      setError("Password must be 6 character or longer!")
    }

    createUser(email, password)
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
      <div className="continue-with-google">
        <img src={google} alt="" />
        <span>Continue with Google</span>
      </div>
    </div>
  );
};

export default SignUp;
