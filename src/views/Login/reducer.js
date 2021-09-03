import {createReducer} from 'redux-act';
import {requestLoginData, responseLoginData} from './action';


const defaultState = {
	requestProcess: false,
	data: []
};

const reducer = createReducer({

	[requestLoginData]: (state) => {
    return {
      requestProcess: true,
	  	data: []
    };
  },

  [responseLoginData]: (state, params) => {
			return {
				requestProcess: false,
				data: params
			};
	}


}, defaultState);



export default reducer
