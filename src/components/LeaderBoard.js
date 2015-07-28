'use strict';

import React from 'react';
import Reflux from 'reflux';
import PlayersStore from '../stores/PlayersStore.js';
import BoardItem from '../components/BoardItem.js';

/**
 * Method used to wrap the data on a object with players property.
 * @returns {{players: *}} an array with unique property. Contains all the players data.
 */
function getPlayers() {
    return {players: PlayersStore.getPlayersLB()};
}

export default React.createClass({

    mixins: [Reflux.ListenerMixin],

    //We define the propTypes for improve reusability
    propTypes: {
        players: React.PropTypes.array
    },

    /**
     * We will listen to Players store. On any change we will dispatch refresh list.
     * @returns {null} no data returned
     */
    componentDidMount: function () {
        this.listenTo(PlayersStore, this.refreshList);
    },

    getInitialState: function () {
        return getPlayers();
    },

    refreshList: function () {
        this.setState(getPlayers());
    },

    /**
     * That function parses all the players data. On each loop push a component to an array. Used by render to feed our list.
     * @returns {Array} Component List
     */
    getItems: function () {
        let items = [],
            i, len = this.state.players.length;

        for (i = 0; i < len; i++) {
            items.push(<BoardItem key={this.state.players[i].name} player={this.state.players[i]}/>);
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
