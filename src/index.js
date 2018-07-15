import css from './app.css';
import React from 'react';
import {render} from 'react-dom';

import { Notes } from './components/notes.js';

class App extends React.Component {
  render () {
    return (<div>
      <p>Hello from React!</p>
      <Notes/>
    </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
