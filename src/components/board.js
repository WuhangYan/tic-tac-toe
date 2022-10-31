import React from 'react';
import Square from './square';

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onMove={() => this.props.onMove(i)}
                isBold={this.props.winnerLine ? this.props.winnerLine.indexOf(i) > -1
                     : this.props.currentMove === i}
                key={i}
            />
        )
    }

    render() {
        let boards = [];
        for (let i = 0; i < 3; i++) {
            const squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(
                    this.renderSquare(i * 3 + j)
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
}
