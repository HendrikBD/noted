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
      <path key={0} d={"M 10,0 v " + traceHeight} strokeWidth="8" stroke="black"/>,
      <path key={1} d={"M 10," + traceHeight+ " a 4 4 0 0 0 4 4"} strokeWidth="8" stroke="black"/>
    ]

    this.props.traceHeights.forEach((height,i) => {
      trace.push(<path key={i+2} d={"M 14," + Number(height+4) + "h 25"} strokeWidth="8" stroke="black"/>)
    })

    return trace
  }

  render() {
    let maxTrace = Math.max(0, ...this.props.traceHeights);

    return(
      <div className="traceBlock">
        <div className="trace" style={{height: maxTrace+8 +'px'}}>
          <svg>
            {this.getTraceSVG()}
          </svg>
        </div>
      </div>
    )
  }
}
