export const ADD_ARTICLE = 'ADD_ARTICLE';

export function addArticle(payload: any) {
    return { type: ADD_ARTICLE, payload };
}

export type Article = {
    id: string;
    title: string;
};
type Action<T> = {
    type: string;
    payload: T;
};
const initialState = {
    articles: [] as Article[],
};

function rootReducer(state = initialState, action: Action<Article>) {
    if (action.type === ADD_ARTICLE) {
        return {
            ...state,
            articles: state.articles.concat(action.payload),
        };
    }
    return state;
}

export default rootReducer;
