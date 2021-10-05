import React, { } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { SuccessToast, SetSassion } from '../../utils/common';
import Header from '../../components/Header';
import ModToolLeftSideBar from '../../components/ModToolLeftSideBar';
import Footer from '../../components/Footer';
import session from '../../utils/session';
import httpClient from '../../services/http';
import LeftSideBar from '../../components/LeftSideBar';


const ModToolLayout = (props) => {
  const history = useHistory();

  const signOut = () => {
    if (session.getSessionData()) {
      httpClient.call("logout", null, { method: 'GET' }).then(function (response) {

      }, function (error) {
        console.log(error);
      });

      SuccessToast("Logged out successfully.");
      session.deleteSessionData();
      setTimeout(() => {
        SetSassion();
        navigate('/auth/login');
      }, 500);
    }
  }

  const navigate = (path) => {
    history.push(path)
  }


  return (
    <section>
      <Header {...props} _signOut={() => { signOut() }} />
      <LeftSideBar {...props} />
      <div className="route-container container">{props.children ? props.children : 'Loading...'}</div>
      <Footer {...props} />
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    session: state.authSession.userData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModToolLayout);
