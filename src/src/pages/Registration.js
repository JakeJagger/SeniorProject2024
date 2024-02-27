import {React} from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

function Registration() {
    return (
        <div className="Registration">
            <div>
                <h1>Register User</h1>
                <input placeholder="First Name..."></input>
                <input placeholder="Last Name..."></input>
                <input placeholder="Email Name..."></input>
                <button> Create User </button>
            </div>
            <div>
                <h1>Login User</h1>
                <input placeholder="First Name..."></input>
                <input placeholder="Last Name..."></input>
                <input placeholder="Email Name..."></input>
                <button> Login User </button>
            </div>
            <div>
                <h1>Delete User</h1>
                <input placeholder="First Name..."></input>
                <input placeholder="Last Name..."></input>
                <input placeholder="Email Name..."></input>
                <button> Delete User</button>
            </div>
        </div>
    );
}

export default Registration