import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleNode } from '../actions/notedActions';

import Node from './node'

class Hierarchy extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className='hierarchy'>
        <div></div>
        {this.props.nodes.byId[0].childNodes.map(nodeId =>
          <Node nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggle}/>
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
    }
  }
}

Hierarchy.propTypes = {
  nodes: PropTypes.shape({
    byId: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      parentNode: PropTypes.number,
      childNodes: PropTypes.arrayOf(PropTypes.number),
      toggled: PropTypes.bool
    })),
    allIds: PropTypes.arrayOf(PropTypes.number).isRequired
  })
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  areStatePropsEqual: () => false,
})(Hierarchy)
