import { createRoot } from "react-dom/client";
import { browserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="./pages/noteCards." />  
      </Routes>
    </BrowserRouter>
  )
}