import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'
import User from "./User";

export default class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.handleMove = this.handleMove.bind(this);
    // }

    user1 = new User('Ferenc', "burlywood", 1);
    user2 = new User('József', "silver", 2);

    tileList = createTilesRepresentation(1200);
    state = {
        moveableRocks: [],
        availableSpaces: this.findAvailableSpaces(),
        round:0,
        roll:Math.floor(Math.random() * 6)
    };
    rockArrays = arrayGeneratorForRocks();
    handleMove = (e) => {
        for (let [listIndex, list] of this.tileList.entries()){
            for (let [elementIndex, element] of list.positions.entries()){
                if (element.x === e.x && element.y === e.y){
                    this.tileList[listIndex].positions[elementIndex].isEmpty = false;
                    break;
                }
            }
        }
        this.setState( {availableSpaces: this.findAvailableSpaces()});
        for (let rock of this.rocks){
            rock.freePlaces = this.findAvailableSpaces();
        }
        console.log(this.findAvailableSpaces())
    };



    rocks = this.rockArrays.map((v) => v.map((v, i) => {
        let pos = this.tileList[v.where].positions[i];
        pos.isEmpty = false;
        let element = {position: pos, user: v.user, id: this[v.user].rocks.length, inStack: v.where, inPosition: i};
        this[v.user].rocks.push(element);
        return <Rock xPos={pos.x}
                     yPos={pos.y}
                     uniqueKey={this[v.user].name + '' + this[v.user].rocks.length}
                     colour={this[v.user].colour}
                     freePlaces={this.findAvailableSpaces()}
                     moveable={0}
                     onMove={this.handleMove}
                     onStart={this.onStartHandle}
                     // onChange={this.handleMove}
        />
    }));

    findAvailableSpaces() {
        let availableSpaces = [];

        for (let [key, value] of Object.entries(this.tileList)) {
            for (let [index, poz] of Object.entries(value.positions)) {
                if (poz.isEmpty === true) {
                    availableSpaces.push({where: key, index: index, position: poz});
                    break;
                }
            }
        }
        return availableSpaces;
    };

    render() {
        checkMobility(this.tileList);
        return (
            <div className="Board">
                <h3> 's Turn roll: {this.state.roll}</h3>
                <h4>{this.user1.name + ': ' + this.user1.score + ', ' + this.user2.name + ': ' + this.user2.score}</h4>
                <svg height={this.props.height} key='boardSVG' width={1200}>
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


function checkMobility(tileList) {
    // console.log(tileList);
}