import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { setHttpClientConfig, SetSassion } from './utils/common';
import Session from './utils/session';

import ErrorBoundary from './ErrorBoundary';
import Layout from './views/Layout'
import Home from './views/Home';
import Search from './views/Search';
import EditProfile from './views/EditProfile';
import Community from './views/Community';
import CreateGroupJoin from './views/CreateGroupJoin';
import CreatePost from './views/CreatePost';
import ModTools from './views/ModTools';
import Login from './views/Login';

import Message from './components/Message'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ForgetPassword from './views/ForgetPassword/ForgetPassword';


const AuthorizeRoute = () => {
  const history = useHistory();
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useSelector((state) => {
    if (state.authSession.userData && history.location.pathname === '/login') {
      setIsLoggedIn(true)
      history.push('/')
    }
    // else if((!state.authSession || !state.authSession.userData) && history.location.pathname !== '/login'){
    //   setIsLoggedIn(false)
    //   //history.push('/login')
    // }
  })

  useEffect(() => {
    let isLoggedIn = Session.isLoggedIn();
    setIsLoggedIn(isLoggedIn)

    
    if (!isLoggedIn) {
      history.push('/login')
    }
    SetSassion();
  })

  if (isLoggedIn) {
    return (
      <Layout>
        <Switch>
          <Route>
            <Switch>
              <Suspense fallback={<div>Loding...</div>}>
                <Route exact path="/" component={Home} ></Route>
                <Route exact path="/search-result" component={Search}></Route>
                <Route exact path="/edit-profile" component={EditProfile}></Route>
                <Route exact path="/create-community" component={Community}></Route>
                <Route exact path="/create-group-join" component={CreateGroupJoin}></Route>
                <Route exact path="/create-post" component={CreatePost}></Route>
                <Route exact path="/mod-tools" component={ModTools}></Route>
              </Suspense>
            </Switch>
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    )
  }
  return (
    <Switch>
      <Route>
        <Switch>
          <Suspense fallback={<div>Loding...</div>}>
            <Route path="/login" component={Login} ></Route>
            <Route path="/forget-password" component={ForgetPassword} ></Route>

          </Suspense>
        </Switch>
      </Route>
      <Redirect from="*" to="/login" />
    </Switch>
  )

}



const AppRoute = (props) => {
  useEffect(() => {
    setHttpClientConfig().then(function () {
    });
  })


  return (
    <Router basename={'/Upsocial-React'}>
      <ErrorBoundary>
        <Message {...props} />
        <Loader {...props} />
        <AuthorizeRoute />
      </ErrorBoundary>
    </Router>
  );
}

export default AppRoute;
