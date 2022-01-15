import React, { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import { context, timerContext } from "./context";
import { itemColumns } from "./deck";
import Header from "./components/header";
import EndGame from "./components/endGame";
import { useStopwatch } from "react-timer-hook";

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

  const { seconds, minutes, reset, pause } = useStopwatch({ autoStart: true });

  return (
    <div className="App">
      <timerContext.Provider value={{ seconds, minutes, reset, pause }}>
        <context.Provider value={data}>
          <Header />
          <Cards />
          {completeDeckCount === 8 ? <EndGame /> : null}
        </context.Provider>
      </timerContext.Provider>
    </div>
  );
}

export default App;
