import { connect } from 'react-redux';
import { getPopularGroupList } from './action';
import TopCommunitySearch from './TopCommunitySearch';


const mapStateToProps = (state) => {
    let stateData = {
        requestProcess: state.topCommunitySearch.requestProcess
    }

    if (state.topCommunitySearch.groupData) {
        stateData["groupData"] = state.topCommunitySearch.groupData
    }
    return stateData;
};

const mapDispatchToProps = (dispatch) => {
    return {
        _getPopularGroups: () => {
            dispatch(getPopularGroupList());
        }
    };


};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopCommunitySearch);
