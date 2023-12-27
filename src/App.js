import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Question from "./pages/Question";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
