import React from 'react';
import {render} from 'react-dom';
import ReactMarkdown from 'react-markdown';

import fetchData from './utils/fetch.js'

import '../css/aside.scss';

class Content extends React.Component {
  constructor (){
    super()
  }
  componentWillMount (){
    fetchData('/getBlogcontent',{
      method: 'POST',
      body: JSON.stringify({
        id: '5a8fc1911806075ef635f14c'
      })
    })
    .then(function(res){
      this.setState({data: res});
    })
  }
  render (){
    return (
       <ReactMarkdown source={this.state.data.content} escapeHtml={false}/>
    )
  }
}

render(<Content />,document.querySelector('.main'));