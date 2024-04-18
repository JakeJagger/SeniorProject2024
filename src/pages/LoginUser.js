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
    <h1>Sign In With Google</h1>
    <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    );

}

export default LoginUser;