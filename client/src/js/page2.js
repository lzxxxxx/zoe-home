import React from 'react';
import {render} from 'react-dom';
import "babel-polyfill";

import '../css/aside.scss';
import '../css/listitem.scss'
import fetchData from './utils/fetch.js';

class ListItem extends React.Component {
  constructor (props){
    super(props)
  }
  render (){
    return (
      <div className="listitem-contain">
        <div className="title-contain">
          <div className="listitem-title">
            {this.props.prop.title}
          </div>
          <div className="listitem-subtitle">
            <div className="time">
              {this.props.prop.time}
            </div>
            <div className="tags">
              {this.props.prop.tags}
            </div>
          </div>
        </div>

        <div className="content-contain">
          {this.props.prop.content}
        </div>
      </div>
    )
  }
}

const listData = [
  {
    title: '博客搭建总结',
    time: '2018年2月12日',
    tags: '技术积累',
    content: '这是一篇占坑博客。等真搭建完了，再让我详细说……'
  },
  {
    title: '博客搭建总结',
    time: '2018年2月12日',
    tags: '技术积累',
    content: '这是一篇占坑博客。等真搭建完了，再让我详细说……'
  },
  {
    title: '博客搭建总结',
    time: '2018年2月12日',
    tags: '技术积累',
    content: '这是一篇占坑博客。等真搭建完了，再让我详细说……'
  },
  {
    title: '博客搭建总结',
    time: '2018年2月12日',
    tags: '技术积累',
    content: '这是一篇占坑博客。等真搭建完了，再让我详细说……'
  },
]

class List extends React.Component {
  constructor (props){
    super(props)
  }
  async componentWillMount (){
    let res = await fetchData('/getBlog');
    alert(JSON.stringify(res)+'====');
  }
  render (){
    return listData.map((item, idx)=>{
      return (
        <ListItem prop={item} key={idx}/>
      )
    })
  }
}

render( <List />, document.querySelector('.main'))


