import React from 'react';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null) }
            ],
            xIsNext: true,
            winner: null
        }
    }

    handleMove(i) {
        const history = this.state.history;
        const squares = history[history.length-1].squares.slice();
        if (squares[i] !== null || this.state.winner) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext
        })
        const winner = winnerCheck(squares);
        if (winner) {
            this.setState({
                winner
            })
        }
    }

    jumpTo(i) {
        const winner = i === this.state.history.length - 1 ? this.state.winner : null;
        this.setState({
            xIsNext: i%2 === 0,
            history: this.state.history.slice(0, i+1),
            winner
        })
    }

    render() {
        const moves = this.state.history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => {this.jumpTo(move)}}>{desc}</button>
                </li>
            )
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.state.history[this.state.history.length-1].squares}
                        onMove={(i) => {this.handleMove(i)}}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {this.state.winner ? `Winner is: ${this.state.winner}` :
                            `Next player: ${this.state.xIsNext ? 'X' : 'O'}`}
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function winnerCheck(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6]
    ]
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[c] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}