import React from 'react';
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

    refreshList: function () {
        this.setState({
            players: PlayersStore.getPlayers()
        });
    },

    render(){
        return (<div className="col-md-10 secondary-box center">
                <ClickableArea players={this.state.list}/>
                <LeaderBoard players={this.state.leaderBoard}/>
            </div>
        );
    }
});