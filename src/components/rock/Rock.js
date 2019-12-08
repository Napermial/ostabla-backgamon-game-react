import React from "react";
import 'react-dom';

function Rock(xPos, yPos, uniqueKey) {
    return (
        <circle className="Rock" cx={xPos} cy={yPos} r={20} key={uniqueKey}/>
    );
}

export default Rock;