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
                className="square" 
                onClick={() => { this.props.onMove() }}
            >
                {this.props.value}
            </div>
        )
    }
}