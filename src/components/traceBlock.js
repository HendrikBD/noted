import React from 'react';

export default class TraceBlock extends React.Component {
  constructor(props){
    super(props);
    this.updateChildHeights();
  }

  getRenderHeight(nodeId) {
    let height = 0;

    if(this.props.nodes.byId[nodeId].toggled){
      this.props.nodes.byId[nodeId].childNodes.forEach((childId) => {
        height += 20 + this.getRenderHeight(childId)
      })
    }
    return height
  }

  // Finds and returns the svg drawing to be rendered.
  getTraceSVG() {
    let traceHeight = this.props.nodes.byId[this.props.nodeId].traceHeight;
    let trace = [];

    if(this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].parentNode].toggled) {
      trace.push(<path key={0} d={"M 10,0 v " + traceHeight} strokeWidth="8" stroke="black"/>)
      if(this.props.nodes.byId[this.props.nodeId].toggled) {
        trace.push(<path key={1} d={"M 10," + traceHeight+ " a 4 4 0 0 0 4 4"} strokeWidth="8" stroke="black"/>)
      }

      this.props.nodes.byId[this.props.nodeId].childHeights.forEach((height,i) => {
        trace.push(<path key={i+2} d={"M 14," + Number(height+4) + "h 25"} strokeWidth="8" stroke="black"/>)
      })
    }

    return trace
  }

  // Continually updates the trace height request animation frame. Decides whether vertical lines or horizontal lines should be changed. Will update the trace heights as well as all trace widths.
  updateTrace() {
    let node = this.props.nodes.byId[this.props.nodeId];
    let maxTrace = Math.max(0, ...this.props.nodes.byId[this.props.nodeId].childHeights);
    let traceDiff = (maxTrace - this.props.nodes.byId[this.props.nodeId].traceHeight);

    this.props.updateTrace(this.props.nodeId, {traceHeight: node.traceHeight+2*Math.sign(traceDiff)});

    // If the last childs width and the trace height are equal to the target values. When closing, target values are zero, when opening target values are a static width and the max trace
    if(this.props.nodes.byId[this.props.nodeId].traceHeight != maxTrace){
      window.requestAnimationFrame(this.updateTrace.bind(this))
    }
  }

  // Calculates the heights of each child. If toggled off will return empty array. Should be called every time this node is, or any of its children is toggled. (Not when parent toggled)
  updateChildHeights() {
    let childHeights = [];
    if(this.props.nodes.byId[this.props.nodeId].toggled) {
      childHeights.push(16)
      for(let i=0; i<this.props.nodes.byId[this.props.nodeId].childNodes.length-1; i++){
        let child = this.props.nodes.byId[this.props.nodeId].childNodes[i];
        let nestedChildren = countNestedChildren(this.props.nodes, child);
        childHeights.push(28*(nestedChildren+1) + childHeights[i])
      }
    }
    this.props.updateTrace(this.props.nodeId, {childHeights: childHeights})
    this.updateTrace();
  }

  render() {
    let traceBlockHeight;
    traceBlockHeight = this.props.nodes.byId[this.props.nodeId].traceHeight+10;
    if(this.props.nodes.byId[this.props.nodeId].toggled) {
      traceBlockHeight +=8;
    }

    return(
      <div className="traceBlock">
        <div className="trace" style={{height: traceBlockHeight +'px'}}>
          <svg>
            {this.getTraceSVG()}
          </svg>
        </div>
      </div>
    )
  }
}

function countNestedChildren(nodes, nodeId) {
  let nestedChildren = 0;

  if(nodes.byId[nodeId].childNodes.length>0 && nodes.byId[nodeId].toggled){
    nodes.byId[nodeId].childNodes.forEach((child) => {
      nestedChildren++;
      nestedChildren += countNestedChildren(nodes, child);
    })
  }
  return nestedChildren;
}
