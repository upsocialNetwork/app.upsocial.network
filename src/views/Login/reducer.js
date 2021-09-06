import {createReducer} from 'redux-act';
import {requestLoginData, responseLoginData, requestSignupData, responseSignupData} from './action';


const defaultState = {
	requestProcess: false,
	loginData: null,
	signupData: null
};

const reducer = createReducer({

	[requestLoginData]: (state) => {
		return {
			requestProcess: true,
			loginData: null
		};
	},

  	[responseLoginData]: (state, params) => {
		return {
			requestProcess: false,
			loginData: params
		};
	},

	[requestSignupData]: (state) => {
		return {
			requestProcess: true,
			signupData: null
		};
	},

  	[responseSignupData]: (state, params) => {
		return {
			requestProcess: false,
			signupData: params
		};
	}


}, defaultState);



export default reducer
