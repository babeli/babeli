import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Projects from './Projects';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Projects} />
  </Switch>
);

export default Routes;
