import { createReducer } from 'redux-act';
import { requestEditProfileData, responseEditProfileData } from './action';


const defaultState = {
	requestProcess: false,
	profileData: null
};

const reducer = createReducer({

	[requestEditProfileData]: (state) => {
		return {
			requestProcess: true,
			profileData: null
		};
	},

	[responseEditProfileData]: (state, params) => {
		return {
			requestProcess: false,
			profileData: params
		};
	}

}, defaultState);



export default reducer
