import css from './app.css';
import React from 'react';
import {render} from 'react-dom';

import { Notes } from './components/notes.js';
import { Navbar } from './components/navbar.js';

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Notes/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
