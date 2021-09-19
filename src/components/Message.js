import React from 'react';
import { connect } from 'react-redux';


const Message = (props) => {
    

  
    let {message, type} = props.messageObj;
    if(typeof message == 'object'){
        message = JSON.stringify(message)
    }
    if(message){
      return (
        <div className={"toast_container"}>
          <div class={"toast_"+type+"_container"} role="alert" direction="up" style={{opacity: 1, transform: 'none', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;'}}>
            <div class="toast_icon">
              <svg class="toast_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="SuccessOutlinedIcon">
                <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
              </svg>
            </div>
            <div class="toast_message">{message}</div>
          </div>
        </div>
      )
    }
    return null;
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