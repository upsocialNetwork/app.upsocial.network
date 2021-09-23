import { createAction } from 'redux-act';
import httpClient from '../../services/http';

export const requestEditProfileData = createAction();
export const responseEditProfileData = createAction();


export function getProfileDetails() {
    return (dispatch) => {

        dispatch(requestEditProfileData([]));
        httpClient.call("get-group-details/1", null, { method: 'GET' }).then(function (response) {
            dispatch(responseEditProfileData(response));
        }, function (error) {
            dispatch(responseEditProfileData(error));
        });


    }
}
