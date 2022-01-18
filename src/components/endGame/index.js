import React, { useContext, useEffect } from "react";
import "./endGame.scss";
import { context, timerContext } from "../../context";
import restart from "../../assets/restart.png";
import newGame from "../../process/newGame";

function EndGame(props) {
  const { setColumns, setCompleteDeckCount, points, setPoints } =
    useContext(context);

  const { seconds, minutes, reset, pause } = useContext(timerContext);

  // time paused when game ended
  useEffect(() => {
    pause();
  }, []); //eslint-disable-line

  return (
    <div className="endGameModal d-flex p-fixed align-center justify-center bg4b9ce2O7">
      <div className="d-flex endGame align-center flex-d-col">
        {props.winOrLose === "win" ? (
          <>
            <p>Congratulations!!</p>
            <p>Your Score : {points}</p>
            <p>
              You Finished in {minutes}:{seconds}
            </p>
          </>
        ) : (
          <>
            <p>Game Over</p>
            <p>Do You Want Try Again?</p>
          </>
        )}
        <img
          onClick={() =>
            newGame(setColumns, setCompleteDeckCount, setPoints, reset)
          }
          src={restart}
          alt="restart"
        ></img>
      </div>
    </div>
  );
}

export default EndGame;
