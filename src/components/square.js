import React from 'react';

function Square(props) {
    return (
        <div
            className={props.isBold ? 'current-move square' : 'square'}
            onClick={() => { props.onMove() }}
        >
            {props.value}
        </div>
    )
}

export default Square;
