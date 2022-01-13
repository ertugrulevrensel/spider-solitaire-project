import React, { useContext } from "react";
import "./header.scss";
import restart from "../../assets/restart.png";
import { context, timerContext } from "../../context";
import { shuffle } from "../../Deck";

function Header() {
  const { setColumns, setCompleteDeckCount, points, setPoints } =
    useContext(context);
  const { minutes, seconds, reset } = useContext(timerContext);

  return (
    <div className="header full-w d-flex space-around align-center">
      <p>
        Time: {minutes}:{seconds}
      </p>
      <p>Score: {points}</p>
      <div
        onClick={() =>
          shuffle(setColumns, setCompleteDeckCount, setPoints, reset)
        }
        className="d-flex align-center restart"
      >
        <p>Restart </p>
        <img src={restart} alt="restart"></img>
      </div>
    </div>
  );
}

export default Header;
