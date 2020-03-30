import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import routes from './routes';

ReactGA.initialize('UA-110256706-2');
// eslint-disable-next-line no-undef
ReactGA.pageview(window.location.pathname + window.location.search);

export default function App() {
  return (
    <React.Suspense fallback="">
      <Switch>
        {routes.map((route) => (
          <Route exact key={route.path} path={route.path} component={route.component} />
        ))}
      </Switch>
    </React.Suspense>
  );
}
