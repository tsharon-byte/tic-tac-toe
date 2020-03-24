import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let defaultState = {
    currentPlayer: "X",
    buttonsList: Array(9).fill(null),
    gameFinished: false
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
        return (
            <div className="board">
                <table>
                    <tbody>
                    <tr>
                        <td><GameField text={convertText(this.props.buttonsList[0])} id={0}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[1])} id={1}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[2])} id={2}
                                       onClick={this.props.onClick}/></td>
                    </tr>
                    <tr>
                        <td><GameField text={convertText(this.props.buttonsList[3])} id={3}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[4])} id={4}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[5])} id={5}
                                       onClick={this.props.onClick}/></td>
                    </tr>
                    <tr>
                        <td><GameField text={convertText(this.props.buttonsList[6])} id={6}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[7])} id={7}
                                       onClick={this.props.onClick}/></td>
                        <td><GameField text={convertText(this.props.buttonsList[8])} id={8}
                                       onClick={this.props.onClick}/></td>
                    </tr>
                    </tbody>
                </table>
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
                return {finished: true, indexes: mas};
        }
    }
    return {finished: false};
}

class App extends React.Component {

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
        buttons[event.target.value] = this.state.currentPlayer;
        let gameFinished = checkGameFinished(event.target.value, buttons);
        this.setState({
            currentPlayer: currentPlayer,
            buttonsList: buttons,
            gameFinished: gameFinished.finished
        });
    }

    render() {
        return (
            <div>
                <h1>Крестики-нолики</h1>
                <Board buttonsList={this.state.buttonsList} onClick={this.handleClick}/>
                <label className={this.state.gameFinished?"Winner":"Common"}>
                    {this.state.gameFinished ? ("Игра окончена.  Победитель: " + (this.state.currentPlayer === "X" ? "O" : "X")) : ("Ваш шаг, игрок " + this.state.currentPlayer)}
                </label>
                {/*<ClearGame onClick={this.handleClearClick()} text="Начать игру"*/}
                {/*           className={this.state.gameFinished ? "StartNewGame" : "GameOngoing"}/>*/}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
