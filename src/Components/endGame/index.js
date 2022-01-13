import React, { useContext } from "react";
import "./endGame.scss";
import { context } from "../../context";
import restart from "../../assets/restart.png";
import { shuffle } from "../../Deck";

function EndGame() {
  const { setColumns, setCompleteDeckCount, points, setPoints } =
    useContext(context);
  return (
    <div className="endGameModal d-flex p-fixed align-center justify-center bg4b9ce2O7">
      <div className="d-flex endGame align-center flex-d-col">
        <p>Tebrikler!!</p>
        <p>Puanınız : {points}</p>
        <img
          onClick={() => shuffle(setColumns, setCompleteDeckCount, setPoints)}
          src={restart}
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default EndGame;
