import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from.pathname || '/'

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)

    signIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        form.reset()
        setSuccess("Login successful!!")
        navigate(from)
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
          <input type={show ? "text" : "password"} name="password" id="password" required />

          {/* show / hide password */}
          <span className="show-icon" onClick={() => setShow(!show)}>
            {
              show ?
                <FontAwesomeIcon icon={faEyeSlash} />
                : <FontAwesomeIcon icon={faEye} />
            }
          </span>
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
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
