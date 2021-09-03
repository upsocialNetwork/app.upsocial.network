import { connect } from 'react-redux';
import Login from './Login';
import { credentialLogin, credentialSignup} from './action';


const mapStateToProps = (state) => {
	return {
		data: state.login.data,
		requestProcess: state.login.requestProcess
	};
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
