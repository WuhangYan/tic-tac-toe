import React, { useState, useMemo,useCallback, useEffect } from 'react';
import { checkWinner, isDraw } from '../utils/game';
import { getBestMove } from '../utils/minmax';


function useGame() {
    const [history, setHistory] = useState(() => [{ squares: Array(9).fill(null), move: null }]);

    const last = history[history.length - 1];
    const squares = last.squares;
    const winnerInfo = useMemo(() => checkWinner(squares), [squares])
    const winner = winnerInfo && winnerInfo.winner;
    const winnerLine = winnerInfo && winnerInfo.winnerLine;

    const currentPlayer = history.length % 2 === 1 ? 'X' : 'O';


    const handleMove = (i) => {
        const squares = history[history.length - 1].squares.slice();
        if (squares[i] !== null || winner) {
            return;
        }
        squares[i] = currentPlayer;
        setHistory(h => [...h, { squares, move: i }]);
    }

    const jumpTo = (i) => {
        setHistory(h => h.slice(0, i + 1));
    }

    useEffect(() => {
        if(currentPlayer === 'X') return;
        if(winner) return;
        if(isDraw(history)) return;
        
        const lastSquare = last.squares;
        const move = getBestMove(lastSquare);
        if(move < 0) return;
        const delay = setTimeout(() => {handleMove(move)}, 500);
        return () => {clearTimeout(delay)};


    }, [currentPlayer, last, winner, handleMove])

    return { last, history, currentPlayer, winner, winnerLine, handleMove, jumpTo };

}

export default useGame;