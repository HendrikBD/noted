import React from 'react';
import PropTypes from 'prop-types';
import { toggleNode } from '../actions/notedActions';

import TraceBlock from './traceBlock2';


class Node extends React.Component {
  constructor(props){
    super(props)
    this.trace = React.createRef();
    this.props.updateTraceState(this.props.nodeId, {maxHeight: 28*(this.countNestedChildren.bind(this)(this.props.nodes, this.props.nodeId))})
  }

  onClick(){
    this.props.toggleNode(this.props.nodeId);

    if(this.props.nodes.byId[this.props.nodeId].toggled) {
      this.props.drawTrace(this.props.nodeId);
    } else {
      this.props.eraseNestedTraces(this.props.nodeId);
    }
  }

  updateParentTraces() {
    if(this.props.nodes.byId[this.props.nodeId].parentNode>0) {
      this.props.updateParentTraces();
    }
    this.props.updateTraceState(this.props.nodeId, {maxHeight: 28*(this.countNestedChildren.bind(this)(this.props.nodes, this.props.nodeId))})
    this.trace.current.updateTrace();

  }

  countNestedChildren(nodes, nodeId) {
    let nestedChildren = 0;
    if(nodes.byId[nodeId].childNodes.length>0 && nodes.byId[nodeId].toggled){
      nodes.byId[nodeId].childNodes.forEach((child) => {
        nestedChildren++;
        nestedChildren += this.countNestedChildren.bind(this)(nodes, child);
      })
    }
    return nestedChildren;
  }

  updateHeight() {
    let height = this.getRenderHeight(this.props.nodeId);
    this.props.setHeight(this.props.nodeId, height)
  }

  getRenderHeight(nodeId) {
    let height = 0;
    let nestedChildren = this.countNestedChildren(this.props.nodes,nodeId);
    height = (nestedChildren+1)*28;

    return height
  }

  getHeadSVG() {
    var trace = [
      <circle key='outerCircle' cx='9' cy='9' r='7.5' strokeWidth='3' stroke='black' fill="none"></circle>,
      <circle key='innerCircle' cx='9' cy='9' r='4.5' strokeWidth='1' fill="black"></circle>
    ]

    return trace
  }

  getTraceBlockHeight(nodeId) {
    var node = this.props.nodes.byId[nodeId];
    let traceBlockHeight = node.trace.height + 12;
    if(node.childNodes.length>0 && this.props.nodes.byId[node.childNodes[node.childNodes.length-1]].toggled) {
      traceBlockHeight += this.getTraceBlockHeight(node.childNodes[node.childNodes.length-1]);
    }
    return traceBlockHeight
  }

  render() {
    let traceOn = (this.props.nodes.byId[this.props.nodeId].childNodes.length>0)
    let node = this.props.nodes.byId[this.props.nodeId];

    var childNodes=[];
    var nodeClasses = 'node';
    let traceBlockHeight = this.props.nodes.byId[this.props.nodeId].trace.blockHeight;
    let nodeHeight = this.getTraceBlockHeight.bind(this)(node.id)+28;

    if(traceOn) {

      this.props.nodes.byId[this.props.nodeId].childNodes.forEach(nodeId => {
        childNodes.push(<Node key={nodeId} nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggleNode} updateTraceState={this.props.updateTraceState} updateParentTraces={this.updateParentTraces.bind(this)} setHeight={this.props.setHeight} updateTraces={this.props.updateTraces} eraseNestedTraces={this.props.eraseNestedTraces} drawTrace={this.props.drawTrace}/>)
      })
    }


    return (
      <div className={nodeClasses} style={{height: nodeHeight+'px'}}>

        <div className="head">
          <div className='icon' onClick={this.onClick.bind(this)}>
            <svg>
              {this.getHeadSVG()}
            </svg>
          </div>
        </div>
        <div className="title">
          {this.props.nodes.byId[this.props.nodeId].name}
        </div>

        <TraceBlock ref={this.trace} nodes={this.props.nodes} nodeId={this.props.nodeId} toggleNode={this.props.toggleNode} updateTraceState={this.props.updateTraceState} updateParentTraces={this.updateParentTraces.bind(this)} countNestedChildren={this.countNestedChildren}/>

        <div className="children">
          {childNodes}
        </div>
      </div>
    )
  }
}

// Node.propTypes = {
//   nodes: PropTypes.shape({
//     byId: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string,
//       parentNode: PropTypes.number,
//       childNodes: PropTypes.arrayOf(PropTypes.number),
//       toggled: PropTypes.bool
//     })),
//     allIds: PropTypes.arrayOf(PropTypes.number).isRequired
//   })
// }

export default Node
