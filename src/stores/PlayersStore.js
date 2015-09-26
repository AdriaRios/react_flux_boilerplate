'use strict';
import Constants from '../dispatcher/Constants';
import Dispatcher from '../dispatcher/Dispatcher';
import EventEmitter from 'events';
/**
 * Store handles all logic related to Todo Data.
 * Such as adding, removing, and toggling of one or multiple Todos
 *
 * The store listens to actions triggered by TodoActions
 */
class PlayersStore extends EventEmitter {

    constructor() {
        super();
        this.players = {
            list: [
                {name: 'Carles'},
                {name: 'Xavi'},
                {name: 'Tomás'},
                {name: 'Adri'}
            ],
            leaderBoard: [
                {name: 'Carles', id: 0, score: 0},
                {name: 'Xavi', id: 1, score: 0},
                {name: 'Tomás', id: 2, score: 0},
                {name: 'Adri', id: 3, score: 0}
            ]
        };

        // register store with dispatcher, allowing actions to flow through
        Dispatcher.register((function (payload) {
            let action = payload.action;
            switch (action.type) {
                case Constants.ActionTypes.ADD_PLAYER:
                    let name = action.playerName;

                    this.addPlayer(name);
                    break;
                case Constants.ActionTypes.INCREMENT_SCORE:
                    let id = action.playerId;
                    this.incrementScore(id);
            }
        }).bind(this));
    }

    sortPlayers() {
        this.players.leaderBoard.sort(function (previous, current) {
            let result = 0;
            if (previous.score < current.score) {
                result = 1;
            } else if (previous.score > current.score) {
                result = -1;
            }
            return result;
        });
    }

    addPlayer(data) {
        let id = this.players.list.push({name: data}) - 1;
        this.players.leaderBoard.push({name: data, score: 0, id: id});
        this.emit('change');
    }

    incrementScore(playerId) {
        this.players.leaderBoard.find(x => x.id === playerId).score++;
        this.sortPlayers();
        this.emit('change');
    }

    // Add change listener
    addChangeListener(callback) {
        this.on('change', callback);
    }

    // Remove change listener
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    getPlayers() {
        return this.players;
    }
}

export default new PlayersStore();
