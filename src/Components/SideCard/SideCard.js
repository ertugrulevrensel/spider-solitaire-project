import React from "react";
import { sideCards } from "../Deck";
import backFace from "../../assets/bf.webp";
import "./SideCard.css";
function SideCard(props) {
  function stockCard() {
    let tmpCol = props.columns;
    for (let i = 0; i < 10; i++) {
      let tmpItems = tmpCol[i];
      let copiItem = [...tmpItems.items];
      copiItem.splice(copiItem.length, 0, sideCards.splice(0, 1)[0]);
      tmpCol = {
        ...tmpCol,
        [i]: {
          ...tmpItems,
          items: copiItem,
        },
      };
    }
    props.setColumns(tmpCol);
  }

  return (
    <div className="sideCard">
      {[...Array(sideCards.length / 10)].map((e, i) => {
        return (
          <img onClick={() => stockCard()} key={i} src={backFace} alt=""></img>
        );
      })}
    </div>
  );
}

export default SideCard;
