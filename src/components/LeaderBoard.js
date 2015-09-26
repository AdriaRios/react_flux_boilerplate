'use strict';

import React from 'react';
//import PlayersStore from '../stores/PlayersStore.js';
import BoardItem from '../components/BoardItem.js';

/**
 * Method used to wrap the data on a object with players property.
 * @returns {{players: *}} an array with unique property. Contains all the players data.
 */
/*function getPlayers() {
    return {players: PlayersStore.getPlayersLB()};
}*/

export default React.createClass({

    //We define the propTypes for improve reusability
    propTypes: {
        players: React.PropTypes.array
    },

    /**
     * That function parses all the players data. On each loop push a component to an array. Used by render to feed our list.
     * @returns {Array} Component List
     */
    getItems: function () {
        let items = [],
            i, len = this.props.players.length;

        for (i = 0; i < len; i++) {
            items.push(<BoardItem key={this.props.players[i].name} player={this.props.players[i]}/>);
        }

        return items;
    },

    render() {
        return (
            <div className="col-md-6">
                {this.getItems()}
            </div>
        );
    }
});
