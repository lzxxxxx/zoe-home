import React from 'react';
import {Link} from 'react-router';
import './index.scss';
// const React = require('react');

function Listitem ({data: {title, content}}){
  return (
    <div className="list-item">
      <Link to="/article">
        <div className="title">
          {title}
        </div>
      </Link>
      <div className="content">
        {content}
      </div>
    </div>
  )
}

class List extends React.Component {
  render (){
    return (
      <div className="list-contain">
        <Listitem data={{title:'博客标题', content: '内容聂荣'}} />
      </div>
    )
  }
}

export default List;