import React from 'react';
import './App.css';
import Board from "../board/Board";


export default class App extends React.Component {



    render() {
        return (
            <div className="App">
                <Board height={500}/>
            </div>
        )
    }

}

