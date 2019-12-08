import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import 'react-dom';
import React from "react";

function Board() {
    return (
        <div className="Board">
            <svg height={500} width={800}>
                {drawCircles()}
                {drawTiles()}
            </svg>
        </div>
    );
}

function drawCircles() {
    let rocks = [];
    let id = 0;
    for (let i = 5; i < 8; i++){
        for (let j = 5; j < 10; j++){
            let rock = Rock(40*i, 40*j+20, id);
            id++;
            rocks.push(rock)
        }
    }
    return rocks;
}

function drawTiles() {
    return Tile(0,0,40,160,80,0);
}

export default Board;