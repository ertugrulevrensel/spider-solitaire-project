import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import backFace from "../../assets/bf.webp";
import "./cards.css";
import React, { useState, useEffect } from "react";
import { itemColumns, shuffle } from "../Deck";

function CardSlot(props) {
  const [columns, setColumns] = useState(itemColumns);
  var belowIndexList;
  function onDragStart(start) {
    console.log(start);
    const { source } = start;
    const columnList = columns[source.droppableId].items;
    belowIndexList = columns[source.droppableId].items.slice(
      source.index,
      columnList.length
    );
    const belowListRank = [];
    belowIndexList.forEach((item) => {
      belowListRank.push(item.card.rank);
    });
    let syc = true;
    for (let i = 0; i < belowListRank.length - 1; i++) {
      if (belowListRank[i + 1] + 1 !== belowListRank[i]) {
        syc = false;
        console.log("false");
      }
      console.log("true");
    }
    if (syc === true) {
      belowIndexList.forEach((item) => {
        return item;
      });
    }
    console.log(belowListRank);

    // console.log(x);
    // let xda = {
    //   droppableId: x.source.droppableId,
    //   index: [x.source.index, x.source.index - 1],
    //   // columns[x.source.droppableId].items[x.source.index].id,
    //   // columns[x.source.droppableId].items[x.source.index - 1].id,
    // };
    // x.source = xda;
    // let xda = [];
    // xda.push(x.source.index);
    // xda.push(x.source.index + 1);
    // console.log(columns[x.source.droppableId].items[x.source.index]);
    // xda.forEach((index) => {
    //   return columns[x.source.droppableId].items[index];
    // });
    //return [x.source.index, x.source.index - 1];
  }

  function onDragEnd(result) {
    console.log(belowIndexList);
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol.items];
      const destItems = [...destCol.items];
      if (
        (result.draggableId % 13) + 1 ===
        destItems[destItems.length - 1].id % 13
      ) {
        const removed = sourceItems.splice(source.index, belowIndexList.length);

        if (sourceItems.length > 0) {
          sourceItems[sourceItems.length - 1].isDrag = true;
          sourceItems[sourceItems.length - 1].isOpen = true;
        }
        console.log(removed);
        removed.forEach((item) => {
          destItems.push(item);
        });
        //destItems.splice(destItems.length, 0, removed);
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

  useEffect(() => {
    shuffle(columns, setColumns, props.sideDesc, props.setSideDesc);
  }, "");

  return (
    <div className="cardsArea">
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                                isDragDisabled={!item.isDrag}
                              >
                                {(provided) => {
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
                              <div className="cardFront">
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
