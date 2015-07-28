'use strict';

import React from 'react';
import PlayersActions from '../actions/PlayersActions';
export default React.createClass({
    //We define the propTypes for improve reusability
    propTypes: {
        player: React.PropTypes.object
    },

    incrementScore: function () {
        PlayersActions.incrementScore(this.props.player);
    },

    render() {
        return (
            <div className="row item">
                <span className="col-md-7 item-span">{this.props.player.name}</span>
                <span className="col-md-5 item-span">{this.props.player.score}</span>
            </div>
        );
    }
});
