import React from 'react';
import {render} from 'react-dom';
import "babel-polyfill";

import '../css/aside.scss';
import '../css/listitem.scss'
import fetchData from './utils/fetch.js';
import formattime from './utils/timeFormatter.js'

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
              {this.props.prop.time&&formattime(this.props.prop.time)}
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

class List extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      listData: [],
    }
  }
  async componentWillMount (){
    let res = await fetchData('/getBlog');
    this.setState({listData: res});
  }
  render (){
    return this.state.listData && this.state.listData.map((item, idx)=>{//尾调用优化
      return (
        <ListItem prop={item} key={idx}/>
      )
    })
  }
}

render( <List />, document.querySelector('.main'))


