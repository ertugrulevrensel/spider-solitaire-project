const card = [
  { rank: 1, name: "A" },
  { rank: 2, name: "2" },
  { rank: 3, name: "3" },
  { rank: 4, name: "4" },
  { rank: 5, name: "5" },
  { rank: 6, name: "6" },
  { rank: 7, name: "7" },
  { rank: 8, name: "8" },
  { rank: 9, name: "9" },
  { rank: 10, name: "10" },
  { rank: 11, name: "J" },
  { rank: 12, name: "Q" },
  { rank: 13, name: "K" },
];
export const itemColumns = {
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
export let sideDesc = [];
export function shuffle(setColumns, setCompleteDeckCount, setPoints) {
  setPoints(500);
  setCompleteDeckCount(0);
  sideDesc = [];
  let deckEight = [];
  let idCounter = 0;
  for (let y = 0; y < card.length * 8; y++) {
    deckEight.push({
      id: idCounter,
      card: card[y % 13],
      isOpen: false,
      isDrag: false,
    });
    idCounter = idCounter + 1;
  }
  let tmpCol = { ...itemColumns };

  for (let i = 0; i < 104; i++) {
    let random = Math.ceil(Math.random() * (103 - i));
    if (i < 50) {
      let tmpItems = tmpCol[i % 10];
      let copiItem = [...tmpItems.items];
      copiItem.splice(0, 0, deckEight[random]);

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
      tmpCol = {
        ...tmpCol,
        [i % 4]: {
          ...tmpItems,
          items: copiItem,
        },
      };
    } else {
      deckEight[random].isOpen = true;
      deckEight[random].isDrag = true;
      sideDesc.push(deckEight[random]);
    }
    deckEight.splice(random, 1);
  }

  for (let r = 0; r < 10; r++) {
    tmpCol[r].items[tmpCol[r].items.length - 1].isDrag = true;
    tmpCol[r].items[tmpCol[r].items.length - 1].isOpen = true;
  }
  setColumns(tmpCol);
}
