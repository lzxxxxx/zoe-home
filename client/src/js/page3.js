import React from 'react';
import {render} from 'react-dom';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import "babel-polyfill";
import '../css/aside.scss';
import '../css/write.scss';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import 'react-mde/lib/styles/css/react-mde-preview.css';
import 'font-awesome/css/font-awesome.css';

import fetchData from './utils/fetch.js';

class Md extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactMdeValue: {text: '', selection: null},
        };
    }

    handleValueChange (value)  {
      this.setState({reactMdeValue: value});
    }
    handleSubmit (){
      //发请求，取出当前 this.state.reactMdeValue
      
      fetchData('/addBlog',{
        method: 'POST',
        body: JSON.stringify({
          title: '标题后期加',
          desc: '描述后期加',
          content: this.state.reactMdeValue.text
        })
      })
      .then(function(res){
        console.log(res.json());
      })
    }

    render() {
        return (
            <div className="container">
                <div className="submit-btn" onClick={this.handleSubmit.bind(this)}>
                  提交
                </div>
                <ReactMde
                  textAreaProps={{
                      id: 'ta1',
                      name: 'ta1',
                  }}
                  value={this.state.reactMdeValue}
                  onChange={this.handleValueChange.bind(this)}
                  commands={ReactMdeCommands.getDefaultCommands()}
                />
            </div>
        );
    }
}
render(<Md />, document.querySelector('.main'))