import { createAction } from 'redux-act';
import httpClient from '../../services/http';


export const requestPostListData = createAction();
export const responsePostListData = createAction();



export function getPopularPosts(page) {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call(`get-popular-posts/${page}`, null, { method: 'GET' }).then(function (response) {
            let responseData = response && response.result && response.result.data ? response.result.data : []
            dispatch(responsePostListData(responseData));
        }, function (error) {
            dispatch(responsePostListData(error));
        });


    }
}


export function getTimelinePosts(page) {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call(`get-timeline-posts/${page}`, null, { method: 'GET' }).then(function (response) {
            let responseData = response && response.result && response.result.data ? response.result.data : []
            dispatch(responsePostListData(responseData));
        }, function (error) {
            dispatch(responsePostListData(error));
        });


    }
}



