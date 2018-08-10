import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleNode, updateTrace, setHeight } from '../actions/notedActions';

import Node from './node2'

class Hierarchy extends React.Component {
  constructor(props){
    super(props)
    props.nodes.byId[0].childNodes.forEach(nodeId => {
      this.drawTrace(nodeId);
      setTimeout(()=>this.eraseNestedTraces.bind(this)(nodeId), 3000);
    })
  }

  // Deals with drawing the trace
  // Simply draws the trace and starts the children
  drawTrace(nodeId) {
    var node = this.props.nodes.byId[nodeId];
    var incrementalTrace;

    let index = node.trace.horizontalTraceTrigs.lastIndexOf(true);


    incrementalTrace = (index>-1) ? node.trace.height - node.trace.childHeights[node.trace.horizontalTraceTrigs.lastIndexOf(true)] : node.trace.height;
    this.updateChildHeights(nodeId);
    incrementalTrace = (index>-1) ? incrementalTrace + node.trace.childHeights[node.trace.horizontalTraceTrigs.lastIndexOf(true)] : node.trace.height;

    if(!node.trace.horizontalTraceTrigs[node.trace.horizontalTraceTrigs.length-1] && node.toggled && node.childNodes.length>0) {
      this.props.updateTrace(nodeId, {height: incrementalTrace+2});
    }

    // Ensure that trace.height > childHeights if it has already passed them
    this.updateBlockHeight(nodeId)

    // 
    // Check each child; if trace.height> childHeight && childWidth<25, increment horizontal trace
    // If horizontal trace reaches end, start next trace (do in conditional to ensure it only occurs once)
    node.trace.childHeights.forEach((childHeight, i) => {
      if(!node.trace.horizontalTraceTrigs[i] && node.trace.height>=childHeight) {
        let horizontalTraceTrigs = node.trace.horizontalTraceTrigs.slice();
        horizontalTraceTrigs[i] = true;
        this.props.updateTrace(nodeId, {horizontalTraceTrigs: horizontalTraceTrigs});

      }
      if(node.trace.horizontalTraceTrigs[i] && node.trace.childTraceWidths[i]<25) {
        let childTraceWidths = node.trace.childTraceWidths.slice();
        childTraceWidths[i] +=2;
        if(childTraceWidths[i]>=25) {
          childTraceWidths[i] = 25;
          this.drawTrace(node.childNodes[i])
        }
        this.props.updateTrace(nodeId, {childTraceWidths: childTraceWidths});
      }
    })
    // console.log(node.trace.childTraceWidths)

    if(node.toggled && node.trace.childTraceWidths[node.trace.childTraceWidths.length-1]<25) {
      window.requestAnimationFrame(() => this.drawTrace(nodeId));
    }
  }

  eraseNestedTraces(nodeId) {
    var node = this.props.nodes.byId[nodeId];

    node.childNodes.forEach(childId => {
      let child = this.props.nodes.byId[childId];
      if(child.toggled && child.childNodes.length>0) {
        this.eraseNestedTraces.bind(this)(childId);
      }
    })

    this.eraseTrace(nodeId);
  }

  eraseTrace(nodeId) {
    var node = this.props.nodes.byId[nodeId];
    var incrementalTrace;

    let childTraceWidths = node.trace.childTraceWidths.slice();

    node.childNodes.forEach((childId, i) => {
      let child = this.props.nodes.byId[childId];
      // console.log(child.name + ': ' + child.trace.height)
      if(child.trace.height===0 && childTraceWidths[i]>0) {
        childTraceWidths[i] -=2;
        if(childTraceWidths[i]<=0) {
          childTraceWidths[i] = 0;
          let traceTrigs = node.trace.horizontalTraceTrigs.slice();
          traceTrigs[i] = false;
          this.props.updateTrace(nodeId, {horizontalTraceTrigs: traceTrigs});
        }
      }
    })
    this.props.updateTrace(nodeId, {childTraceWidths: childTraceWidths});


    let index = node.trace.horizontalTraceTrigs.lastIndexOf(true);

    incrementalTrace = (index>-1) ? node.trace.height - node.trace.childHeights[node.trace.horizontalTraceTrigs.lastIndexOf(true)] : node.trace.height;
    this.updateChildHeights(nodeId);
    incrementalTrace = (index>-1) ? incrementalTrace + node.trace.childHeights[node.trace.horizontalTraceTrigs.lastIndexOf(true)] : node.trace.height;

    incrementalTrace -= 2;

    if(index>-1) {
      incrementalTrace = (incrementalTrace<node.trace.childHeights[index]) ? node.trace.childHeights[index] : incrementalTrace;
    } else {
      incrementalTrace = (incrementalTrace<0) ? 0 : incrementalTrace;
    }

    this.props.updateTrace(nodeId, {height: incrementalTrace});

    this.updateBlockHeight(nodeId)

    if(node.trace.height>0) {
      window.requestAnimationFrame(() => this.eraseTrace.bind(this)(nodeId))
    } else {
      this.hideTraceBlock.bind(this)(nodeId);
    }
  }

  hideTraceBlock(nodeId) {
    console.log('hide')
    let node = this.props.nodes.byId[nodeId]
    let blockHeight = node.trace.blockHeight-2;

    blockHeight = blockHeight<0 ? 0 : blockHeight;
    this.props.updateTrace(nodeId, {blockHeight: blockHeight})
    if(blockHeight>0) {
      window.requestAnimationFrame(()=>this.hideTraceBlock.bind(this)(nodeId));
    }
  }

  updateTraces(nodeId) {
  }

  updateChildHeights(nodeId) {
    let childHeights = [];
    var node = this.props.nodes.byId[nodeId];

    if(this.props.nodes.byId[nodeId].childNodes.length>0) {
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
    if(node.childNodes.length>0 && this.props.nodes.byId[node.childNodes[node.childNodes.length-1]].toggled) {
      let lastChild = this.props.nodes.byId[node.childNodes[node.childNodes.length-1]];
      this.updateBlockHeight(lastChild.id)
      blockHeight += lastChild.trace.blockHeight
    }
    // let blockHeight = node.toggled ? node.trace.height + 40 : 0;
    // blockHeight += (node.childNodes.length>0) ? this.props.nodes[node.childNodes[node.childNodes.length-1]].trace.blockHeight : 
    this.props.updateTrace(nodeId, {blockHeight: blockHeight})
  }

  render() {
    return (
    <div className='hierarchy'>
        {this.props.nodes.byId[0].childNodes.map(nodeId =>
          <Node key={nodeId} nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggle} updateTraceState={this.props.updateTrace} setHeight={this.props.setHeight} updateTraces={this.updateTraces.bind(this)} />
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
