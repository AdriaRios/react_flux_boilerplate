'use strict';

import React from 'react';

import Header from '../components/Header.js';
import ClickableArea from '../components/ClickableArea';
import LeaderBoard from '../components/LeaderBoard';
import PlayersStore from '../stores/PlayersStore';

export default React.createClass({
    getInitialState: function () {
        return PlayersStore.getPlayers();
    },

    componentDidMount: function () {
        PlayersStore.addChangeListener(this.refreshList);
    },

    componentWillMount: function () {
        PlayersStore.removeChangeListener(this.refreshList);
    },

    refreshList: function () {
        this.setState({
            players: PlayersStore.getPlayers()
        });
    },
    render() {
        return (
            <div className="col-md-7 center">
                <div className="title">
                    <h1>Click game example:</h1>
                </div>
                <div className="header-parent">
                    <Header />
                </div>
                <div className="col-md-10 secondary-box center">
                    <ClickableArea players={this.state.list}/>
                    <LeaderBoard players={this.state.leaderBoard}/>
                </div>
            </div>
        );
    }
});
