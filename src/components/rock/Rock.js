import React from "react";
import 'react-dom';
import './Rock.css';

export default class Rock extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        'xPosition' : this.props.xPos,
        'yPosition' : this.props.yPos
    };

    ondragstart = (e, name) =>{
        console.log(name);
        e.dataTransfer.setData("text/plain", name)
    };

    render() {


        return (<circle
            className="Rock"
            key={this.props.uniqueKey}
            cx={this.props.xPos}
            cy={this.props.yPos}
            r={20}
            draggable
            onDragStart={(event) => this.ondragstart(event, this.props.uniqueKey) }
        />)
    }

}