import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf3.png";
import "./cards.scss";
import React, { useState, useEffect } from "react";
import { itemColumns, shuffle } from "../Deck";
import SideCard from "../SideCard/SideCard";
import CompleteDeck from "../CompleteDeck";
import { dragEnd, dragStart } from "../../process";

function CardSlot(props) {
  const [columns, setColumns] = useState(itemColumns);
  const [completeDeckCount, setCompleteDeckCount] = useState(0);

  function onDragStart(start) {
    dragStart(start, columns);
  }

  function onDragEnd(result) {
    dragEnd(
      result,
      columns,
      setColumns,
      setCompleteDeckCount,
      completeDeckCount
    );
  }

  function dragStyle(style, snapshot) {
    if (snapshot.isDragging) {
      return {
        ...style,
        transitionDuration: `0.001s`,
      };
    }
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
                                isDragDisabled={!item.isDrag}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    id={item.id}
                                    className="cardFront d-flex p-relative"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={dragStyle(
                                      provided.draggableProps.style,
                                      snapshot
                                    )}
                                  >
                                    <p>
                                      <b>{item.card.name}</b>
                                    </p>
                                    <div className="d-flex full-w full-h align-center justify-center p-absolute">
                                      <span>♠</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              <div className="cardFront">
                                {item.isOpen ? (
                                  <>
                                    <p>{item.card.name}</p>
                                  </>
                                ) : (
                                  <img src={backFace} alt=""></img>
                                )}
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
      <div className="d-flex space-between stockDeck">
        <SideCard columns={columns} setColumns={setColumns} />
        <CompleteDeck
          completeDeckCount={completeDeckCount}
          setCompleteDeckCount={setCompleteDeckCount}
        />
      </div>
    </>
  );
}

export default CardSlot;
