import React, { useContext } from "react";
import { sideDesc } from "../../deck";
import backFace from "../../assets/bf3.webp";
import "./SideCard.scss";
import { context } from "../../context";
import { isDraggable } from "../../dragProcess";

function SideCard() {
  const { columns, setColumns } = useContext(context);

  function stockCard() {
    let tmpCol = columns;

    for (let i = 0; i < 10; i++) {
      let tmpItems = tmpCol[i];
      let copiItem = [...tmpItems.items];
      copiItem.splice(copiItem.length, 0, sideDesc.splice(0, 1)[0]);

      tmpCol = {
        ...tmpCol,
        [i]: {
          ...tmpItems,
          items: isDraggable(copiItem),
        },
      };
    }

    setColumns(tmpCol);
  }

  return (
    <div className="sideCard">
      {[...Array(sideDesc.length / 10)].map((e, i) => {
        return (
          <img onClick={() => stockCard()} key={i} src={backFace} alt=""></img>
        );
      })}
    </div>
  );
}

export default SideCard;
