import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import PostComments from './components/PostComments';
import './Styles/main.css';

// import PostsIndex from './components/PostsIndex';
// import PostsNew from './components/PostsNew';
// import PostsShow from './components/PostsShow';

// import configureStore from './store';
// const store = configureStore();

// The <Switch> component will only show the first route contained within it that matches a pattern
ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:userId/posts" component={Post} />
          <Route path="/:postId/post-comments" component={PostComments} />
        </Switch>
    </BrowserRouter>
  // </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();

// <Route path="/posts/new/" component={PostsNew} />
//           <Route path="/posts/:id" component={PostsShow} />
//           <Route path="/" component={PostsIndex} />