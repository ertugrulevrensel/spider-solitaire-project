import React, { useState } from "react";
import "./App.css";
import Cards from "./Components/Cards/CardSlot";
import SideCard from "./Components/SideCard/SideCard";

function App() {
  const [sideDesc, setSideDesc] = useState();
  return (
    <div className="App">
      <Cards sideDesc={sideDesc} setSideDesc={setSideDesc} />
    </div>
  );
}

export default App;
