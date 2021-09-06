import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';
import { routerReducer } from 'react-router-redux';

import {requestLoaderVisibility, requestSuccessMessage, requestErrorMessage, requestAuthSession} from './utils/common';
import login from './views/Login/reducer';



/***************************Start Reducer for loader *************/
const defaultLoaderState = {
	visiblity: false
};

const loader = createReducer({
  [requestLoaderVisibility]: (state, params) => {
			return {
				visiblity: params.isVisible
			};
	}
}, defaultLoaderState);
/***************************End Reducer for loader *************/

/***************************Start Reducer for Message *************/
const defaultMessageState = {
	message: '',
  type: ''
};

const messageObj = createReducer({
  [requestSuccessMessage]: (state, params) => {
      if(params){
        return {
          message: params,
          type: 'success'
        };
      }
			return {
        message: '',
        type: ''
			};
	},
  [requestErrorMessage]: (state, params) => {
      if(params){
        return {
          message: params,
          type: 'error'
        };
      }
			return {
        message: '',
        type: ''
			};
	}
}, defaultMessageState);
/***************************End Reducer for Message *************/
/***************************Start Reducer for Message *************/
const defaultAuthSession = {
	userData: false
};

const authSession = createReducer({
  [requestAuthSession]: (state, params) => {
      return {
        userData: params
      };
	}
}, defaultAuthSession);
/***************************End Reducer for Message *************/


const reducers = combineReducers({
		routing: routerReducer,
    messageObj,
    loader,
		authSession,
    login
});


export default reducers;
