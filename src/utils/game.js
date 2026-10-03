const WINNER_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]

export function checkWinner(squares) {
    for (let line of WINNER_LINES) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[c] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winnerLine: line,
            }
        }
    }
    return null;
}

export function isDraw(history) {
    const lastSquares = history[history.length-1].squares;
    return history.length === 10 && checkWinner(lastSquares) === null;
}

export function getAvailableSlot(squares) {
    return squares.reduce((acc, v, i) => {
        if(v === null) {
            acc.push(i);
        }
        return acc;
    }, []); 
}

export function makeMove(squares, currentMove, i) {
    const next_square = squares.slice();
    next_square[i] = currentMove;
    return next_square;
}