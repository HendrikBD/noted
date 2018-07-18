import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Node from './node'

const Hierarchy = ({nodes}) => (
  <div className='hierarchy'>
    {nodes.byId[0].childNodes.map(nodeId => 
      <Node nodes={nodes} nodeId={nodeId}/>
    )}
  </div>
)


const mapStateToProps = state => {
  return {
    nodes: state.noted.nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNode: id => {
      dispatch(toggleNode(id))
    }
  }
}

export default connect(mapStateToProps, null)(Hierarchy)
