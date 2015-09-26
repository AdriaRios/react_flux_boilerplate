import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../dispatcher/Constants';

export default {
    addPlayer(playerName){
        console.log(Constants);
        Dispatcher.handleViewAction({
            type: Constants.ActionTypes.ADD_PLAYER,
            playerName: playerName
        });
    },

    incrementScore(playerId){
        Dispatcher.handleViewAction({
            type: Constants.ActionTypes.INCREMENT_SCORE,
            playerId: playerId
        });
    }
};