import { ADD_ARTICLE } from './reducers';
import { Dispatch } from 'redux';

const forbiddenWords = ['spam', 'money'];

export const forbiddenWordsMiddleware = ({ dispatch }: { dispatch: Dispatch<any> }) => (next: Function) => (action: any) => {
    // do your stuff
    if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word => action.payload.title.includes(word));

        if (foundWord.length) {
            console.error('FOUND_BAD_WORD');
            return dispatch({ type: 'FOUND_BAD_WORD' });
        }
    }
    return next(action);
};
