import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Comments from './components/Comments';
import './Styles/main.css';
import store from './store';
import Posts from './components/Posts';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:userId/posts" component={Posts} />
          <Route path="/:postId/post-comments" component={Comments} />
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();