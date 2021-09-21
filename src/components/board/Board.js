import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'
import User from "./User";

/**
 * handles most of the states from user state to rocks on the Board
 */
export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.user1 = new User('Ferenc', "burlywood", 1);
        this.user2 = new User('József', "silver", 2);
        this.state = {
            moveableRocks: [],
            availableSpaces: this.findAvailableSpaces(),
            round: 0,
            roll: Math.floor(Math.random() * 6) + 1,
            currentPlayer: this.user1
        };
    }

    user1 = new User('Ferenc', "burlywood", 1);
    user2 = new User('József', "silver", 2);

    tileList = createTilesRepresentation(1200);

    rockArrays = arrayGeneratorForRocks();

    /**
     * updates the Rock positions based on the DOM
     */
    handleMove = () => {
        let playerRocks = document.querySelectorAll(".Circle")
        for (let tile of this.tileList){
            for (let position of tile.positions){
                position.isEmpty = true;
                for (let playerRock of playerRocks){
                    if (position.x === playerRock.cx.baseVal.value
                        && position.y === playerRock.cy.baseVal.value){
                        position.isEmpty = false;
                        break;
                    }
                }
            }
        }
        this.handleTurn()
    };

    /**
     * changes user and rereolls the dice
     */
    handleTurn = () => {
        if (this.state.currentPlayer === this.user1){
            this.setState({currentPlayer: this.user2})
        }else{
            this.setState({currentPlayer: this.user1})
        }
        this.setState({availableSpaces: findAvailableSpaces(this.tileList)});
        this.setState({roll:Math.floor(Math.random() * 6) + 1 })
    }

    /**
     * iterates over the representation and returns the outermost rock position that is not full
     * @returns {[]} the tiles where there is free space
     */
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

    /**
     * creates the Rocks themselves from the prepared lists to the correnct positions
     * @type [Rock]
     */
    rocks = this.rockArrays.map((v) => v.map((v, i) => {
        let pos = this.tileList[v.where].positions[i];
        pos.isEmpty = false;
        let element = {position: pos, user: v.user, id: this[v.user].rocks.length, inStack: v.where, inPosition: i};
        this[v.user].rocks.push(element);
        return <Rock xPos={pos.x}
                     yPos={pos.y}
                     uniqueKey={this[v.user].name + '' + this[v.user].rocks.length}
                     key={this[v.user].name + '' + this[v.user].rocks.length}
                     id={this[v.user].name + '' + this[v.user].rocks.length}
                     owner={this[v.user].name}
                     colour={this[v.user].colour}
                     freePlaces={this.findAvailableSpaces()}
                     moveable={true}
                     onMove={this.handleMove}
                     beforeMove={this.checkMobility.bind(this)}
        />
    }));

    /**
     * traverses the tiles and the rocks to determine if the rock is moveable
     * - the correct user tries to move them and the rock is in a moveable position
     * @param e event of mousedown
     * @returns {boolean} the mobility of the Rock
     */
    checkMobility(e) {
        for (let tile of this.tileList){
            for(let pos of tile.positions){
                for(let rockStack of this.rocks){
                    for (let rock of rockStack){
                        if (pos.x === e.target.cx.baseVal.value && pos.y === e.target.cy.baseVal.value
                            && rock.props.owner === this.state.currentPlayer){
                            return true
                        }
                    }
                }
            }
        }
        return false;
    }

    render() {
        return (
            <div className="Board">
                <h3> {this.state.currentPlayer.name} 's Turn roll: {this.state.roll}</h3>
                <h4>{this.user1.name + ': ' + this.user1.score + ', ' + this.user2.name + ': ' + this.user2.score}</h4>
                <svg height={this.props.height} key={'boardSVG'} width={1200}>
                    {drawTiles(this.props.height)}
                    {this.rocks}
                </svg>
            </div>
        )
    }
}

/**
 * creates the Tiles which are positioned on the Board
 * @param height height of the Board
 * @returns {Tile[]}
 */
function drawTiles(height) {
    let ceiling = 0;
    let distance = 100;
    let tiles = new Array(24);
    let colour = ['black', 'red'];
    for (let i = 0; i < 12; i++) {
        colour.reverse();
        tiles.push(
            Tile(
                distance * i,
                ceiling,
                distance + distance * i,
                ceiling,
                distance * i + (distance / 2),
                2 * distance, colour[0],
                'top' + i)
        );
        tiles.push(
            Tile(
                distance * i,
                height,
                distance + distance * i,
                height,
                distance * i + (distance / 2),
                height - (2 * distance),
                colour[1],
                'bottom' + i
            )
        );
    }
    return tiles
}

/**
 * Calculates the positions and the size of the Tiles - the triangles
 * @param width widthe of the Board
 * @returns {[]} tiles as a datastructure
 */
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

/**
 * searches for non full positions where another Rock can be placed
 * @param tileList grid representation of Tile places where Rocks can be placed
 * @returns {[]} list of available places in the grid
 */
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

/**
 * determines to which position of the Board a Rock needs to be placed for the classical allignment
 * @returns {any[][]} Rock places
 */
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
