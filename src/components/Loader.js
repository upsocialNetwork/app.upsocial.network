import React from 'react';
import { connect } from 'react-redux';

const Loader = (props) => {

    if(!props.visible){
        return false;
    }
    return (
        <div id="overlay">
            <div className="lds-ripple">
            <div></div>
            <div></div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {

	return {
		visiblity: state.loader.visiblity
	}

};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Loader);