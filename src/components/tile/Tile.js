import React from "react";
import './Tile.css';

function Tile(x1, x2, y1, y2, z1, z2, colour) {
    return (
    <polygon className="Tile" points={x1 + ',' + x2 + ' ' + y1 + ',' + y2 + ' ' + z1 + ',' + z2} fill={colour} />
    )
}

export default Tile;