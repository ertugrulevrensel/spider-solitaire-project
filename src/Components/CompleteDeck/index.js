import React from "react";
import backFace from "../../assets/bf3.png";

function CompleteDeck(props) {
  return (
    <>
      {[...Array(props.completeDeckCount)].map((e, i) => {
        return <img key={i} src={backFace} alt=""></img>;
      })}
    </>
  );
}

export default CompleteDeck;
