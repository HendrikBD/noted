import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p>Hello from React!</p>;
  }
}

render(<App/>, document.getElementById('app'));

console.log("Hello from javascript");
