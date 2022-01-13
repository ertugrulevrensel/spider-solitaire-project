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
      <p className="d-flex align-center">
        <p>Restart </p>
        <img
          onClick={() =>
            shuffle(setColumns, setCompleteDeckCount, setPoints, reset)
          }
          src={restart}
          alt="restart"
        ></img>
      </p>
    </div>
  );
}

export default Header;
