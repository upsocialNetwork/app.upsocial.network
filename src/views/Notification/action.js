import { createAction } from 'redux-act';
import httpClient from '../../services/http';


// export const requestPostListData = createAction();
export const responseNotificationData = createAction();






export function getNotifications() {
    return (dispatch) => {

        // dispatch(requestPostListData([]));
        httpClient.call(`get-notification`, null, { method: 'GET' }).then(function (response) {
            let responseData = response && response.result && response.result.data ? response.result.data : []
        //    console.log('responseData', responseData)
            dispatch(responseNotificationData({ data: responseData, error: null }));
        }, function (error) {
            dispatch(responseNotificationData({ data: [], error }));
        });


    }
}