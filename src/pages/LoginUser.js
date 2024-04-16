import {React} from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function LoginUser({setIsAuth}) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    };

    return (
    <div className="loginUser">
            <div>
                <h1>Login User</h1>
                <input placeholder="First Name..."></input>
                <input placeholder="Last Name..."></input>
                <input placeholder="Email Name..."></input>
                <button onClick={}> Login </button>
            </div>
        </div>
    <div className="GoogleAuth">Login
        <p>Sign In With Google</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    );

}

export default LoginUser;
