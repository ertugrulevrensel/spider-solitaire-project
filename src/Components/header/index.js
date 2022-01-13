import React, { useContext } from "react";
import "./header.scss";
import restart from "../../assets/restart.png";
import { context } from "../../context";
import { shuffle } from "../../Deck";
function Header() {
  const { setColumns, setCompleteDeckCount, points, setPoints } =
    useContext(context);
  return (
    <div className="header full-w d-flex space-around">
      <p>sssssss</p>
      <p>{points}</p>
      <img
        onClick={() => shuffle(setColumns, setCompleteDeckCount, setPoints)}
        src={restart}
        alt=""
      ></img>
    </div>
  );
}

export default Header;
