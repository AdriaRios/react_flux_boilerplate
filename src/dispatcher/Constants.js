import keyMirror from 'react/lib/keyMirror';

export default {
    // event name triggered from store, listened to by views
    CHANGE_EVENT: 'change',

    // Each time you add an action, add it here
    ActionTypes: keyMirror({
        ADD_PLAYER: null,
        INCREMENT_SCORE: null
    }),

    ActionSources: keyMirror({
        VIEW_ACTION: null
    })
};