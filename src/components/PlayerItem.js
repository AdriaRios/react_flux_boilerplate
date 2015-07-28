'use strict';

import React from 'react';
import PlayersActions from '../actions/PlayersActions';
export default React.createClass({
    //We define the propTypes for improve reusability
    propTypes: {
        name: React.PropTypes.string,
        index: React.PropTypes.number
    },

    incrementScore: function () {
        PlayersActions.incrementScore(this.props.index);
    },

    render() {
        return (
            <div className="row clickableArea">
                <span className="col-md-7 item-span">{this.props.name}</span>
                <span className="col-md-1">
                    <button className="btn btn-success item-btn" type="button" onClick={this.incrementScore}>
                        +
                    </button>
                </span>
            </div>
        );
    }
});
