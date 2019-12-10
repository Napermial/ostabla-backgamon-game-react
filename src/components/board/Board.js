import './Board.css';
import Rock from "../rock/Rock";
import Tile from "../tile/Tile";
import React from "react";
import 'react-dom'

export default class Board extends React.Component {
    onDragOver = (ev) => {
        ev.preventDefault();
    };
    constructor(props) {
        super(props)
    }
    render(){
    return (
        <div className="Board">
            <svg height={this.props.height} width={1200}>
                {drawTiles(this.props.height)}
                <Rock uniqueKey={1} xPos={200} yPos={200}/>
            </svg>
            <div className="yea" onDragOver={(e)=>this.onDragOver(e)}>there can be dragged stuff</div>
        </div>
        )

    }
}






// function Board() {
//     let tiles = [];
//     for (let i = 0; i < 24; i++) {
//         tiles[i] = new Array(5);
//     }
//     let height = 500;
//     return (
//         <div className="Board">
//             <svg height={height} width={1200}>
//                 {drawTiles(height)}
//                 {drawCircles(tiles)}
//             </svg>
//         </div>
//     );
// }

function drawCircles(tiles) {
    let r = 40;
    let list = new Array(5);
    for (let i = 0; i < 5; i++) {
        let temp = {'yPos': 50, 'xPos': r / 2 + i * r, 'uniqueKey': i};

        new Rock(temp)
    }
    let i = 1;
    let temp = {'yPos': 50, 'xPos': r / 2 + i * r, 'uniqueKey': i};
    return new Rock(temp)
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
