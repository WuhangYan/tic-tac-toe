
import { isDraw, checkWinner, getAvailableSlot, makeMove } from "./game";

/**
 * 
 * @param {*} squares 
 * @param {*} currentPlayer 'X' for Human, 'O' for AI
 * @param {*} depth the weight that carries 
 */
function minmax(squares, currentPlayer, depth) {
    const winnerInfo = checkWinner(squares);
    if (winnerInfo) {
        if (currentPlayer === 'X') {
            return 10 - depth;
        }
        if (currentPlayer === 'O') {
            return depth - 10;
        }
    }

    const moves = getAvailableSlot(squares);
    if(moves.length === 0) return 0;

    const scores = moves.map(m => {
        const next_square = makeMove(squares, currentPlayer, m);
        return minmax(next_square, currentPlayer === 'X' ? 'O' : 'X', depth + 1);
    })
    return currentPlayer === 'X' ? Math.min(...scores) : Math.max(...scores);
}

export function getBestMove(squares) {
    let bestScore = -Infinity, bestMove = -1;
    const moves = getAvailableSlot(squares);
    moves.forEach(m => {
        const next_square = makeMove(squares, 'O', m);
        const score = minmax(next_square, 'X', 1);
        if(score > bestScore) {
            bestScore = score;
            bestMove = m;
        }
    })
    return bestMove;
}

