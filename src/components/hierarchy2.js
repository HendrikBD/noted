import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleNode, updateTrace, setHeight } from '../actions/notedActions';

import Node from './node2'

class Hierarchy extends React.Component {
  constructor(props){
    super(props)
    props.nodes.byId[0].childNodes.forEach(nodeId => {
      props.updateTrace(nodeId, {active: true})
    })
    this.updateActiveTraces()
  }

  // Function to coordinate drawing of traces, will be called before each frame while there are still updates to be made
  updateActiveTraces() {
    let nodes = this.props.nodes;
    let activeNodes = nodes.active;

    // Update all traces of active nodes. (Inactive nodes should be set to automatically respond to changes in height)
    activeNodes.forEach( nodeId =>
      this.updateTrace(nodeId)
    )

    //
    // If any node is still active, call function again prior to next frame
    if(activeNodes.length>0) {
      window.requestAnimationFrame(this.updateActiveTraces.bind(this))
    }
  }

  updateTrace(nodeId) {
    this.updateChildHeights(nodeId);

    let node = this.props.nodes.byId[nodeId];
    let maxTrace = node.trace.childHeights[node.trace.childHeights.length-1];
    maxTrace = (maxTrace>0) ? maxTrace : 0;
    let traceDiff = (maxTrace - this.props.nodes.byId[nodeId].trace.height);

    this.props.updateTrace(nodeId, {height: node.trace.height+2*Math.sign(traceDiff)});

    if(node.trace.height>=node.trace.childHeights[node.trace.childHeights.length-1]) {
      this.props.updateTrace(nodeId, {active: false})
    }

    this.updateBlockHeight(nodeId)

    // Update trace values of node
    // Check if any trace has reach another node
    // if yes, activate the node, and check if this trace is completed (last childNode)
    //
    // if trace is completed, set as inactive & set component trace height to respond to child changes
    // 
  }

  updateChildHeights(nodeId) {
    let childHeights = [];

    if(this.props.nodes.byId[nodeId].toggled && this.props.nodes.byId[nodeId].childNodes.length>0) {
      childHeights.push(16)

      for(let i=1; i<this.props.nodes.byId[nodeId].childNodes.length; i++){
        let child = this.props.nodes.byId[this.props.nodes.byId[nodeId].childNodes[i]];
        let childHeight = childHeights[i-1] + 28;
        if(this.props.nodes.byId[this.props.nodes.byId[nodeId].childNodes[i-1]].toggled && this.props.nodes.byId[this.props.nodes.byId[nodeId].childNodes[i-1]].childNodes.length>0) {
          childHeight += this.props.nodes.byId[this.props.nodes.byId[nodeId].childNodes[i-1]].trace.blockHeight;
        }
        childHeights.push(childHeight);
      }

    }
    this.props.updateTrace(nodeId, {childHeights: childHeights})
  }

  updateBlockHeight(nodeId){
    let node = this.props.nodes.byId[nodeId];
    let blockHeight = node.trace.height + 12;
    // let blockHeight = node.toggled ? node.trace.height + 40 : 0;
    // blockHeight += (node.childNodes.length>0) ? this.props.nodes[node.childNodes[node.childNodes.length-1]].trace.blockHeight : 
    this.props.updateTrace(nodeId, {blockHeight: blockHeight})
  }

  render() {
    return (
    <div className='hierarchy'>
        {this.props.nodes.byId[0].childNodes.map(nodeId =>
          <Node key={nodeId} nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggle} updateTraceState={this.props.updateTrace} setHeight={this.props.setHeight} updateTraces={this.updateActiveTraces.bind(this)}/>
        )}
    </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    nodes: state.noted.nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: id => {
      dispatch(toggleNode(id))
    },
    updateTrace: (id, traceUpdate) => {
      dispatch(updateTrace(id, traceUpdate))
    },
    setHeight: (id, height) => {
      dispatch(setHeight(id, height))
    }
  }
}

// Hierarchy.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  areStatePropsEqual: () => false,
})(Hierarchy)
