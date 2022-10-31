import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }
    render() {
        return (
            <div 
                className={this.props.isBold ? 'current-move square' : 'square'} 
                onClick={() => { this.props.onMove() }}
            >
                {this.props.value}
            </div>
        )
    }
}