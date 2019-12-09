import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import 'react-dom';
import React from "react";

function Board() {
    let height = 500;
    return (
        <div className="Board">
            <svg height={height} width={1200}>
                {drawTiles(height)}
                {drawCircles()}
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

function drawTiles(height) {
    let ceiling = 0;
    let distance = 100;
    let tiles = [];
    let colour = ['black', 'red'];
    for(let i = 0; i < 12; i++){
        colour.reverse();
        tiles.push(Tile(distance*i,ceiling,distance+distance*i, ceiling,distance*i + (distance/2),2*distance, colour[0]));
        tiles.push(Tile(distance*i,height,distance+distance*i, height, distance*i + (distance/2), height-(2*distance), colour[1]));
    }
    return tiles
}

export default Board;