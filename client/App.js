import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import List from './src/List';
import Article from './src/Article';
import NotFound from './src/Notfound';

export default ()=>(
    <Router path="/" history={browserHistory}>
      <IndexRoute component={List} />
      <Route path="list" component={List} />
      <Route path="article" component={Article} />
      <Route path="*" component={NotFound}/>
    </Router>
  )