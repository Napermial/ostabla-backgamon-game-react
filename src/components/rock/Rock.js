import React from "react";
import './Rock.css';
import Draggable from "react-draggable";

export default class Rock extends React.Component{

    constructor(props){
        super(props);
        this.state.key = props.uniqueKey;
        this.state.position.xPosition = props.xPos;
        this.state.position.yPosition = props.yPos;
        this.availablePlaces = props.freePlaces;
    }
    state = {
        position : {
            xPosition : this.props.xPos,
            yPosition : this.props.yPos
        },
        key : null
    };



    onControlledDrag = (e) => {
        let x = e.x;
        let y = e.y;
        console.log('targetxy'+x,y)
        this.state.position = {xPosition:x,yPosition: y }
    };


    onControlledDragStop = (e, position) => {
        let place = findClosestPlace(this.availablePlaces,{x:e.x,y:e.y}, this.state.position);
        console.log(e.y);
        console.log(e.x);
        this.onControlledDrag(e, position);
        console.log(this.state.key);
    };




    render() {
        return (
            <Draggable
                onStop={this.onControlledDragStop}
            >
                <circle
                    className="Rock"
                    key={this.props.uniqueKey}
                    cx={this.state.position.xPosition}
                    cy={this.state.position.yPosition}
                    r={20}
                    fill={this.props.colour}
                />
            </Draggable>

    )
    }

}

function findClosestPlace(places, pos, original) {
    console.log(original);
    for(let bigger of places){

           console.log( Math.sqrt(Math.pow(bigger.position.x - pos.x,2) +
                Math.pow(bigger.position.y - pos.y, 2))
           )
    }
}