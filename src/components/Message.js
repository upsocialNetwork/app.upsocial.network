import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactSnackBar from "react-js-snackbar";


const Message = (props) => {
    

  
    let {message, type} = props.messageObj;
    if(typeof message == 'object'){
        message = JSON.stringify(message)
    }
    return (
        <div className={"toast_"+type} >
            {message &&              
              <ReactSnackBar Icon={<span></span>} Show={true}>
                {message}
              </ReactSnackBar>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		messageObj: state.messageObj
	}

};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Message);