import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, useHistory, Switch, Redirect } from "react-router-dom";
import { setHttpClientConfig, SetSassion } from './utils/common';

import ErrorBoundary from './ErrorBoundary';
import Layout from './views/Layout'
import Home from './views/Home';

import Message from './components/Message'
import Loader from './components/Loader'


const NotFound = () => {
    let history = useHistory();

    useEffect(()=>{
      history.push('/');
    })

    return null;
}

const AppRoute = () => {
    let history = useHistory();
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
            <Layout>
            {pageLoading ?
              <Switch>
                <Route>
                  <Switch>
                    <Suspense fallback={<div> </div>}>                 
                      <Route exact path="/" component={Home}></Route>               
                      {/* <Route path='*' exact={true} component={NotFound} /> */}
                    </Suspense>
                  </Switch>
                </Route>
                <Redirect from="*" to="/" />
              </Switch>
              :
              null
            }
            </Layout>
        </ErrorBoundary>
      </Router>
    );
}

export default AppRoute;
