import * as t from './actionTypes';

const guid = () => {
    const s4 = () => (
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    );
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};


// Action creators

const fetchEntries = () => {
    return {
        type: t.FETCH_ENTRIES
    };
};

const fetchEntriesSuccess = (entries) => ({
    type: t.FETCH_ENTRIES_SUCCESS,
    payload: entries
});

const fetchEntriesFailure = (error) => ({
    type: t.FETCH_ENTRIES_FAILURE,
    payload: error
})

const addEntry = () => ({
    type: t.ADD_ENTRY,
});

// exported only for the example unit test
export const addEntrySuccess = (entry) => ({
    type: t.ADD_ENTRY_SUCCESS,
    payload: entry
});

const addEntryFailure = (error) => ({
    type: t.ADD_ENTRY_FAILURE,
    payload: error
});

const updateEntry = () => ({
    type: t.UPDATE_ENTRY,
});

const updateEntrySuccess = (entry) => ({
    type: t.UPDATE_ENTRY_SUCCESS,
    payload: entry
});

const updateEntryFailure = (error) => ({
    type: t.UPDATE_ENTRY_FAILURE,
    payload: error
});

const removeEntry = () => ({
    type: t.REMOVE_ENTRY,
    
});

const removeEntrySuccess = (id) => ({
    type: t.REMOVE_ENTRY_SUCCESS,
    payload: id
});

const removeEntryFailure = (error) => ({
    type: t.REMOVE_ENTRY_FAILURE,
    payload: error
});


// Public actions

export const editEntry = (id) => ({
    type: t.EDIT_ENTRY,
    payload: id
});

export const editEntryFinished = (id) => ({
    type: t.EDIT_ENTRY_FINISHED,
    payload: id
});

// Thunk action creators with business logic.
// Can be called as normal functions without injecting dispatch into components
// by using mapDispatchToProps()

export const createNewEntry = () => {
    return (dispatch, getState) => {
        // start flag
        dispatch(addEntry());
        const newEntry = { };
        const id = guid();
        newEntry.id = id;
        // show the editing form
        newEntry.showForm = true;
        // don't show in list yet
        newEntry.active = false;
        dispatch(addEntrySuccess(newEntry));
    };
};

// A bit an artificial example of using thunk capabilities ;-)
// With thunk, we can use dispatch and getState in action creators
// to make decisions, async calls etc. (i.e. side-effect stuff, that
// is not allowed in reducers)

        // this is likely more performant than array.filter()
        // O(n) for small, local mockup data should be ok 
        // for (entry of getState().blog.entries.entriesList.entries) {
        //     if (entry.id === id) {
        //         break;
        //     }
        // }


// This is not itself an action creator, but it calls them after doing some
// business logic.
// Normally we would save the entry into a backend server or database
// asynchronously with dispatching the function (in payload)
export const saveEntry = (entry) => {
    return (dispatch, getState) => {
        // 0 is falsy in JS, so this is working only safely with
        // guid as id...

        if (entry.id) {
            // start flag
            dispatch(updateEntry());
            
            // Do some async stuff here
            
            // This is normally called after async backend op success:
            const oldEntry = getState().blog.entries.entriesList[entry.id];
            const merged = Object.assign({}, oldEntry, entry);
            merged.date = new Date().toJSON();
            dispatch(updateEntrySuccess(merged));
        // new entry to be saved:
        } else {
            const id = guid();
            entry.id = id;
            entry.date = new Date().toJSON();
            // start flag
            dispatch(addEntry());

            // Do some async stuff here

            // This is normally called after async backend op success:
            dispatch(addEntrySuccess(entry));
        }
        dispatch(editEntryFinished(entry.id));
    };
};

export const loadEntries = () => {
    return (dispatch, getState) => {
        // start flag, informs state that async fetching started
        dispatch(fetchEntries());
        // Do some async stuff here
        
        // Mock:
        const entries = getState().entries.entriesList.entries;
        dispatch(fetchEntriesSuccess(entries));
    };
};

export const deleteEntry = (id) => {
    return (dispatch) => {
        dispatch(removeEntry());

        // Do some async stuff here

        dispatch(removeEntrySuccess(id));
    };
};

