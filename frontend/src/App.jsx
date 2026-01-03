import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import CreateContact from "./components/CreateContact";
import ContactList from "./components/ContactList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateContact />} />
        <Route path="/" element={<ContactList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
