import React from 'react';
import Square from './square';
import Move from './move';
import useGame from '../hooks/useGame';

function Board() {
    const { last, history, currentMove, winner, winnerLine, handleMove, jumpTo } = useGame();

    const lastSquares = last.squares;
    const lastMove = last.coordinate;

    const boards = [0, 1, 2].map(i => {
        const squareLine = [0, 1, 2].map(j => {
            const idx = i * 3 + j;
            return (
                <Square
                    value={lastSquares[idx]}
                    onMove={() => handleMove(idx)}
                    isBold={winnerLine ? winnerLine.indexOf(idx) > -1
                        : lastMove === idx}
                    key={idx}
                />
            )
        })
        return (
            <div
                className="row"
                key={i}
            >
                {squareLine}
            </div>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                {boards}
            </div>
            <div className="game-info">
                <div>
                    {winner ? `Winner is: ${winner}` :
                        `Next player: ${currentMove}`}
                </div>
                <Move history={history} jumpTo={jumpTo} />
                <div className={history.length === 10 && winner === null ? '' : 'hide'}>{'DRAW, please tap on \'Go to game start\''}</div>
            </div>
        </div>
    )
}
export default Board;
