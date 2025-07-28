import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

function TicTacToe() {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [data, setData] = useState(Array(9).fill(""));

  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const toggle = (e, num) => {
    if (lock) return;

    const icon = count % 2 === 0 ? crossIcon : circleIcon;
    e.target.innerHTML = `<img src=${icon} />`;
    data[num] = count % 2 === 0 ? "x" : "o";
    setCount(count + 1);
    checkWinner();
  };

  const wonPlayer = (winner) => {
    setLock(true);

    const icon = winner === "x" ? crossIcon : circleIcon;
    titleRef.current.innerHTML = `Winner: <img src=${icon} />`;
  };

  const checkWinner = () => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        wonPlayer(data[c]);
      }
    }
  };

  const resetGame = () => {
    setLock(false);
    setCount(0);
    setData(Array(9).fill(""));
    titleRef.current.innerHTML = "<span>Tic Tac Toe Game</span>";
    boxArray.forEach((element) => {
      element.current.innerHTML = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        <span>Tic Tac Toe Game</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div
            className="boxes"
            ref={box1}
            onClick={(e) => {
              toggle(e, 0);
            }}
          ></div>
          <div
            className="boxes"
            ref={box2}
            onClick={(e) => {
              toggle(e, 1);
            }}
          ></div>
          <div
            className="boxes"
            ref={box3}
            onClick={(e) => {
              toggle(e, 2);
            }}
          ></div>
        </div>
        <div className="row2">
          <div
            className="boxes"
            ref={box4}
            onClick={(e) => {
              toggle(e, 3);
            }}
          ></div>
          <div
            className="boxes"
            ref={box5}
            onClick={(e) => {
              toggle(e, 4);
            }}
          ></div>
          <div
            className="boxes"
            ref={box6}
            onClick={(e) => {
              toggle(e, 5);
            }}
          ></div>
        </div>
        <div className="row3">
          <div
            className="boxes"
            ref={box7}
            onClick={(e) => {
              toggle(e, 6);
            }}
          ></div>
          <div
            className="boxes"
            ref={box8}
            onClick={(e) => {
              toggle(e, 7);
            }}
          ></div>
          <div
            className="boxes"
            ref={box9}
            onClick={(e) => {
              toggle(e, 8);
            }}
          ></div>
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          resetGame();
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe;
