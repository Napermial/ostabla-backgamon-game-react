import React from "react";

export default class Circle extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <circle
                className="Circle"
                key={this.props.uniqueKey}
                cx={this.props.position.xPosition}
                cy={this.props.position.yPosition}
                r={20}
                fill={this.props.colour}
                transform={this.props.translate}

                style={this.props.style}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                onTouchStart={this.props.onTouchStart}
                onTouchEnd={this.props.onTouchEnd}
            />
        )
    }

}