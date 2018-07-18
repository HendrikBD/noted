import React from 'react';

export default class Node extends React.Component {

  render() {

    let points = "10,0 10,10" ;
    return(
      <div className="traceBlock">
        <svg>
          <polyline points={points} stroke="black" stroke-width="5"/>
        </svg>
      </div>
    )
  }
}
