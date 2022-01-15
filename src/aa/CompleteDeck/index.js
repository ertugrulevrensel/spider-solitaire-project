import React, { useContext } from "react";
import backFace from "../../assets/bf3.webp";
import { context } from "../../context";
import "./completeDeck.scss";

function CompleteDeck() {
  const { completeDeckCount } = useContext(context);
  return (
    <div className="d-flex completeDeck">
      {[...Array(completeDeckCount)].map((e, i) => {
        return <img key={i} src={backFace} alt=""></img>;
      })}
    </div>
  );
}

export default CompleteDeck;
