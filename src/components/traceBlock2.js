import React from 'react';

export default class TraceBlock extends React.Component {
  constructor(props){
    super(props);
  }

  // Finds and returns the svg drawing to be rendered.
  getTraceSVG() {
    let traceHeight = this.props.nodes.byId[this.props.nodeId].trace.height;
    let trace = [];

    if(this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].parentNode].toggled) {
      trace.push(<path key={0} d={"M 10,0 v " + traceHeight} strokeWidth="8" stroke="black"/>)
      if(this.props.nodes.byId[this.props.nodeId].trace.blockHeight>0) {
        trace.push(<path key={1} d={"M 10," + traceHeight+ " a 4 4 0 0 0 4 4"} strokeWidth="8" stroke="black"/>)
      }

      this.props.nodes.byId[this.props.nodeId].trace.childHeights.forEach((height,i) => {
        trace.push(<path key={i+2} d={"M 14," + Number(height+4) + " h " + this.props.nodes.byId[this.props.nodeId].trace.childTraceWidths[i]} strokeWidth="8" stroke="black"/>)
      })
    }

    return trace
  }

  // Continually updates the trace height request animation frame. Decides whether vertical lines or horizontal lines should be changed. Will update the trace heights as well as all trace widths.
  updateTrace() {
    this.updateChildHeights();
    let node = this.props.nodes.byId[this.props.nodeId];

    // Calculating the maxTrace, where the vertical trace should terminate
    let maxTrace = node.trace.childHeights[node.trace.childHeights.length-1];
    maxTrace = (maxTrace>0) ? maxTrace : 0;

    let traceDiff = (maxTrace - this.props.nodes.byId[this.props.nodeId].trace.height);
    this.props.updateTraceState(this.props.nodeId, {height: node.trace.height+2*Math.sign(traceDiff)});


    // If the last childs width and the trace height are equal to the target values. When closing, target values are zero, when opening target values are a static width and the max trace
    if(this.props.nodes.byId[this.props.nodeId].trace.height != maxTrace){
      window.requestAnimationFrame(this.updateTrace.bind(this))
    }

    this.updateBlockHeight();
  }

  // Calculates the heights of each child. If toggled off will return empty array. Should be called every time this node is, or any of its children is toggled. (Not when parent toggled)
  updateChildHeights() {
    let childHeights = [];

    if(this.props.nodes.byId[this.props.nodeId].toggled && this.props.nodes.byId[this.props.nodeId].childNodes.length>0) {
      childHeights.push(16)

      for(let i=1; i<this.props.nodes.byId[this.props.nodeId].childNodes.length; i++){
        let child = this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].childNodes[i]];
        let childHeight = childHeights[i-1] + 28;
        if(this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].childNodes[i-1]].toggled && this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].childNodes[i-1]].childNodes.length>0) {
          childHeight += this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].childNodes[i-1]].trace.blockHeight;
        }
        childHeights.push(childHeight);
      }

    }
    this.props.updateTraceState(this.props.nodeId, {childHeights: childHeights})
  }

  updateBlockHeight(){
    let node = this.props.nodes.byId[this.props.nodeId];
    let blockHeight = node.trace.height + 12;
  }

  getTraceHeight() {
    let height = 0;
    this.props.nodes.byId[this.props.nodeId].childNodes.forEach(nodeId =>
      height += this.props.nodes.byId[nodeId].height
    )
    return height
  }

  getBlockHeight(nodeId) {
    var node = this.props.nodes.byId[nodeId];
    let traceBlockHeight = node.trace.height + 12;
    if(node.childNodes.length>0 && this.props.nodes.byId[node.childNodes[node.childNodes.length-1]].toggled) {
      traceBlockHeight += this.getBlockHeight(node.childNodes[node.childNodes.length-1]);
    }
    return traceBlockHeight
  }

  render() {
    var node = this.props.nodes.byId[this.props.nodeId];

    let traceBlockHeight = this.props.nodes.byId[this.props.nodeId].trace.blockHeight;

    let traceHeight = this.props.nodes.byId[this.props.nodeId].trace.height;
    if(this.props.nodes.byId[this.props.nodeId].toggled) {
      traceBlockHeight +=21;
    }

    return(
      <div className="traceBlock" style={{height: traceBlockHeight + 'px'}}>
          <svg>
            {(this.props.nodes.byId[this.props.nodeId].childNodes.length>0) ? this.getTraceSVG() : ''}
          </svg>
      </div>
    )
  }
}
