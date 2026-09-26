import React, { useState, useEffect } from 'react';
import Board from './board';
import { winnerCheck } from '../utils/game';


function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), coordinate: null }]);
    const [isCurrentUser, setIsCurrentUser] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winnerLine, setWinnerLine] = useState(null);

    const initialNewGame = () => {
        setHistory(h => h.push({ squares: Array(9).fill(null), coordinate: null }));
    }

    const handleMove = (i) => {
        const squares = history[history.length - 1].squares.slice();
        let coordinate = {};
        if (squares[i] !== null || winner) {
            return;
        }
        squares[i] = isCurrentUser ? 'X' : 'O';
        coordinate = i;
        setHistory(h => h.concat({ squares, coordinate }));
        setIsCurrentUser(!isCurrentUser);
        const winnerInfo = winnerCheck(squares);
        if (winnerInfo) {
            setWinner(winnerInfo.winner);
            setWinnerLine(winnerInfo.winnerLine);
        }
    }

    const jumpTo = (i) => {
        const winner = i === history.length - 1 ? winner : null;
        setIsCurrentUser(i % 2 === 0);
        setHistory(h => h.slice(0, i + 1));
        setWinner(winner);
        setWinnerLine(winner ? winnerLine : null);
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history[history.length - 1].squares}
                    onMove={(i) => { handleMove(i) }}
                    currentMove={history[history.length - 1].coordinate}
                    winnerLine={winnerLine}
                />
            </div>
            <div className="game-info">
                <div>
                    {winner ? `Winner is: ${winner}` :
                        `Next player: ${isCurrentUser ? 'X' : 'O'}`}
                </div>
                <Move history={history} jumpTo={jumpTo} />
                <div className={history.length === 10 && winner === null ? '' : 'hide'}>{'DRAW, please tap on \'Go to game start\''}</div>
            </div>
        </div>
    )

}

function Move({history, jumpTo}) {
    const [isDescending, setIsDescending] = useState(false);
    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move} (${Math.floor(step.coordinate / 3)}, ${step.coordinate % 3})` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => { jumpTo(move) }}>{desc}</button>
            </li>
        )
    })
    if (isDescending) {
        moves = moves.reverse();
    }

    const handleToggleReverse = () => {
        setIsDescending(!isDescending);
    }

    return (
        <>
            <input type="checkbox" onChange={handleToggleReverse} id="switch" className="checkbox hide" />
            <label for="switch" className="toggle">
            </label>
            {
                isDescending ? <ol reversed>{moves}</ol> : <ol>{moves}</ol>
            }
        </>
    )
}

export default Game;