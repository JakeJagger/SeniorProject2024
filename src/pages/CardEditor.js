import { React, useState, useEffect } from "react";
import "./CardEditor.css";
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
const [newNoteCardName, setNewNoteCardName] = useState("");

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
  await addDoc(noteCardsCollectionRef, { 
    text: {frontText: newFrontText, rearText: newRearText}, 
    user: {email: auth.currentUser.email, id: auth.currentUser.uid}, 
    cardSet: newNoteCardReference,
    name: newNoteCardName  // Add the note card name here
  });
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

  // Font size and text alignment states
  const [fontSize, setFontSize] = useState(16);
  const [textAlign, setTextAlign] = useState("left");

// Creates Interface for adding, saving, and deleting text.
return (
    <div className="cardEditor" style={{ textAlign: "center" }}>
      <body>

        <div>
        <button onClick={createNoteCards}> Save Note Card to Set: </button>
        <select id="setSelect" onChange={(event) => {setNewNoteCardReference(event.target.value)}}>
          <option value=""> None </option>
          {cardSets.map((cardSet) => {
            return (
            <option value={cardSet.id}> {cardSet.setInfo.name} </option>
          )
          })}
          </select>
          <div  className="Textarea">
            <button onClick={() => { setFontSize(fontSize - 1) }}>Font -</button>
            <button onClick={() => { setFontSize(fontSize + 1) }}>Font +</button>
            <button onClick={() => { setTextAlign("left") }}>Left Align</button>
            <button onClick={() => { setTextAlign("center") }}>Center Align</button>
            <button onClick={() => { setTextAlign("right") }}>Right Align</button>
          </div>
        </div>
        <div>
        <input 
        placeholder="Note Card Name..." 
        value={newNoteCardName}
        onChange={(event) => {setNewNoteCardName(event.target.value)}}
        />
        </div>
        <h1>
          <textarea
            className="use-keyboard-input"
            placeholder="Front Text..."
            value={newFrontText}
            onChange={(event) => { setNewFrontText(event.target.value) }}
            onFocus={() => setActiveTextArea('front')}
            style={{ fontSize: `${fontSize}px`, textAlign: `${textAlign}` }}
          />
          <textarea
            className="use-keyboard-input"
            placeholder="Back Text..."
            value={newRearText}
            onChange={(event) => { setNewRearText(event.target.value) }}
            onFocus={() => setActiveTextArea('rear')}
            style={{ fontSize: `${fontSize}px`, textAlign: `${textAlign}` }}
          />
        </h1>
        <div className="noteCardsContainer"> 
  {noteCards.map((noteCard) => {
    return (
      <div>
        <h1> Note Card: {noteCard.name}
          <div> Front Text: {noteCard.text.frontText} 
            <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateFrontText(event.target.value)}}>
            </textarea> 
            <button onClick={() => {updateNoteCards(noteCard.id, noteCard.newFrontText)}}> Update Front Text</button> 
          </div>
          <div> Back Text: {noteCard.text.rearText} 
            <textarea className="use-keyboard-input" placeholder="Update Text..." onChange={(event) => {setUpdateRearText(event.target.value)}}>
            </textarea> 
            <button onClick={() => {updateNoteCards(noteCard.id, noteCard.newRearText)}}> Update Rear Text</button> 
          </div>
          <button onClick={() => {deleteNoteCards(noteCard.id)}}> Delete</button>
        </h1>
      </div>
    );
  })}
</div>
    
    </body>
    <Keyboard
            value={activeTextArea === 'front' ? newFrontText : newRearText}
            setValue={activeTextArea === 'front' ? setNewFrontText : setNewRearText}
            dir='rtl'
    />
  </div>

        
);
}

export default CardEditor;