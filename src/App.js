import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteCards from "./pages/NoteCards";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="NoteCards"element={<NoteCards />}/>
        <Route path="Registration" element={<Registration />}/>  
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
export default App