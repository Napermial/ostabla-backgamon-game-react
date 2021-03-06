import React from "react";
import './Rock.css';
import Draggable from "react-draggable";
import Circle from "./Circle";

export default class Rock extends React.Component{

    constructor(props){
        super(props);
        this.state.key = props.uniqueKey;
    }
    state = {
        position : {
            xPosition : this.props.xPos,
            yPosition : this.props.yPos
        },
        key : null,
        offset:0,
        // availablePlaces: this.props.freePlaces
    };


    // componentDidMount(){
    //     this.setState({availablePlaces:this.props.freePlaces})
    // }
    //
    // componentDidUpdate(prevProps, prevState){
    //     console.log(prevProps.freePlaces);
    //     if (this.props.freePlaces !== prevProps.freePlaces){
    //         this.fetchData(this.props.freePlaces);
    //         this.setState({availablePlaces: prevProps.freePlaces})
    //     }
    // }

    // static getDerivedStateFromProps(props, state){
    //     console.log(props)
    // }

    onControlledDragStop = (e) => {
        let place = findClosestPlace(
            this.props.freePlaces,{
                x:e.x - e.target.parentNode.getBoundingClientRect().left,
                y:e.y - e.target.parentNode.getBoundingClientRect().top
            },
            this.state.position);
        this.setState({position:{xPosition: place.x,yPosition: place.y}});
        this.props.onMove(place);
        // e.target.setAttribute('transform', 'translate(0,0)');
    };

    onControlledDrag = (e, position) => {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };

    onDragStart = (e) => {

    };

    render() {
        return (
            <Draggable
                onStart={this.onDragStart.bind(this, this.state)}
                onStop={this.onControlledDragStop}
                onDrag={this.onControlledDrag}
            >
                <Circle uniqueKey={this.props.uniqueKey}
                        position={this.state.position}
                        colour={this.props.colour}
                        translate={this.state.translate}

                        style={this.style}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onTouchStart={this.onTouchStart}
                        onTouchEnd={this.onTouchEnd}
                />
            </Draggable>

    )
    }

}

function findClosestPlace(places, pos, original) {
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
    return places[others.indexOf(min)].position;


}


// eslint-disable-next-line no-extend-native
Array.prototype.hasMin = function(attrib) {
    return (this.length && this.reduce(function(prev, curr){
        return prev[attrib] < curr[attrib] ? prev : curr;
    })) || null;
};