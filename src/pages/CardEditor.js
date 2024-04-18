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
const [newNoteCardReference, setNewNoteCardReference] = useState("")


// Updates
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
  await addDoc(noteCardsCollectionRef, { text:{frontText: newFrontText, rearText: newRearText}, user: {email: auth.currentUser.email, id: auth.currentUser.uid}});
};

// Allows editing of firestore Database.
const updateNoteCards = async (id) => {
  const noteCardsDoc = doc(db, "noteCards", id)
  const newFields = { text: {frontText: updateFrontText, rearText: updateRearText}}
  await updateDoc(noteCardsDoc, newFields)
};

const updateCardSets = async (id) => {
  const cardSetsDoc = doc(db, "noteCards", id)
  const newFields = {frontText: newFrontText, rearText: newRearText}
  await updateDoc(cardSetsDoc.noteCards, newFields )
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
    
// Selects the cardset

// Creates Interface for adding, saving, and deleting text.
return (
    <div className="App">
      <body>
    <form><button onClick={createNoteCards}> Save Note Card to Set: </button>
      <select id="setSelect">
          <option> None </option>
          {cardSets.map((cardSet) => {
            return (
              <option value={newNoteCardReference} onChange={(event) => {updateCardSets(event.target.value)}}> {cardSet.setInfo.name} </option>
            )
          })}
          </select>
          </form>
      
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
            <div> Front Text: {noteCard.text.frontText} <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateFrontText(event.target.value)}}>
    </textarea> <button onClick={() => {updateNoteCards(noteCard.id, noteCard.newFrontText)}}> Update Front Text</button> </div>
            <div> Rear Text: {noteCard.text.rearText} <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateRearText(event.target.value)}}>
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