import React from "react";
import backFace from "../../assets/bf.webp";

function CompleteDeck(props) {
  console.log(props.completeDeckCount);
  return (
    <div>
      {[...Array(props.completeDeckCount)].map((e, i) => {
        return <img key={i} src={backFace} alt=""></img>;
      })}
    </div>
  );
}

export default CompleteDeck;
