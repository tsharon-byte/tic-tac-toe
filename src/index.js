import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let defaultState = {
    currentPlayer: "X",
    buttonsList: Array(9).fill(null),
    gameFinished: false,
    message:"Ваш шаг, игрок X"
};

class GameField extends React.PureComponent {
    render() {
        return (<button onClick={this.props.onClick} value={this.props.id}
                        className="GameField">{this.props.text}</button>);
    }
}

function ClearGame(props) {
    return <div>
        <button onClick={props.onClick} className={props.className}>{props.text}</button>
    </div>
}

function convertText(text) {
    const O = <span className="O"><i className="far fa-circle"></i></span>;
    const X = <span className="X"><i className="fas fa-times"></i></span>;
    switch (text) {
        case 'X':
            return X;
        case 'O':
            return O;
        default:
            return text;
    }
}

class Board extends React.PureComponent {
    render() {
        let mas = [];
        for (let i = 0; i < 9; i++) {
            let text = convertText(this.props.buttonsList[i]);
            mas.push(<GameField id={i} onClick={this.props.onClick} text={text}/>);
        }
        return (
            <div className="board">
                {mas}
            </div>
        );
    }
}

function checkGameFinished(currentIx, buttonsList) {
    let winner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let mas of winner) {
        if (mas.includes(+currentIx)) {
            let [a, b, c] = mas;
            if (buttonsList[a] === buttonsList[b] && buttonsList[b] === buttonsList[c])
                return true;
        }
    }
    return false;
}

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, defaultState);
        this.handleClick = this.handleClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    handleClearClick() {
        this.setState(defaultState);
    }

    handleClick(event) {
        let currentPlayer = (this.state.currentPlayer === "X" ? "O" : "X");
        if (this.state.gameFinished) {
            alert("Игра окончена.  Победитель: " + currentPlayer);
            return;
        }
        if (this.state.buttonsList[event.target.value] != null) {
            return;
        }
        let buttons = this.state.buttonsList.slice();
        let message="";
        buttons[event.target.value] = this.state.currentPlayer;
        let gameFinished = checkGameFinished(event.target.value, buttons);
        if(gameFinished){
            message="Игра окончена.  Победитель: " + this.state.currentPlayer;
        }
        else{gameFinished = !buttons.includes(null);
        if(gameFinished){
            message = "Игра окончена. Ничья."
        }
        else{
            message="Ваш ход, игрок " + currentPlayer;
        }}
        this.setState({
            currentPlayer: currentPlayer,
            buttonsList: buttons,
            gameFinished: gameFinished,
            message:message
        });
    }

    render() {
        return (
            <div>
                <h1>Крестики-нолики</h1>
                <Board buttonsList={this.state.buttonsList} onClick={this.handleClick}/>
                <label className={this.state.gameFinished?"Winner":"Common"}>
                    {this.state.message}
                </label>
                <ClearGame onClick={this.handleClearClick} text="Начать игру"
                           className={this.state.gameFinished ? "StartNewGame" : "GameOngoing"}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
