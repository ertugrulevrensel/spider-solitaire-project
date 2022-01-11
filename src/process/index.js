var belowIndexList;
let syc = true;

export function dragEnd(result, columns, setColumns) {
  if (!result.destination || !syc) {
    for (let i = 1; i < belowIndexList.length; i++) {
      document.getElementById(belowIndexList[i].id).classList.toggle("d-none");
    }
    return;
  }
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    let tmpCol = columns;
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

      removed.forEach((item) => {
        destItems.push(item);
      });
      tmpCol = {
        ...tmpCol,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      };
      setColumns(tmpCol);

      //------------------------------------//

      for (let i = 0; i < 10; i++) {
        let isCmpltItem;
        let isCmpltRank = [];
        let syc1 = 0;
        let isCmplt = true;
        tmpCol[i].items.forEach((item) => {
          if (item.card.rank === 13 && item.isOpen) {
            isCmpltItem = tmpCol[i].items.slice(syc1, tmpCol[i].items.length);
            isCmpltItem.forEach((items) => {
              isCmpltRank.push(items.card.rank);
            });

            if (isCmpltRank.length === 13) {
              for (let y = 0; y < isCmpltRank.length - 1; y++) {
                if (isCmpltRank[y] - 1 !== isCmpltRank[y + 1]) {
                  isCmplt = false;
                }
              }
            } else {
              isCmplt = false;
            }
            if (isCmplt) {
              console.log("object");
              tmpCol[i].items.splice(syc1, 13);

              if (tmpCol[i].items.length > 0) {
                tmpCol[i].items[tmpCol[i].items.length - 1].isOpen = true;
                tmpCol[i].items[tmpCol[i].items.length - 1].isDrag = true;
              }
            }
          }
          syc1++;
        });
      }
    }
  }

  for (let i = 1; i < belowIndexList.length; i++) {
    document.getElementById(belowIndexList[i].id).classList.toggle("d-none");
  }
}

export function dragStart(start, columns) {
  syc = true;
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

  for (let i = 0; i < belowListRank.length - 1; i++) {
    if (belowListRank[i + 1] + 1 !== belowListRank[i]) {
      syc = false;
    }
  }

  if (syc === true) {
    for (let i = 1; i < belowIndexList.length; i++) {
      document.getElementById(belowIndexList[i].id).classList.toggle("d-none");
    }
    return belowIndexList[0];
  } else {
    for (let i = 1; i < belowIndexList.length; i++) {
      document.getElementById(belowIndexList[i].id).classList.toggle("d-none");
    }
    return;
  }
}
