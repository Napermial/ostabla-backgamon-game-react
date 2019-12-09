import React from "react";
import 'react-dom';
import './Rock.css';
import Draggable from "react-draggable";

function Rock(xPos, yPos, uniqueKey) {
    return (
        <Draggable className="Rock">
            <circle  cx={xPos} cy={yPos} r={20} key={uniqueKey}/>
        </Draggable>

);
}

export default Rock;