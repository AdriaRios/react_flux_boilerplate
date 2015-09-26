import {Dispatcher} from 'flux';
import Constants from './Constants';

/*
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 */
let AppDispatcher = new Dispatcher();

/*
 * Very thin wrapper around the core dispatcher API, just to signify
 * that actions triggered here originated on the client-side
 */
AppDispatcher.handleViewAction = function (action) {
    this.dispatch({
        source: Constants.ActionSources.VIEW_ACTION,
        action: action
    });
};

export default AppDispatcher;
