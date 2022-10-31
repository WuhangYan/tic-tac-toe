import React from 'react';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null), coordinate: null }
            ],
            xIsNext: true,
            winner: null,
            winnerLine: null,
            isDescending: false
        }
    }

    handleMove(i) {
        const history = this.state.history;
        const squares = history[history.length - 1].squares.slice();
        let coordinate = {};
        if (squares[i] !== null || this.state.winner) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        coordinate = i;
        this.setState({
            history: history.concat([{ squares, coordinate }]),
            xIsNext: !this.state.xIsNext
        })
        const winnerConfig = winnerCheck(squares);
        if (winnerConfig) {
            this.setState({
                winner: winnerConfig[0],
                winnerLine: winnerConfig[1]
            })
        }
    }

    jumpTo(i) {
        const winner = i === this.state.history.length - 1 ? this.state.winner : null;
        this.setState({
            xIsNext: i % 2 === 0,
            history: this.state.history.slice(0, i + 1),
            winner,
            winnerLine: winner ? this.state.winnerLine : null
        })
    }

    handleOnToggle(e) {
        this.setState({
            isDescending: e.target.checked
        })
    }

    render() {
        const drawNote = 'DRAW, please tap on \'Go to game start\'';
        let moves = this.state.history.map((step, move) => {
            const desc = move ? `Go to move #${move} (${Math.floor(step.coordinate/3)}, ${step.coordinate%3})` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => { this.jumpTo(move) }}>{desc}</button>
                </li>
            )
        })
        if (this.state.isDescending) {
            moves = moves.reverse();
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.history[this.state.history.length - 1].squares}
                        onMove={(i) => { this.handleMove(i) }}
                        currentMove={this.state.history[this.state.history.length - 1].coordinate}
                        winnerLine={this.state.winnerLine}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {this.state.winner ? `Winner is: ${this.state.winner}` :
                            `Next player: ${this.state.xIsNext ? 'X' : 'O'}`}
                    </div>
                    <input type="checkbox" onChange={(e) => {this.handleOnToggle(e)}} id="switch" className="checkbox hide"/>
                    <label for="switch" className="toggle">
                    </label>
                    {
                        this.state.isDescending ? <ol reversed>{moves}</ol> : <ol>{moves}</ol>
                    }
                    <div className={this.state.history.length === 10 && this.state.winner === null ? '' : 'hide'}>{drawNote}</div>
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
            return [squares[a], line];
        }
    }
    return null;
}