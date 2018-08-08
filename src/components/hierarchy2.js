import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleNode, updateTrace, setHeight } from '../actions/notedActions';

import Node from './node2'

class Hierarchy extends React.Component {
  constructor(props){
    super(props)
  }

  // Function to coordinate drawing of traces, will be called before each frame while there are still updates to be made
  updateTraces() {
    // Update all traces of active nodes. (Inactive nodes should be set to automatically respond to changes in height)
    //
    // Check if any trace has reach another node
    // if yes, activate the node, and check if this trace is completed (last childNode)
    //
    // if trace is completed, set as inactive & set component trace height to respond to child changes
    //
    // if any active nodes, recall fn before next frame
  }

  render() {
    return (
    <div className='hierarchy'>
        {this.props.nodes.byId[0].childNodes.map(nodeId =>
          <Node key={nodeId} nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggle} updateTraceState={this.props.updateTrace} setHeight={this.props.setHeight} updateTraces={this.updateTraces.bind(this)}/>
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
