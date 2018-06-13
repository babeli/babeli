import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Projects from './Projects';
import Login from './Login';

const Views = () => (
  <Switch>
    <Route exact path="/" component={Projects} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default Views;
