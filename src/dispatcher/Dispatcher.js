import {Dispatcher} from 'flux';
import Constants from './Constants';
import assign from 'object-assign';

/**
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 **/
export default assign(new Dispatcher(), {

/**
 * Very thin wrapper around the core dispatcher API, just to signify
 * that actions triggered here originated on the client-side
 **/
handleViewAction(action) {
    this.dispatch({
        source: Constants.ActionSources.VIEW_ACTION,
        action: action
    });
}
});