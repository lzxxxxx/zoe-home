import React from 'react';
import {render} from 'react-dom';
import ReactMarkdown from 'react-markdown';

import '../css/aside.scss';

const mdtext = "年初并不能真的决定这一年的所有，<br>所以，且行且努力~";

render(<ReactMarkdown source={mdtext} escapeHtml={false}/>,document.querySelector('.main'));