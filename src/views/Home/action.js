import { createAction } from 'redux-act';
import httpClient from '../../services/http';


export const requestPostListData = createAction();
export const responsePostListData = createAction();



export function getPopularPosts(page) {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call(`get-popular-post/${page}`, null, { method: 'GET' }).then(function (response) {
            let responseData = response && response.result && response.result.data ? response.result.data : []
            dispatch(responsePostListData({data: responseData, error: null, page}));
        }, function (error) {
            dispatch(responsePostListData({data: [], error}));
        });
    }
}


export function getTimelinePosts(page) {
    return (dispatch) => {

        dispatch(requestPostListData([]));
        httpClient.call(`get-timline-post/${page}`, null, { method: 'GET' }).then(function (response) {
            let responseData = response && response.result && response.result.data ? response.result.data : []
           // console.log('responseData', responseData)
            dispatch(responsePostListData({data: responseData, error: null, page}));
        }, function (error) {
            dispatch(responsePostListData({data: [], error}));
        });


    }
}



