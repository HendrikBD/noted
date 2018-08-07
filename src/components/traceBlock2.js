import React from 'react';

export default class TraceBlock extends React.Component {
  constructor(props){
    super(props);
    this.updateChildHeights();
  }

  // Finds and returns the svg drawing to be rendered.
  getTraceSVG() {
    let traceHeight = this.props.nodes.byId[this.props.nodeId].trace.height;
    let trace = [];

    if(this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].parentNode].toggled) {
      trace.push(<path key={0} d={"M 10,0 v " + traceHeight} strokeWidth="8" stroke="black"/>)
      if(this.props.nodes.byId[this.props.nodeId].toggled) {
        trace.push(<path key={1} d={"M 10," + traceHeight+ " a 4 4 0 0 0 4 4"} strokeWidth="8" stroke="black"/>)
      }

      this.props.nodes.byId[this.props.nodeId].trace.childHeights.forEach((height,i) => {
        trace.push(<path key={i+2} d={"M 14," + Number(height+4) + "h 25"} strokeWidth="8" stroke="black"/>)
      })
    }

    return trace
  }

  // Continually updates the trace height request animation frame. Decides whether vertical lines or horizontal lines should be changed. Will update the trace heights as well as all trace widths.
  updateTrace() {
    let node = this.props.nodes.byId[this.props.nodeId];

    // Calculating the maxTrace, where the vertical trace should terminate
    let maxTrace = this.props.nodes.byId[this.props.nodeId].trace.maxHeight-12;

    let traceDiff = (maxTrace - this.props.nodes.byId[this.props.nodeId].trace.height);

    this.props.updateTraceState(this.props.nodeId, {height: node.trace.height+2*Math.sign(traceDiff)});

    // If the last childs width and the trace height are equal to the target values. When closing, target values are zero, when opening target values are a static width and the max trace
    if(this.props.nodes.byId[this.props.nodeId].trace.height != maxTrace){
      window.requestAnimationFrame(this.updateTrace.bind(this))
    }
  }

  // Calculates the heights of each child. If toggled off will return empty array. Should be called every time this node is, or any of its children is toggled. (Not when parent toggled)
  updateChildHeights() {
    let childHeights = [];

    if(this.props.nodes.byId[this.props.nodeId].toggled && this.props.nodes.byId[this.props.nodeId].childNodes.length>0) {
      childHeights.push(16)
      for(let i=0; i<this.props.nodes.byId[this.props.nodeId].childNodes.length-1; i++){
        let child = this.props.nodes.byId[this.props.nodeId].childNodes[i];
        let nestedChildren = countNestedChildren(this.props.nodes, child);
        childHeights.push(28*(nestedChildren+1) + childHeights[i])
      }
    }
    this.props.updateTraceState(this.props.nodeId, {childHeights: childHeights})
    this.updateTrace();
  }

  getTraceHeight() {
    let height = 0;
    this.props.nodes.byId[this.props.nodeId].childNodes.forEach(nodeId =>
      height += this.props.nodes.byId[nodeId].height
    )
    return height
  }

  render() {
    let traceBlockHeight = this.props.nodes.byId[this.props.nodeId].trace.maxHeight;
    let traceHeight = this.props.nodes.byId[this.props.nodeId].trace.height;
    if(this.props.nodes.byId[this.props.nodeId].toggled) {
      traceBlockHeight +=21;
    }

    return(
      <div className="traceBlock" height={traceBlockHeight + 'px'}>
          <svg height={traceBlockHeight + 'px'}>
            {(this.props.nodes.byId[this.props.nodeId].toggled && this.props.nodes.byId[this.props.nodeId].childNodes.length>0) ? this.getTraceSVG() : ''}
          </svg>
      </div>
    )
  }
}
