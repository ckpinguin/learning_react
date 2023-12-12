import entries from './reducers/entries';
import editEntryForm from './reducers/editEntryForm';

const blog = (state = {}, action) => {
    return {
        // giving also full state access to be make
        // decisions upon other parts of the state-tree possible
        entries: entries(state.entries, action, state),
        editEntryForm: editEntryForm(state.editEntryForm, action)
    };
};
export default blog;


