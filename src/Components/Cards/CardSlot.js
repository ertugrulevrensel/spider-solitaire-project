import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf.webp";
import "./cards.css";
import React, { useState, useEffect } from "react";
import { itemColumns, shuffle } from "../Deck";
import SideCard from "../SideCard/SideCard";
import { dragEnd, dragStart } from "../../process";

function CardSlot(props) {
  const [columns, setColumns] = useState(itemColumns);

  function onDragStart(start) {
    dragStart(start, columns);
  }

  function onDragEnd(result) {
    dragEnd(result, columns, setColumns);
  }

  useEffect(() => {
    shuffle(setColumns, props.sideDesc, props.setSideDesc);
  }, "");

  return (
    <>
      <div className="cardsArea">
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([id, col]) => {
            return (
              <Droppable key={id} droppableId={id}>
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
                            {item.isOpen ? (
                              <>
                                {item.isDrag ? (
                                  <Draggable
                                    draggableId={item.id.toString()}
                                    index={index}
                                    isDragDisabled={!item.isDrag}
                                  >
                                    {(provided) => {
                                      return (
                                        <div
                                          id={item.id}
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
                                  <div className="cardFront">
                                    {item.card.name}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="cardFront">
                                <img src={backFace} alt=""></img>
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
            );
          })}
        </DragDropContext>
      </div>
      <SideCard columns={columns} setColumns={setColumns} />
    </>
  );
}

export default CardSlot;
