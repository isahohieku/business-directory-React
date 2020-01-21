import commentsReducers from '../../reducers/comment';
import { SAVE_COMMENT } from '../../actions/types';

it('handles actions of save comment', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'New Comment'
    };

    const newState = commentsReducers([], action); 

    expect(newState).toEqual(['New Comment']);
})

it('handles action with unknown type', () => {
    const newState = commentsReducers([], { type: 'blah blah'});

    expect(newState).toEqual([]);
})