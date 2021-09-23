import { connect } from 'react-redux';

import Home from './Home';
import { getTimelinePosts, getPopularPosts } from './action';


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
		_getPopularPost: () => {
			dispatch(getPopularPosts());
		},

		_getTimlinePost: () => {
			dispatch(getTimelinePosts());
		},



	};


};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
