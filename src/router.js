import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import IndexPage from './pages/Home/IndexPage';
import LoginPage from './pages/Login/LoginPage';

const NotFoundPage = () => (<div>Page Not Found!</div>);

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
