import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf.webp";
import "./cards.css";
import React, { useState, useEffect } from "react";
const characters = [
  { id: "1", name: "A" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
  { id: "5", name: "5" },
  { id: "6", name: "6" },
  { id: "7", name: "7" },
  { id: "8", name: "8" },
  { id: "9", name: "9" },
  { id: "10", name: "10" },
  { id: "11", name: "J" },
  { id: "12", name: "Q" },
  { id: "13", name: "K" },
];
const deckEight = [
  ...characters,
  ...characters,
  ...characters,
  ...characters,
  ...characters,
  ...characters,
  ...characters,
  ...characters,
];
console.log(deckEight[0]);
const columnsItem = {
  0: { items: [] },
  1: { items: [] },
  2: { items: [] },
  3: { items: [] },
  4: { items: [] },
  5: { items: [] },
  6: { items: [] },
  7: { items: [] },
  8: { items: [] },
  9: { items: [] },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCol,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function CardSlot() {
  const [columns, setColumns] = useState(columnsItem);
  function shuffle() {
    let tmpCol = { ...columnsItem };
    let x = [];
    deckEight.map((crd) => {
      x.push(crd.id);
    });
    for (let i = 0; i < 104; i++) {
      let random = Math.ceil(Math.random() * (103 - i));
      if (i < 50) {
        let tmpItems = tmpCol[i % 10];
        let copiItem = [...tmpItems.items];
        copiItem.splice(0, 0, deckEight[random]);
        console.log(tmpCol);
        tmpCol = {
          ...tmpCol,
          [i % 10]: {
            ...tmpItems,
            items: copiItem,
          },
        };
      }
      deckEight.splice(random, 1);
    }
    console.log(tmpCol);
  }
  useEffect(() => {
    shuffle();
  }, "");
  return (
    <div className="cardsArea">
      <DragDropContext
        onDragEnd={(
          result //console.log(columns[result.source.droppableId - 1])
        ) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, col]) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <Droppable droppableId={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgray",
                        padding: 4,
                        width: "100%",
                        height: 500,
                        margin: 10,
                        justifyContent: "space-between",
                        display: "grid",
                        gridTemplateRows: "repeat(20,2rem)",
                      }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {col.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img src={backFace} alt=""></img>
                                  {item.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default CardSlot;
