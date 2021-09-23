import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import { getProfileDetails } from './action';


const mapStateToProps = (state) => {
	let stateData = {
		requestProcess: state.editProfile.requestProcess
	}

	if (state.editProfile.profileData) {
		stateData["profileData"] = state.editProfile.profileData
	}




	return stateData;
};

const mapDispatchToProps = (dispatch) => {
	return {
		_getProfile: () => {
			dispatch(getProfileDetails());
		},



	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfile);
