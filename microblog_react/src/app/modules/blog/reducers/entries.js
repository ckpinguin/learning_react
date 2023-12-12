import * as t from '../actions/actionTypes';

import entry from './entry';

import initialStateEntries from './initialStateEntries';

const entries = (state = initialStateEntries, action) => {
    let error = null;
    switch (action.type) {

    case t.FETCH_ENTRIES:
        return {
            ...state,
            entriesList: {
                ...state.entriesList,
                error: null,
                loading: true
            }
        };
    case t.FETCH_ENTRIES_SUCCESS:
        return {
            ...state,
            entriesList: {
                entries: [
                    ...state.entriesList.entries,
                    action.payload
                ],
                error: null,
                loading: false
            }
        };
    case t.FETCH_ENTRIES_FAILURE:
        // 2nd one is for network or server problems
        error = action.payload || {message: action.payload.message};
        return {
            ...state,
            entriesList: {
                entries: [],
                error: error,
                loading: false
            }
        };
    case t.RESET_ENTRIES:
        return {
            ...state,
            entriesList: {
                entries: [],
                error: null,
                loading: false
            }
        };

    case t.EDIT_ENTRY_FINISHED:
        return {
            ...state,
            // delegate it
            entriesList: {
                entries: state.entriesList.entries.map(e => entry(e, action)),
                error: null,
                loading: false
            }
        };
    case t.EDIT_ENTRY:
        return {
            ...state,
            // delegate it
            entriesList: {
                entries: state.entriesList.entries.map(e => entry(e, action)),
                error: null,
                loading: false
            }
        };

    case t.ADD_ENTRY:
        return {
            ...state,
            entriesList: {
                ...state.entriesList,
                error: null,
                loading: true
            }
        };
    case t.ADD_ENTRY_SUCCESS:
        return {
            ...state,
            entriesList: {
                // delegate it
                entries: [
                    ...state.entriesList.entries,
                    entry(undefined, action)
                ],
                error: null,
                loading: false
            }
        };

    case t.UPDATE_ENTRY:
        return {
            ...state,
            // delegate it
            entriesList: {
                ...state.entriesList,
                error: null,
                loading: true
            }
        };
    case t.UPDATE_ENTRY_SUCCESS:
        return {
            ...state,
            // delegate it
            entriesList: {
                entries: state.entriesList.entries.map(e => entry(e, action)),
                error: null,
                loading: false
            }
        };
        
    case t.REMOVE_ENTRY:
        return {
            ...state,
            // delegate it
            entriesList: {
                ...state.entriesList,
                error: null,
                loading: true
            }
        };
    case t.REMOVE_ENTRY_SUCCESS:
        return {
            ...state,
            // delegate it
            entriesList: {
                entries: state.entriesList.entries.filter(e => entry(e, action)),
                error: null,
                loading: false
            }
        };

    default:
        return state;
    }
};
export default entries;