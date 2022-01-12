var belowIndexList;
let isRegular = true;

export function dragEnd(
  result,
  columns,
  setColumns,
  setCompleteDeckCount,
  completeDeckCount
) {
  if (!result.destination || !isRegular) {
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

    if (destItems.length < 1) {
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
    }
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

      //------------------------------------//

      for (let i = 0; i < 10; i++) {
        let isCmpltItem;
        let isCmpltRank = [];
        let index = 0;
        let isCmplt = true;

        tmpCol[i].items.forEach((item) => {
          if (item.card.rank === 13 && item.isOpen) {
            isCmpltItem = tmpCol[i].items.slice(index, tmpCol[i].items.length);
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
              setCompleteDeckCount(completeDeckCount + 1);
              tmpCol[i].items.splice(index, 13);

              if (tmpCol[i].items.length > 0) {
                tmpCol[i].items[tmpCol[i].items.length - 1].isOpen = true;
                tmpCol[i].items[tmpCol[i].items.length - 1].isDrag = true;
              }
            }
          }

          index++;
        });
      }

      setColumns(tmpCol);
    }
  }

  for (let i = 1; i < belowIndexList.length; i++) {
    document.getElementById(belowIndexList[i].id).classList.toggle("d-none");
  }
}

export function dragStart(start, columns) {
  isRegular = true;
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
      isRegular = false;
    }
  }

  if (isRegular === true) {
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
