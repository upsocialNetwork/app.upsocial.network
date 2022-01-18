import { connect } from 'react-redux';
import Login from './Login';
import { credentialLogin, credentialSignup} from './action';


const mapStateToProps = (state) => {

	let stateData = {
		requestProcess: state.login.requestProcess
	}

	if(state.login.loginData){
		stateData["loginData"] = state.login.loginData
	}

	if(state.login.signupData){
		stateData["signupData"] = state.login.signupData
	}

	return stateData;
};

const mapDispatchToProps = (dispatch) => {
	return {
			_doLogin: (param) => {
				dispatch(credentialLogin(param));
			},

			_doSignup: (param) => {
				dispatch(credentialSignup(param));
			}
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
