import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { commentsRoutes, mainRoutes, postsRoutes } from './static/routes';

import Home from './components/Home';
import Comments from './components/Comments/Comments';
import Posts from './components/Posts/Posts';
import store from './ducks/store';

import './assets/styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={mainRoutes} component={Home} />
        <Route path={postsRoutes} component={Posts} />
        <Route path={commentsRoutes} component={Comments} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
