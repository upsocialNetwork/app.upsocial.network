import { createReducer } from 'redux-act';
import { requestPostListData, responsePostListData } from './action';

const defaultState = {
    requestProcess: false,
    postData: [],
    groupData: null
};


const reducer = createReducer({

    [requestPostListData]: (state) => {
        return {
            requestProcess: true,
            postData: state.postData
        };
    },

    [responsePostListData]: (state, params) => {
        return {
            ...state,
            requestProcess: false,
            postData: [...state.postData, ...params],
            hasMore: params.length == 10 ? true : false
        };
    }


}, defaultState);

export default reducer;
