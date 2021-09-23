import { connect } from 'react-redux';
import RightSideBar from './RightSideBar';
import { getPopularGroupList } from './action';


const mapStateToProps = (state) => {
    let stateData = {
        requestProcess: state.rightSideBar.requestProcess
    }

    if (state.rightSideBar.groupData) {
        stateData["groupData"] = state.rightSideBar.groupData
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
)(RightSideBar);
