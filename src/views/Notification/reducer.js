import { createReducer } from 'redux-act';
import { responseNotificationData } from './action';

const defaultState = {
    // requestProcess: false,
    notificationData: [],
    // groupData: null,
    error: null
};


const reducer = createReducer({

    // [requestPostListData]: (state) => {
    //     return {
    //         requestProcess: true,
    //         postData: state.postData
    //     };
    // },

    [responseNotificationData]: (state, params) => {
        let responseParams = params && params.data ? params.data : [];
        return {
            // ...state,
            // requestProcess: false,
            notificationData: responseParams,
            error: params && params.error ? params.error: 'Something went wrong'
        };
    }


}, defaultState);

export default reducer;