import { createAction } from 'redux-act';
import httpClient from '../../services/http';


export const requestPostListData = createAction();
export const responsePostListData = createAction();



export function getPopularPosts() {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call("get-popular-posts/1", null, { method: 'GET' }).then(function (response) {
            dispatch(responsePostListData(response));
        }, function (error) {
            dispatch(responsePostListData(error));
        });


    }
}


export function getTimelinePosts() {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call("get-timeline-posts/1", null, { method: 'GET' }).then(function (response) {
            dispatch(responsePostListData(response));
        }, function (error) {
            dispatch(responsePostListData(error));
        });


    }
}



