import React from 'react';
// import { Provider } from 'react-redux';

import { Notes } from './components/notes.js';
import { Navbar } from './components/navbar.js';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Notes/>
      </div>
    )
  }
}
