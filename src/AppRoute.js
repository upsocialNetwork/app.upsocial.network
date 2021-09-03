import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { setHttpClientConfig } from './utils/common';
import Session from './utils/session';

import ErrorBoundary from './ErrorBoundary';
import Layout from './views/Layout'
import Home from './views/Home';
import Login from './views/Login';

import Message from './components/Message'
import Loader from './components/Loader'


const AuthorizeRoute = () => {

  return (
    <Layout>         
      <Route exact path="/" component={Home} ></Route>
    </Layout>
  )
}



const AppRoute = (props) => {
    const history = useHistory();
    let [pageLoading, setPageLoading] = useState(false);
    useEffect(()=>{
      setHttpClientConfig().then(function(){
        setPageLoading(true)
      });
      
    })

    return (
      <Router>
        <ErrorBoundary>
            <Message />
            <Loader />
            {pageLoading ?
              <Switch>
                <Route>
                  <Switch>
                    <Suspense fallback={<div>Loding...</div>}>                      
                        <Route exact path="/" component={AuthorizeRoute}></Route>
                        <Route exact path="/login" component={Login}></Route>                      
                    </Suspense>
                  </Switch>
                </Route>
                <Redirect from="*" to="/" />
              </Switch>
              :
              null
            }
            
        </ErrorBoundary>
      </Router>
    );
}

export default AppRoute;
