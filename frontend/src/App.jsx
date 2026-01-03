import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateContact from "./components/CreateContact";

function App() {
  return (
    <>
      <CreateContact refresh={() => window.location.reload()} />
    </>
  );
}

export default App;
