import React from 'react';

export default class Node extends React.Component {
  getRenderHeight(nodeId) {
    let height = 0;

    if(this.props.nodes.byId[nodeId].toggled){
      console.log(this.props.nodes.byId[nodeId].name,'toggled')
      this.props.nodes.byId[nodeId].childNodes.forEach((childId) => {
        height += 20 + this.getRenderHeight(childId)
      })
    }
    return height
  }

  render() {

    let points = "10,0 10," + this.props.nodes.byId[this.props.nodeId].traceHeight;
    return(
      <div className="traceBlock">
        <svg>
          <polyline points={points} stroke="black" stroke-width="5"/>
        </svg>
      </div>
    )
  }
}
