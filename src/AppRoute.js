import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { setHttpClientConfig, SetSassion } from './utils/common';
import Session from './utils/session';

import ErrorBoundary from './ErrorBoundary';
import Layout from './views/Layout'
import ModToolLayout from './views/Layout/ModToolLayout';
import Home from './views/Home';
import Search from './views/Search';
import EditProfile from './views/EditProfile';
import Community from './views/CreateGroup';
import CreateGroupJoin from './views/GroupDetails';
import CreatePost from './views/CreatePost';
import ModTools from './views/ModTools';
import Login from './views/Login';
import RightSideBar from './views/RightSideBar';
import Message from './components/Message'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ForgetPassword from './views/ForgetPassword/ForgetPassword';
import GroupSearch from './views/GroupSearch';
import TopCommunitySearch from './views/TopGroupSearch';
import CreateGroupPost from './views/CreateGroupPost';
import GroupDetails from './views/GroupDetails';
import TopGroupSearch from './views/TopGroupSearch';
import ChangePassword from './views/ChangePassword/ChangePassword';
import EditPost from './views/EditPost/EditPost';

const FullLayout = (props) => {
  const history = useHistory();
  if (history.location.pathname.indexOf('auth') == -1 && 
      history.location.pathname.indexOf('user') == -1 && 
      history.location.pathname.indexOf('mod-tools') == -1) {
    return <Layout leftSide={true} rightSide={true}>{props.children}</Layout>
  }
  return null
}

const HFLayout = (props) => {
  const history = useHistory();
  if (history.location.pathname.indexOf('user') !== -1) {
    return <Layout leftSide={true} rightSide={false}>{props.children}</Layout>
  }
  return null
}

const ModToollLayout = (props) => {  
  const history = useHistory();
  if (history.location.pathname.indexOf('mod-tools') !== -1) {
    return <ModToolLayout leftSide={true} rightSide={false}>{props.children}</ModToolLayout>
  }
  return null
}

const LoginLayout = (props) => {
  return <>{props.children}</>
}

const AuthorizeRoute = () => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useSelector((state) => {
    if (state.authSession.userData && ['/auth/login', '/auth/forget-password'].indexOf(history.location.pathname) !== -1) {
      //setIsLoggedIn(true)
      //history.push('/')
    }
    else if ((!state.authSession || !state.authSession.userData) && ['/auth/login', '/auth/forget-password'].indexOf(history.location.pathname) === -1) {
      //setIsLoggedIn(false)
      //history.push('/login')
    }

  })

  useEffect(() => {
    // let isLoggedIn = Session.isLoggedIn();
    // setIsLoggedIn(isLoggedIn)


    // if (!isLoggedIn) {
    //   history.push('/login')
    // }

    SetSassion();
    setIsLoaded(true)
  })

  return (
    <Switch>
      <Route>
        <Switch>
          <Suspense fallback={<div>Loding...</div>}>
            <Route path="/auth" children={() => {
              return (
                <LoginLayout>
                  <Route path="/auth/login" component={Login} ></Route>
                  <Route path="/auth/forget-password" component={ForgetPassword} ></Route>
                </LoginLayout>
              )
            }}>
            </Route>

            <Route path="/user" children={() => {
              return (
                <HFLayout>
                  <Route path="/user/edit-profile" component={EditProfile}></Route>
                  <Route path="/user/change-password" component={ChangePassword}></Route>
                  <Route exact path="/user/my-groups" component={GroupSearch}></Route>
                </HFLayout>
              )
            }}>
            </Route>
            <Route path="/mod-tools" children={() => {
              return (
                <ModToollLayout>
                  <Route exact path="/mod-tools" component={ModTools}></Route>
                </ModToollLayout>
              )
            }}>
            </Route>
            <Route path="/" children={() => {
              return (
                <FullLayout>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/search-result" component={Search}></Route>
                  <Route exact path="/create-group" component={Community}></Route>
                  <Route exact path="/group/details" component={GroupDetails}></Route>
                  <Route exact path="/create-post" component={CreatePost}></Route>
                  <Route exact path="/edit-post" component={EditPost}></Route>
                  <Route exact path="/create-group-post" component={CreateGroupPost}></Route>
                  <Route exact path="/group/top-groups" component={TopGroupSearch}></Route>
                  {/*  <Route exact path="/search-group-result" component={GroupSearch}></Route> */}
                </FullLayout>

              )
            }}>
            </Route>
            

            




          </Suspense>
        </Switch>
      </Route>

      <Redirect from="*" to="/" />
    </Switch>
  )

}



const AppRoute = (props) => {
  const [pageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    setHttpClientConfig().then(function () {
      setPageLoad(true)
    });
  })

  if(!pageLoad) return <div>Loading...</div>
  return (
    <Router basename={'/'}>
      <ErrorBoundary>
        <Message {...props} />
        <Loader {...props} />
        <AuthorizeRoute />
      </ErrorBoundary>
    </Router>
  );
}

export default AppRoute;
