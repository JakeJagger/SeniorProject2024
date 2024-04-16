import { React, useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function DisplayCards({isAuth}) {
  let navigate = useNavigate();
  // Checks if User is Logged In
  useEffect (() => {
    if (!isAuth) {
      isAuth={}/
      navigate("/login");
    }
  }
  )

// Pushes the text to Firebase.
const createCardSets = async () =>  {
  await addDoc(cardSetsCollectionRef, { name: newName});
};

// Creates Set
const [newName, setNewName] = useState("")
const [updateName, setUpdateName] = useState("")

// Allows Deletion
const deleteCardSets = async (id) => {
  const noteCardsDoc = doc(db, "noteCards", id)
  await deleteDoc(noteCardsDoc);
};

// Connects User Creation to Firebase Database
const [cardSets, setCardSets] = useState( [] );
const cardSetsCollectionRef = collection(db, "cardSets");

// Pulls the text onto the website.
useEffect(() => {
  const getCardSets = async () => { 
    const data = await getDocs(cardSetsCollectionRef);
    setCardSets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    console.log(data);
  };
  getCardSets();}, 
  []);

  return (
    <div className="App">
      <body>
        <h1 style={{ textAlign: "center" }}></h1>
        <textarea 
          placeholder="Card Set..." 
          value={newName} 
          onChange={(event) => {setNewName(event.target.value)}}
        />
    {cardSets.map((cardSet) => {
      return (
        <div>
          {" "}
          <h1>
            <div> Name: {cardSet.name} </div>
          </h1>
          <button onClick={() => {deleteCardSets(cardSet.id)}}> Delete</button></div>
      );
    })}
    </body>
  </div>
);

}

export default DisplayCards;