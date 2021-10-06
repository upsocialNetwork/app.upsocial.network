import { createAction } from 'redux-act';
import httpClient from '../../services/http';

export const requestGroupListData = createAction();
export const responseGroupListData = createAction();

export function getPopularGroupList() {
    return (dispatch) => {
        dispatch(requestGroupListData([]));
        httpClient.call('get-five-group/1', null, { method: 'GET' }).then(function (response) {
            dispatch(responseGroupListData(response));
        }, function (error) {
            dispatch(responseGroupListData(error));
        });
    }
}

export function getUserGroupList() {
    return (dispatch) => {
        dispatch(requestGroupListData([]));
        httpClient.call('get-groups-list/1', null, { method: 'GET' }).then(function (response) {
            dispatch(responseGroupListData(response));
        }, function (error) {
            dispatch(responseGroupListData(error));
        });
    }
}