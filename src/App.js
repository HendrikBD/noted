import React from 'react';
import { Provider } from 'react-redux';

import './app.css';
import { Notes } from './components/notes.js';
import { Navbar } from './components/navbar.js';
import store from './store';


export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <Navbar/>
          <Notes/>
        </div>
      </Provider>
    )
  }
}
