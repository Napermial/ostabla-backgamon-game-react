import React from "react";
import './Rock.css';
import Draggable from "react-draggable";

export default class Rock extends React.Component{

    constructor(props){
        super(props);
        this.state.key = props.uniqueKey;
        this.availablePlaces = props.freePlaces;
    }
    state = {
        position : {
            xPosition : this.props.xPos,
            yPosition : this.props.yPos
        },
        key : null,
        translate:'none'
    };



    onControlledDrag = (e) => {
        let x = e.x;
        let y = e.y;
        this.setState({position:{xPosition: x,yPosition: y}});
        this.setState({translate:'none'})
    };


    onControlledDragStop = (e, position) => {
        console.log(position);
        let place = findClosestPlace(this.availablePlaces,{x:e.x,y:e.y}, this.state.position);
        console.log(place);
        this.onControlledDrag(place);
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
                    transform={this.state.translate}
                />
            </Draggable>

    )
    }

}

function findClosestPlace(places, pos, original) {
    console.log('oroginal pos ' + original.xPosition + ' , '+ original.yPosition);
    original.distanceFrom = Math.sqrt(Math.pow(pos.x - original.xPosition ,2) *
        Math.pow(pos.y -original.yPosition , 2));
    let others = [];
    for(let bigger of places){
        others.push({
                distance:
                    Math.sqrt(Math.pow(pos.x - bigger.position.x ,2) *
                    Math.pow(pos.y - bigger.position.y, 2)),
                x:bigger.position.x,
                y:bigger.position.y
        })
    }
    if (others.every((current) => {
        return original.distanceFrom < current.distance}
        )){
        return {x:original.xPosition, y:original.yPosition}
    }
    let min = others.hasMin("distance");
    console.log(min);
    return places[others.indexOf(min)].position;


}


// eslint-disable-next-line no-extend-native
Array.prototype.hasMin = function(attrib) {
    return (this.length && this.reduce(function(prev, curr){
        return prev[attrib] < curr[attrib] ? prev : curr;
    })) || null;
};