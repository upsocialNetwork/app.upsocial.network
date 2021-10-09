import { connect } from 'react-redux';

import MyPost from './MyPosts';
import { getTimelinePosts } from './action';


const mapStateToProps = (state) => {

	let stateData = {
		requestProcess: state.myPost.requestProcess,
		hasMore: state.myPost.hasMore
	}
	if (state.myPost.postData) {
		stateData["postData"] = state.myPost.postData
	}
	return stateData;
};

const mapDispatchToProps = (dispatch) => {
	return {
		_getTimlinePost: (page) => {
			dispatch(getTimelinePosts(page));
		},



	};


};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyPost);
