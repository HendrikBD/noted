import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleNode, updateTrace} from '../actions/notedActions';

import Node from './node2'

class Hierarchy extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className='hierarchy'>
        {this.props.nodes.byId[0].childNodes.map(nodeId =>
          [<div className="nodeContainer" key={nodeId}>
            <Node nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggle} updateTrace={this.props.updateTrace}/>
          </div>
          ]
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
