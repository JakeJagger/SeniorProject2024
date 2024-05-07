import { React, useState, useEffect } from "react";
import "./DisplayCards.css"
import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { db, auth, getAuth, updateProfile} from "../firebase-config";
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
  await addDoc(cardSetsCollectionRef, {setInfo: {name: newName}});
};

// Creates Set
const [newName, setNewName] = useState("")

// Allows Deletion
const deleteCardSets = async (id) => {
  const cardSetsDoc = doc(db, "cardSets", id)
  await deleteDoc(cardSetsDoc);
};

// Connects User Creation to Firebase Database
const [cardSets, setCardSets] = useState( [] );
const [noteCards, setNoteCards] = useState( [] ); // New state for note cards
const cardSetsCollectionRef = collection(db, "cardSets");
const noteCardsCollectionRef = collection(db, "noteCards"); // Reference to note cards collection

// Pulls the text onto the website.
useEffect(() => {
  const getCardSets = async () => { 
    const data = await getDocs(cardSetsCollectionRef);
    setCardSets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    console.log(data);
  };
  getCardSets();}, 
  []);
  
// Fetch note cards from Firebase
useEffect(() => {
  const getNoteCards = async () => { 
    const data = await getDocs(noteCardsCollectionRef);
    setNoteCards(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    console.log(data);
  };
  getNoteCards();}, 
  []);

  return (
    <div className="App">
      <body>
      <button onClick={createCardSets}> Save Card Set</button>
        <h1 style={{ textAlign: "center" }}></h1>
        <textarea 
          placeholder="Card Set..." 
          value={newName}
          onChange={(event) => {setNewName(event.target.value)}}
        />
{cardSets.map((cardSet) => {
  // Filter note cards based on cardSet property
  const filteredNoteCards = noteCards.filter(noteCard => noteCard.cardSet === cardSet.id);
  return (
    <div>
      {" "}
      <h1 style={{ textAlign: "center" }}>
        <div> Name: {cardSet.setInfo.name} </div>
      </h1>
      <h2 style={{ textAlign: "center" }}>
        {filteredNoteCards.map(filteredNoteCard => (
        <div>
          Name: {filteredNoteCard.name}  // Display the note card name here
          Front Text: {filteredNoteCard.text.frontText}
          Back Text: {filteredNoteCard.text.rearText}
          </div>
        ))}
      </h2>
      <button onClick={() => {deleteCardSets(cardSet.id)}}> Delete</button></div>
  );
})}
    </body>
  </div>
);

}

export default DisplayCards;