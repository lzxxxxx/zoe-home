import React from 'react';
import './index.scss';

class Article extends React.Component {
  render (){
    return (
      <div className="article">
        <div className="title">
          标题
        </div>
        <div className="content">
          我是内容
          特别多内容
        </div>
      </div>
    )
  }
}

export default Article;