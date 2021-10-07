import { createReducer } from 'redux-act';
import { requestPostListData, responsePostListData } from './action';

const defaultState = {
    requestProcess: false,
    postData: [],
    groupData: null,
    error: null
};


const reducer = createReducer({

    [requestPostListData]: (state) => {
        return {
            requestProcess: true,
            postData: state.postData
        };
    },

    [responsePostListData]: (state, params) => {
        let responseParams = params && params.data ? params.data : [];
        let finalData = params.page == 1 ? responseParams : [...state.postData, ...responseParams];
        return {
            ...state,
            requestProcess: false,
            postData: finalData,
            hasMore: params && !params.error && responseParams.length == 10 ? true : false,
            error: params && params.error ? params.error: 'Something went wrong'
        };
    }


}, defaultState);

export default reducer;
