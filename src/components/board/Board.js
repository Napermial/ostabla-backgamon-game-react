import './Board.css';
import Rock from "../rock/Rock";
import 'react-dom';
import React from "react";

function Board() {
    return (
        <div className="Board">
            <svg height={600} width={600}>
                {drawCircles()}
            </svg>
        </div>
    );
}

function drawCircles() {
    let rocks = [];
    for (let i = 1; i < 3; i++){
        for (let j = 0; j < 5; j++){
            let rock = Rock(40*i, 40*j+20);
            rocks.push(rock)
        }
    }
    return rocks;
}

export default Board;