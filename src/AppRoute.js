import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Loader from './components/Loader';
import Message from './components/Message';
import ErrorBoundary from './ErrorBoundary';
import { setHttpClientConfig, SetSassion } from './utils/common';
import ChangePassword from './views/ChangePassword/ChangePassword';
import Community from './views/CreateGroup';
import CreateGroupPost from './views/CreateGroupPost';
import CreatePost from './views/CreatePost';
import EditGroup from './views/EditGroup/EditGroup';
import EditPost from './views/EditPost/EditPost';
import EditProfile from './views/EditProfile';
import ForgetPassword from './views/ForgetPassword/ForgetPassword';
import GroupDetails from './views/GroupDetails';
import GroupSearch from './views/GroupSearch';
import Home from './views/Home';
import Layout from './views/Layout';
import ModToolLayout from './views/Layout/ModToolLayout';
import Login from './views/Login';
import ModTools from './views/ModTools';
import MyPosts from './views/MyPosts';
import Notification from './views/Notification/Notification';
import PostDetails from './views/PostDetails/PostDetails';
import Search from './views/Search';
import TopGroupSearch from './views/TopGroupSearch';
import UserView from './views/UserView/UserView';
import Registration from './views/Registration/Registration';


const FullLayout = (props) => {
  const history = useHistory();
  if (history.location.pathname.indexOf('auth') === -1 &&
    history.location.pathname.indexOf('user') === -1 &&
    history.location.pathname.indexOf('mod-tools') === -1) {
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
  //const [isLoaded, setIsLoaded] = useState(false);
  //let [isLoggedIn, setIsLoggedIn] = useState(false);

  useSelector((state) => {
    if (state.authSession.userData && ['/auth/login', '/auth/forgot-password'].indexOf(history.location.pathname) !== -1) {
      //setIsLoggedIn(true)
      //history.push('/')
    }
    else if ((!state.authSession || !state.authSession.userData) && ['/auth/login', '/auth/forgot-password'].indexOf(history.location.pathname) === -1) {
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
    //setIsLoaded(true)
    clearCacheData();
  })

  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    console.log('Complete Cache Cleared')
  };

  return (
    <Switch>
      <Route>
        <Switch>
          <Suspense fallback={<div>Loding...</div>}>
            <Route path="/auth" children={() => {
              return (
                <LoginLayout>
                  <Route path="/auth/login" component={Login} ></Route>
                  <Route path="/auth/signup" component={Registration} ></Route>
                  <Route path="/auth/import-token" component={ForgetPassword} ></Route>
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
                  <Route exact path="/user/top-groups" component={TopGroupSearch}></Route>
                  <Route exact path="/user/my-posts" component={MyPosts}></Route>
                  <Route exact path="/user/view/:userName" component={UserView}></Route>
                  <Route exact path="/user/notification" component={Notification}></Route>
                </HFLayout>
              )
            }}>
            </Route>
            <Route path="/mod-tools" children={() => {
              return (
                <ModToollLayout>
                  {/* <Route exact path="/mod-tools/:id" component={ModTools}></Route> */}
                  <Route exact path="/mod-tools/:name" component={ModTools}></Route>
                </ModToollLayout>
              )
            }}>
            </Route>

            <Route path="/" children={() => {
              return (
                <FullLayout>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/search-result/:search" component={Search}></Route>
                  <Route exact path="/create-group" component={Community}></Route>
                  <Route exact path="/edit-group/:groupId" component={EditGroup}></Route>
                  {/*  <Route exact path="/group/details/:id" component={GroupDetails}></Route>
                  */} <Route exact path="/group/details/:name" component={GroupDetails}></Route>
                  <Route exact path="/create-post" component={CreatePost}></Route>
                  <Route exact path="/edit-post/:postid" component={EditPost}></Route>
                  {/* <Route exact path="/create-group-post/:id" component={CreateGroupPost}></Route> */}
                  <Route exact path="/create-group-post/:name" component={CreateGroupPost}></Route>
                  {/*    <Route exact path="/group/top-groups" component={TopGroupSearch}></Route> */}
                  <Route exact path="/post-details/:name" component={PostDetails}></Route>
                 {/*  <Route exact path="/post-details/:postid" component={PostDetails}></Route> */}
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

  if (!pageLoad) return <div>Loading...</div>
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
