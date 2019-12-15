import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'

export default class Board extends React.Component {
    state = {};
    r = 40;
    list = [...Array(5).keys()];
    tileList = createTilesRepresentation(this.props.height);
    availableSpaces = findAvailableSpaces(this.tileList);
    rocks = this.list.map((i) => <Rock xPos={this.availableSpaces[i].x} yPos={this.availableSpaces[i].y} uniqueKey={'playerOne' + i}/>);


    render() {
        return (
            <div className="Board">
                <svg height={this.props.height} width={1200}>
                    {drawTiles(this.props.height)}
                    {this.rocks}
                </svg>
            </div>
        )

    }
}


function drawTiles(height) {
    let ceiling = 0;
    let distance = 100;
    let tiles = new Array(24);
    let colour = ['black', 'red'];
    for (let i = 0; i < 12; i++) {
        colour.reverse();
        tiles.push(Tile(distance * i, ceiling, distance + distance * i, ceiling, distance * i + (distance / 2), 2 * distance, colour[0], 'top' + i));
        tiles.push(Tile(distance * i, height, distance + distance * i, height, distance * i + (distance / 2), height - (2 * distance), colour[1], 'bottom' + i));
    }
    return tiles
}

function createTilesRepresentation(height) {
    let tileList = [];
    for (let i = 0; i < 12; i++) {
        let topPositions = [];
        let bottomPositions = [];
        for (let j = 0; j < 5; j++) {
            let position = { x: i * 100 + 50, y: j * 40 + 20, isEmpty: true};
            topPositions.push(position);
            position = {x: height - i * 100 + 50, y: 500 - j * 40 - 20, isEmpty: true};
            bottomPositions.push(position);
        }
        tileList.push({positions: topPositions});
        tileList.push({positions: bottomPositions});
    }
    console.log(tileList);
    return tileList;
}

function findAvailableSpaces(tileList) {
    let availableSpaces = [];

    for (let [key, value] of Object.entries(tileList)){
        for (let poz of value.positions){
            if (poz.isEmpty === true) {
                availableSpaces.push(poz);
                break;
            }
        }
    }
    return availableSpaces;
}
