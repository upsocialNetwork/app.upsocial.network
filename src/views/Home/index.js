import { connect } from 'react-redux';

import Home from './Home';
import { getTimelinePosts, getPopularPosts } from './action';


const mapStateToProps = (state) => {

	let stateData = {
		requestProcess: state.post.requestProcess,
		hasMore: state.post.hasMore
	}
	if (state.post.postData) {
		stateData["postData"] = state.post.postData
	}
	return stateData;
};

const mapDispatchToProps = (dispatch) => {
	return {
		_getPopularPost: (page) => {
			dispatch(getPopularPosts(page));
		},

		_getTimlinePost: (page) => {
			dispatch(getTimelinePosts(page));
		},



	};


};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
