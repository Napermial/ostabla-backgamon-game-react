import React from "react";
import 'react-dom';

function Rock(xPos, yPos) {
    return (
        <circle className="Rock" cx={xPos} cy={yPos} r={20}/>
    );
}

export default Rock;