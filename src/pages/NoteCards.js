import {React, useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

function NoteCards() {
    const NoteCards = () => {
        return <h1>NoteCards</h1>
    };

  const [newFrontText, setNewFrontText] = useState("")
  const [newRearText, setNewRearText] = useState("")
  const [updateFrontText, setUpdateFrontText] = useState("")
  const [updateRearText, setUpdateRearText] = useState("")
  
  const [noteCards, setNoteCards] = useState( [] );
  const noteCardsCollectionRef = collection(db, "noteCards");

// Pushes the text to Firebase.
  const createNoteCards = async (id, frontText, rearText) =>  {
    await addDoc(noteCardsCollectionRef, {frontText: newFrontText, rearText: newRearText});
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

// Pulls the text onto the website.
  useEffect(() => {
    const getNoteCards = async () => { 
      const data = await getDocs(noteCardsCollectionRef);
      setNoteCards(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    };
    getNoteCards();}, 
    []);

// Creates Interface for adding, saving, and deleteing text.
  return (
    <div className="App">
      <button onClick={createNoteCards}> Create Note Card
      </button>
      <h1 style={{ textAlign: "center" }}></h1>
      <input placeholder="Front Text..." onChange={(event) => {setNewFrontText(event.target.value)}}>
      </input>
      <input placeholder="Rear Text..." onChange={(event) => {setNewRearText(event.target.value)}}>
      </input>
      {noteCards.map((noteCard) => {
        return (
          <div>
            {" "}
            <h1> Note Card: 
              <div> Front Text: {noteCard.frontText} <input placeholder="Update Text..." onChange={(event) => {setUpdateFrontText(event.target.value)}}>
      </input> <button onClick={() => {updateNoteCards(noteCard.id, noteCard.frontText)}}> Update Front Text</button> </div>
              <div> Rear Text: {noteCard.rearText} <input placeholder="Update Text..." onChange={(event) => {setUpdateRearText(event.target.value)}}>
      </input> <button onClick={() => {updateNoteCards(noteCard.id, noteCard.rearText)}}> Update Rear Text</button> </div> 
            </h1>
            <button onClick={() => {deleteNoteCards(noteCard.id)}}> Delete Note Card</button></div>
        );
      })}
    </div>
    
  );

}


export default NoteCards;