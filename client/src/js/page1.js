import React from 'react';
import {render} from 'react-dom';
import ReactMarkdown from 'react-markdown';

import fetchData from './utils/fetch.js'

import '../css/aside.scss';

class Content extends React.Component {
  constructor (){
    super();
    this.state = {
      data: null
    }
  }
  componentWillMount (){
    let id = window.location.search.split('=')[1];
    fetchData('/getBlogcontent',{
      method: 'POST',
      body: JSON.stringify({
        id: id
      })
    })
    .then(function(res){
      this.setState({data: res});
    }.bind(this))
  }
  render (){
    return (
       this.state.data && <ReactMarkdown source={this.state.data.content} escapeHtml={false}/>
    )
  }
}

render(<Content />,document.querySelector('.main'));