import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardEditor from "./pages/CardEditor";
import DisplayCards from "./pages/DisplayCards";
import LoginUser from "./pages/LoginUser";
import { signOut } from "firebase/auth";
import { auth, provider } from "./firebase-config";
import { useState } from "react";

function App() {
  //Tests User Authentication
  //Use state is Boolean
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/LoginUser";
    });
  };
  return (
    <Router>
      <nav>
        {!isAuth ? (<Link to="/LoginUser"> Login User </Link>
        ) : (
        <>
        <Link to="/CardEditor"> Card Editor </Link>
        <Link to="/DisplayCards"> Display Cards </Link>
        <button onClick={signUserOut}> Log Out</button>
        </>
        )}
      </nav>
      <Routes>
        <Route path="/CardEditor" element={<CardEditor isAuth={isAuth} />}/>
        <Route path="/DisplayCards" element={<DisplayCards isAuth={isAuth} />}/>
        <Route path="/LoginUser" element={<LoginUser setIsAuth={setIsAuth} />}/>
      </Routes>
    </Router>
  );
}

export default App

