import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf.webp";
import "./cards.css";
import React, { useState, useEffect } from "react";
import { itemColumns, shuffle } from "../Deck";

function onDragEnd(result, columns, setColumns) {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    console.log(result);
    if (
      (result.draggableId % 13) + 1 ==
      destItems[destItems.length - 1].id % 13
    ) {
      const [removed] = sourceItems.splice(source.index, 1);
      if (sourceItems.length > 0) {
        sourceItems[sourceItems.length - 1].isDrag = true;
        sourceItems[sourceItems.length - 1].isOpen = true;
      }
      destItems.splice(destItems.length, 0, removed);
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
    }
  } else {
    // const column = columns[source.droppableId];
    // const copiedItems = [...column.items];
    // const [removed] = copiedItems.splice(source.index, 1);
    // copiedItems.splice(destination.index, 0, removed);
    // setColumns({
    //   ...columns,
    //   [source.droppableId]: {
    //     ...column,
    //     items: copiedItems,
    //   },
    // });
  }
}

function CardSlot() {
  const [columns, setColumns] = useState(itemColumns);

  useEffect(() => {
    shuffle(columns, setColumns);
  }, "");

  return (
    <div className="cardsArea">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
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
                          <div key={item.id}>
                            {item.isDrag ? (
                              <Draggable
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="cardFront"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {item.card.name}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            ) : (
                              <div className="cardBack">
                                {item.isOpen ? null : (
                                  <img src={backFace} alt=""></img>
                                )}
                                {item.card.name}
                              </div>
                            )}
                          </div>
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
