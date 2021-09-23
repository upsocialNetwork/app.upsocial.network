import { connect } from 'react-redux';

import Home from './Home';
import { getPopularGroupList, getUserTimelinePosts } from './action';


const mapStateToProps = (state) => {

	let stateData = {
		requestProcess: state.post.requestProcess
	}

	if (state.post.postData) {
		stateData["postData"] = state.post.postData
	}




	return stateData;
};

const mapDispatchToProps = (dispatch) => {
	return {
		_getUserTimelinePost: () => {
			dispatch(getUserTimelinePosts());
		},



	};


};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
