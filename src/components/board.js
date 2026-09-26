import React from 'react';
import Square from './square';

function Board(props) {

    const renderSquares = (i) => {
        return (
            <Square
                value={props.squares[i]}
                onMove={() => props.onMove(i)}
                isBold={props.winnerLine ? props.winnerLine.indexOf(i) > -1
                    : props.currentMove === i}
                key={i}
            />
        )
    }
    const boards = [];
    for (let i = 0; i < 3; i++) {
        const squares = [];
        for (let j = 0; j < 3; j++) {
            squares.push(
                renderSquares(i * 3 + j)
            )
        }
        boards.push(
            <div
                className="row"
                key={i}
            >
                {squares}
            </div>
        )
    }
    return (
        <div>
            {boards}
        </div>
    )
}
export default Board;
