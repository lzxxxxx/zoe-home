import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import List from './src/List';
import Article from './src/Article';
import Frame from './src/Component/Frame';
import NotFound from './src/Notfound';


export default ()=>(
    <Router history={browserHistory}>
      <Route path="" component={Frame}>
        <Route path="list" component={List} />
        <Route path="article" component={Article} />
        <Route path="*" component={List}/>
      </Route>
    </Router>
  )