import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf3.webp";
import "./cards.scss";
import React, { useEffect, useContext } from "react";
import { shuffle } from "../../deck";
import SideCard from "../SideCard";
import CompleteDeck from "../CompleteDeck";
import { dragEnd, dragStart } from "../../dragProcess";
import { context, timerContext } from "../../context";

function CardSlot() {
  const {
    columns,
    setColumns,
    completeDeckCount,
    setCompleteDeckCount,
    points,
    setPoints,
  } = useContext(context);

  const { reset } = useContext(timerContext);

  function onDragStart(start) {
    dragStart(start, columns);
  }

  function onDragEnd(result) {
    dragEnd(
      result,
      columns,
      setColumns,
      setCompleteDeckCount,
      completeDeckCount,
      points,
      setPoints
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
    shuffle(setColumns, setCompleteDeckCount, setPoints, reset);
  }, []); //eslint-disable-line

  return (
    <>
      <div className="d-flex">
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([id, col]) => {
            return (
              <Droppable key={id} droppableId={id}>
                {(provided) => {
                  return (
                    <div
                      className="dropArea"
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
                                {(provided, snapshot) => (
                                  <div
                                    id={item.id}
                                    className="card d-flex p-relative"
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
                              <div className="card">
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
        <SideCard />
        <CompleteDeck />
      </div>
    </>
  );
}

export default CardSlot;
