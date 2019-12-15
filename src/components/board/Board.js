import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'
import User from "./User";

export default class Board extends React.Component {
    user1 = new User('Bandi', "burlywood");
    user2 = new User('Károly', "silver");
    state = {};
    tileList = createTilesRepresentation(1200);
    availableSpaces = findAvailableSpaces(this.tileList);
    rocks1 = Array(5).fill(null).map((v, i) => {
        let pos = this.availableSpaces[0];
        this.tileList[pos.key].positions[pos.index].isEmpty = false;
        this.availableSpaces = findAvailableSpaces(this.tileList);
        this.user1.rocks.push(this.user1.name+i);
        return <Rock xPos={pos.position.x} yPos={pos.position.y} uniqueKey={this.user1.name +''+ i} colour={this.user1.colour}/>
    });

    rocks2 = Array(5).fill(null).map((v, i) => {
        let pos = this.availableSpaces[0];
        this.tileList[pos.key].positions[pos.index].isEmpty = false;
        this.availableSpaces = findAvailableSpaces(this.tileList);
        this.user2.rocks.push(this.user2.name+i);
        return <Rock xPos={pos.position.x} yPos={pos.position.y} uniqueKey={this.user2.name +''+ i} colour={this.user2.colour}/>
    });


    render() {
        return (
            <div className="Board">
                <h4>{this.user1.name + ':' + this.user1.extraRocks + ', ' + this.user2.name +': ' + this.user2.extraRocks}</h4>
                <svg height={this.props.height} width={1200}>
                    {drawTiles(this.props.height)}
                    {this.rocks1}
                    {this.rocks2}
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

function createTilesRepresentation(width) {
    let tileList = [];
    for (let i = 0; i < 12; i++) {
        let topPositions = [];
        let bottomPositions = [];
        for (let j = 0; j < 5; j++) {
            let position = {x: i * 100 + 50, y: j * 40 + 20, isEmpty: true};
            topPositions.push(position);
            position = {x: width - i * 100 - 50, y: 500 - j * 40 - 20, isEmpty: true};
            bottomPositions.push(position);
        }
        tileList.push({positions: topPositions});
        tileList.push({positions: bottomPositions});
    }
    return tileList;
}

function findAvailableSpaces(tileList) {
    let availableSpaces = [];

    for (let [key, value] of Object.entries(tileList)) {
        for (let [index,poz] of Object.entries(value.positions)) {
            if (poz.isEmpty === true) {
                availableSpaces.push({key :key, index: index, position:poz});
                break;
            }
        }
    }
    return availableSpaces;
}



