import React, {useState} from 'react';

function Move({ history, jumpTo }) {
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
        moves.reverse();
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

export default Move;