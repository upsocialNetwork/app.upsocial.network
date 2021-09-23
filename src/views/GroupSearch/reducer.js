import { createReducer } from 'redux-act';
import { requestPostListData, responsePostListData } from './action';

const defaultState = {
    requestProcess: false,
    postData: null
};


const reducer = createReducer({

    [requestPostListData]: (state) => {
        return {
            requestProcess: true,
            postData: null
        };
    },

    [responsePostListData]: (state, params) => {
        return {
            requestProcess: false,
            postData: params
        };
    }


}, defaultState);

export default reducer;
