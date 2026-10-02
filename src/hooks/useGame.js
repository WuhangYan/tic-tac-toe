import React, { useState, useMemo } from 'react';
import { checkWinner } from '../utils/game';


function useGame() {
    const [history, setHistory] = useState(() => [{ squares: Array(9).fill(null), coordinate: null }]);

    const last = history[history.length - 1];
    const squares = last.squares;
    const winnerInfo = useMemo(() => checkWinner(squares), [squares])
    const winner = winnerInfo && winnerInfo.winner;
    const winnerLine = winnerInfo && winnerInfo.winnerLine;

    const currentMove = history.length % 2 === 1 ? 'X' : 'O';


    const handleMove = (i) => {
        const squares = history[history.length - 1].squares.slice();
        let coordinate = {};
        if (squares[i] !== null || winner) {
            return;
        }
        squares[i] = currentMove;
        coordinate = i;
        setHistory(h => h.concat({ squares, coordinate }));
    }

    const jumpTo = (i) => {
        const winner = i === history.length - 1 ? winner : null;
        setHistory(h => h.slice(0, i + 1));
    }
    return { last, history, currentMove, winner, winnerLine, handleMove, jumpTo };

}

export default useGame;