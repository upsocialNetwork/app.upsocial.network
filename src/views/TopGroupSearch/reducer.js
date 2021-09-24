import { createReducer } from 'redux-act';
import { requestGroupListData, responseGroupListData } from './action';

const defaultState = {
    requestProcess: false,
    groupData: null
};


const reducer = createReducer({

    [requestGroupListData]: (state) => {
        return {
            requestProcess: true,
            groupData: null
        };
    },
    [responseGroupListData]: (state, param) => {
        return {
            requestProcess: false,
            groupData: param
        }
    }


}, defaultState);

export default reducer;

