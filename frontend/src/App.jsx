import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import Shortlist from "./pages/Shortlist";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/candidates" element={<Candidates />} />

        <Route path="/shortlist" element={<Shortlist />} />
      </Routes>
    </>
  );
}

export default App;