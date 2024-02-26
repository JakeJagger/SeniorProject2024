/*
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
*/
import {React, useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";


function App() {
  const [newFrontText, setNewFrontText] = useState("")
  const [newRearText, setNewRearText] = useState("")
  
  const [noteCards, setNoteCards] = useState( [] );
  const noteCardsCollectionRef = collection(db, "noteCards");

  const createNoteCards = async () =>  {
    await addDoc(noteCardsCollectionRef, {frontText: newFrontText});
  };
  useEffect(() => {
    const getNoteCards = async () => {
      const data = await getDocs(noteCardsCollectionRef);
      setNoteCards(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    };

    getNoteCards();
  }, []);

/*
var modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] }
    ],
    [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
  ]
};

var formats = [
  "header", "height", "bold", "italic",
  "underline", "strike", "blockquote",
  "list", "color", "bullet", "indent",
  "link", "image", "align", "size",
];

return (
  <div className= "App">
    
    <h1 style={{ textAlign: "center" }}>Front Text</h1>
    <div style={{ display: "grid", justifyContent: "center"}}
    >
      <button onClick={createNoteCards}> Create Front Text
      </button>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="write your content ...." 
        onChange={(event) => {setNewFrontText(event.target.value)}}
        style={{ height: "100px" }}
      >
      </ReactQuill>
    </div>
    
  </div>

);
  */
  return (
    <div className="App">
      <button onClick={createNoteCards}> Create Note Card
      </button>
      <h1 style={{ textAlign: "center" }}></h1>
      <input
      placeholder="Front Text..." onChange={(event) => {setNewFrontText(event.target.value)}}>
      </input>
      <h1 style={{ textAlign: "center" }}></h1>
      <input
      placeholder="Rear Text..." onChange={(event) => {setNewRearText(event.target.value)}}>
      </input>
      {noteCards.map((noteCard) => {
        return (
          <div>
            {" "}
            <h2>Front Text: {noteCard.frontText}</h2>
            <h2>Rear Text: {noteCard.rearText}</h2>
          </div>
        );
      })}
    </div>
    
  );

}


export default App;