import { shuffle } from "../../deck";

export default function newGame(
  setColumns,
  setCompleteDeckCount,
  setPoints,
  reset
) {
  // point, complete deck count and time set default value
  reset();
  setPoints(500);
  setCompleteDeckCount(0);
  shuffle(setColumns);
}
