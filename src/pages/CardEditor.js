import { React, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Keyboard from "../Keyboard";

function CardEditor({isAuth}) {
  let navigate = useNavigate();
  // Checks if User is Logged In
  useEffect (() => {
    if (!isAuth) {
      isAuth={}/
      navigate("/login");
    }
  }
  )

// Connects User Creation to Firebase Database
const [newFrontText, setNewFrontText] = useState("")
const [newRearText, setNewRearText] = useState("")
const [updateFrontText, setUpdateFrontText] = useState("")
const [updateRearText, setUpdateRearText] = useState("")
const [activeTextArea, setActiveTextArea] = useState(null);

// Connects User Creation to Firebase Database
const [cardSets, setCardSets] = useState( [] );
const [noteCards, setNoteCards] = useState( [] );
const noteCardsCollectionRef = collection(db, "noteCards");
const cardSetsCollectionRef = collection(db, "cardSets");

// Pushes the text to Firebase.
const createNoteCards = async () =>  {
  await addDoc(noteCardsCollectionRef, { frontText: newFrontText, rearText: newRearText, user: {email: auth.currentUser.email, id: auth.currentUser.uid}});
};

// Allows editing of firestore Database.
const updateNoteCards = async (id, frontText, rearText) => {
  const noteCardsDoc = doc(db, "noteCards", id)
  const newFields = {frontText: updateFrontText, rearText: updateRearText }
  await updateDoc(noteCardsDoc, newFields)
};

// Allows Deletion
const deleteNoteCards = async (id) => {
  const noteCardsDoc = doc(db, "noteCards", id)
  await deleteDoc(noteCardsDoc);
};

// Pulls NoteCard onto the website.
useEffect(() => {
  const getNoteCards = async () => { 
    const data = await getDocs(noteCardsCollectionRef);
    setNoteCards(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    console.log(data);
  };
  getNoteCards();}, 
  []);

// Pulls CardSet onto the website.
  useEffect(() => {
    const getCardSets = async () => { 
      const data = await getDocs(cardSetsCollectionRef);
      setCardSets(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    };
    getCardSets();}, 
    []);

// Creates Interface for adding, saving, and deleting text.

return (
    <div className="App">
      <body>
        <button onClick={createNoteCards}> Save Note Card to Set</button>
        <select className="nameSelect">
        <option>None</option>
        {cardSets.map((cardSet) => {<option value={cardSet.name}> {cardSet.name} </option>})}
        </select>
        <h1 style={{ textAlign: "center" }}></h1>
        <textarea 
          className="use-keyboard-input" 
          placeholder="Front Text..." 
          value={newFrontText} 
          onChange={(event) => {setNewFrontText(event.target.value)}}
          onFocus={() => setActiveTextArea('front')}
        />
        <textarea 
          className="use-keyboard-input" 
          placeholder="Rear Text..." 
          value={newRearText} 
          onChange={(event) => {setNewRearText(event.target.value)}}
          onFocus={() => setActiveTextArea('rear')}
        />
        <Keyboard 
          value={activeTextArea === 'front' ? newFrontText : newRearText} 
          setValue={activeTextArea === 'front' ? setNewFrontText : setNewRearText} 
        />

    {noteCards.map((noteCard) => {
      return (
        <div>
          {" "}
          <h1> Note Card: 
            <div> Front Text: {noteCard.frontText} <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateFrontText(event.target.value)}}>
    </textarea> <button onClick={() => {updateNoteCards(noteCard.id, noteCard.newFrontText)}}> Update Front Text</button> </div>
            <div> Rear Text: {noteCard.rearText} <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateRearText(event.target.value)}}>
    </textarea> <button onClick={() => {updateNoteCards(noteCard.id, noteCard.newRearText)}}> Update Rear Text</button> </div> 
          </h1>
          <button onClick={() => {deleteNoteCards(noteCard.id)}}> Delete</button></div>
      );
    })}
    </body>
  </div>
);

}

export default CardEditor;