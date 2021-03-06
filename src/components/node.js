import React from 'react';
import PropTypes from 'prop-types';
import { toggleNode } from '../actions/notedActions';

import TraceBlock from './traceBlock';


class Node extends React.Component {
  constructor(props){
    super(props)
  }

  onClick(){
    this.props.toggleNode(this.props.nodeId);
    this.updateParentTrace()
  }

  updateParentTrace() {
    if(this.props.nodes.byId[this.props.nodeId].parentNode>0) {
      this.props.updateParentTrace();
    }
    this.refs.trace.updateChildHeights();
  }

  render() {
    var childNodes=[];
    var nodeClasses = (this.props.nodes.byId[this.props.nodes.byId[this.props.nodeId].parentNode].toggled) ? 'node toggled': 'node';
    let traceOn = (this.props.nodes.byId[this.props.nodeId].childNodes.length>0 && this.props.nodes.byId[this.props.nodeId].toggled)

    this.props.nodes.byId[this.props.nodeId].childNodes.forEach(nodeId => {
      if(this.props.nodes.byId[this.props.nodes.byId[this.props.nodes.byId[nodeId].parentNode].parentNode].toggled){
        childNodes.push(<Node key={nodeId} nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggleNode} updateTrace={this.props.updateTrace} updateParentTrace={this.updateParentTrace.bind(this)} />)
      }
    })

    return (
      <div className={nodeClasses}>

        <div className="head">
          <div className='icon' onClick={this.onClick.bind(this)}>
            <svg>
              <circle cx='9' cy='9' r='7.5' strokeWidth='3' stroke='black' fill="none"></circle>
              <circle cx='9' cy='9' r='4.5' strokeWidth='1' fill="black"></circle>
            </svg>
          </div>
        </div>
        <div className="title">
          {this.props.nodes.byId[this.props.nodeId].name}
        </div>

        <TraceBlock ref={'trace'} nodes={this.props.nodes} nodeId={this.props.nodeId} updateTrace={this.props.updateTrace}/>

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

export default Node
