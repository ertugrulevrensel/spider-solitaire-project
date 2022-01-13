import React, { useState } from "react";
import "./App.css";
import Cards from "./Components/Cards/CardSlot";
import { context } from "./context";
import { itemColumns } from "./Deck";
import Header from "./Components/header";
import EndGame from "./Components/endGame";

function App() {
  const [columns, setColumns] = useState(itemColumns);
  const [completeDeckCount, setCompleteDeckCount] = useState(0);
  const [points, setPoints] = useState(500);

  const data = {
    columns,
    setColumns,
    completeDeckCount,
    setCompleteDeckCount,
    points,
    setPoints,
  };

  return (
    <div className="App">
      <context.Provider value={data}>
        <Header />
        <Cards />
        {completeDeckCount === 8 ? <EndGame /> : null}
      </context.Provider>
    </div>
  );
}

export default App;
