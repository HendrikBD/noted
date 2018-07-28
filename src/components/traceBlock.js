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

  getTraceSVG() {
    let maxTrace = Math.max(0, ...this.props.traceHeights);

    let trace = [
      <path d={"M 10,0 v " + maxTrace} stroke-width="8" stroke="black"/>,
      <path d={"M 10," + maxTrace + " a 4 4 0 0 0 4 4"} stroke-width="8" stroke="black"/>
    ]

    this.props.traceHeights.forEach(height => {
      trace.push(<path d={"M 14," + Number(height+4) + "h 25"} stroke-width="8" stroke="black"/>)
    })

    return trace
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
