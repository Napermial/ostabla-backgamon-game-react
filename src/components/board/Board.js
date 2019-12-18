import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'
import User from "./User";

export default class Board extends React.Component {
    user1 = new User('Bandi', "burlywood", 1);
    user2 = new User('Károly', "silver", 2);

    state = {};
    tileList = createTilesRepresentation(1200);
    availableSpaces = findAvailableSpaces(this.tileList);
    rockArrays = arrayGeneratorForRocks();
    handleMove(e){
        
    }
    rocks = this.rockArrays.map((v) => v.map((v, i) => {
        let pos = this.tileList[v.where].positions[i];
        pos.isEmpty = false;
        this.availableSpaces = findAvailableSpaces(this.tileList);
        let element = {position:pos, user:v.user, id:this[v.user].rocks.length, inStack:v.where, inPosition:i};
        this[v.user].rocks.push(element);
        return <Rock xPos={pos.x} yPos={pos.y} uniqueKey={this[v.user].name + '' + this[v.user].rocks.length}
                     colour={this[v.user].colour} freePlaces={this.availableSpaces} moveable={checkMobility()}
        onChange={this.handleMove}/>
    }));


    render() {
        return (
            <div className="Board">
                <h3> 's Turn</h3>
                <h4>{this.user1.name + ':' + this.user1.score + ', ' + this.user2.name + ': ' + this.user2.score}</h4>
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
        for (let [index, poz] of Object.entries(value.positions)) {
            if (poz.isEmpty === true) {
                availableSpaces.push({where: key, index: index, position: poz});
                break;
            }
        }
    }
    return availableSpaces;
}

function arrayGeneratorForRocks() {
    return Array.of(
        Array(5).fill({where: 13, user: "user1"}),
        Array(5).fill({where: 1, user: "user1"}),
        Array(3).fill({where: 12, user: "user1"}),
        Array(2).fill({where: 0, user: "user1"}),
        Array(5).fill({where: 10, user: "user2"}),
        Array(5).fill({where: 22, user: "user2"}),
        Array(3).fill({where: 11, user: "user2"}),
        Array(2).fill({where: 23, user: "user2"}));
}

function checkMobility(rock) {

}