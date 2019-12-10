import React from 'react';
import './App.css';
import Board from "../board/Board";


export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

        render(){
            return(
                <div className="App">
                    <Board height={500} />
                </div>
            )
        }

}

// function App() {
//   return (
//     <div className="App">
//
//     </div>
//   );
// }

