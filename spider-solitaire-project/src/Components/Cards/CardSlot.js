import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf.webp";
import "./cards.css";
import React, { useState, useEffect } from "react";
const characters = [
  { rank: "1", name: "A" },
  { rank: "2", name: "2" },
  { rank: "3", name: "3" },
  { rank: "4", name: "4" },
  { rank: "5", name: "5" },
  { rank: "6", name: "6" },
  { rank: "7", name: "7" },
  { rank: "8", name: "8" },
  { rank: "9", name: "9" },
  { rank: "10", name: "10" },
  { rank: "11", name: "J" },
  { rank: "12", name: "Q" },
  { rank: "13", name: "K" },
];
const deckEight = [];
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
  console.log(columns);
};

function CardSlot() {
  const [columns, setColumns] = useState(columnsItem);

  function shuffle() {
    let idCounter = 0;
    for (let y = 0; y < characters.length * 8; y++) {
      deckEight.push({
        id: idCounter,
        card: characters[y % 13],
      });
      idCounter = idCounter + 1;
    }
    console.log(deckEight);
    let tmpCol = { ...columnsItem };
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
      } else if (i >= 50 && i < 54) {
        let tmpItems = tmpCol[i % 4];
        let copiItem = [...tmpItems.items];
        copiItem.splice(0, 0, deckEight[random]);
        console.log(tmpCol);
        tmpCol = {
          ...tmpCol,
          [i % 4]: {
            ...tmpItems,
            items: copiItem,
          },
        };
      }
      deckEight.splice(random, 1);
    }
    setColumns(tmpCol);
    console.log(columns);
  }
  useEffect(() => {
    shuffle();
  }, []);
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
                            draggableId={item.id.toString()}
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
                                  {item.card.name}
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
