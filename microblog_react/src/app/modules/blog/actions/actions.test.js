import * as actions from './actions';
import * as types from './actionTypes';
// import rewire from 'rewire';

describe('actions', () => {
    it('should create an action to add a blog entry', () => {
        const entry = {
            id: 'dc2a4182-71a0-4fed-98dd-22b4d5104e40',
            title: 'Testentry',
            text: 'Just a little\n test',
            image: 'cat1.jpg',
            date: '2017-06-05T14:46:23.977Z',
            author: 'The test user himself',
            user: 'a8655eb5-ca5c-459a-a094-d0e704e80a69',
            tags: [],
            active: true,
            showForm: false
        };
        const expectedAction = {
            type: types.ADD_ENTRY_SUCCESS,
            payload: entry
        };
        expect(actions.addEntrySuccess(entry)).toEqual(expectedAction);
    });
});
