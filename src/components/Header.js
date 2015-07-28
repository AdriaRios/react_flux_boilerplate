'use strict';

import React from 'react';
import PlayersActions from '../actions/PlayersActions';

export default React.createClass({

    submitPlayerName() {
        let input = this.refs.playerName.getDOMNode();
        if (input.value) {
            PlayersActions.addPlayer(input.value);
            input.value = '';
        }
    },

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" ref="playerName" placeholder="Type your name"/>
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.submitPlayerName}>Add</button>
                </span>
            </div>
        );
    }
});
