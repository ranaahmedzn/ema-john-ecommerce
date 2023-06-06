import { useContext } from "react";
import google from "../../assets/google.png";
import { AuthContext } from "../../providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from.pathname || '/'

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
            navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
    }

    return (
        <div onClick={handleGoogleSignIn} className="continue-with-google">
            <img src={google} alt="" />
            <span>Continue with Google</span>
        </div>
    );
};

export default SocialLogin;