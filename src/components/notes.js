import React from 'react';
import PropTypes from 'prop-types';

import './style/notes.css';
import Sidebar from './sidebar';

var marked = require("marked");
marked.setOptions({sanitize: true})

class Notes extends React.Component {

  render() {

    let mark = marked('# Hello There!\n<script>console.log("from the other side...")</script>')

    return (
      <div id="notes">
        <Sidebar/>
        <div class="note">
          <div dangerouslySetInnerHTML={{__html: mark}}></div>
        </div>
      </div>
    )
  }
}


export default Notes;
