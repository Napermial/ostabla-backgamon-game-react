import React from "react";
import './Rock.css';
import Draggable from "react-draggable";

export default class Rock extends React.Component{

    constructor(props){
        super(props);
        this.state.key = props.uniqueKey;
        this.state.position.xPosition = props.xPos;
        this.state.position.yPosition = props.yPos;
    }
    state = {
        position : {
            xPosition : this.props.xPos,
            yPosition : this.props.yPos
        },
        key : null
    };

    onControlledDrag = (e) => {
        let x = e.target.x;
        let y = e.target.y;
        this.setState({position: {x, y}});
    };


    onControlledDragStop = (e, position) => {
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
                    cx={this.props.xPos}
                    cy={this.props.yPos}
                    r={20}
                    fill={this.props.colour}
                />
            </Draggable>

    )
    }

}