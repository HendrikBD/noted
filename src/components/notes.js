import React from 'react';
import css from './style/notes.css'
import { Sidebar } from './sidebar'

export class Notes extends React.Component {

  render() {
    return (
      <div id="notes">
        <Sidebar/>
        <div class="note">
        </div>
      </div>
    )
  }
}

