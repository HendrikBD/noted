import React from 'react';
import PropTypes from 'prop-types';
import { toggleNode } from '../actions/notedActions';

import TraceBlock from './traceBlock';


class Node extends React.Component {
  constructor(props){
    super(props)
  }

  onClick(){
    this.props.toggleNode(this.props.nodeId)
  }

  getTraceHeights(){
    let traceHeights = [];

    this.props.nodes.byId[this.props.nodeId].childNodes.forEach((child) => {
      let nestedChildren = countNestedChildren(this.props.nodes, child) + 1;
      traceHeights.push(28*nestedChildren)
    })
  }

  render() {
    let childNodes;
    this.getTraceHeights()

    if(this.props.nodes.byId[this.props.nodeId].toggled){
      childNodes=[];
      this.props.nodes.byId[this.props.nodeId].childNodes.map(nodeId=>
        childNodes.push(<Node nodes={this.props.nodes} nodeId={nodeId} toggleNode={this.props.toggleNode}/>)
      )
    }

    return (
      <div className="node">

        <div className="head">
          <div className='icon' onClick={this.onClick.bind(this)}>
            <svg>
              <circle cx='9' cy='9' r='7.5' stroke-width='3' stroke='black' fill="none"></circle>
              <circle cx='9' cy='9' r='4.5' stroke-width='1' fill="black"></circle>
            </svg>
          </div>
        </div>
        <div className="title">
          {this.props.nodes.byId[this.props.nodeId].name}
        </div>

        <TraceBlock nodes={this.props.nodes} nodeId={this.props.nodeId} key={this.props.nodeId}/>

        <div className="children">
          {childNodes}
        </div>

      </div>
    )
  }
}

Node.propTypes = {
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

function countNestedChildren(nodes, nodeId) {
  let nestedChildren = 0;

  if(nodes.byId[nodeId].childNodes.length>0){
    nodes.byId[nodeId].childNodes.forEach((child) => {
      nestedChildren++;
      nestedChildren += countNestedChildren(nodes, child);
    })
  }
  return nestedChildren;
}

export default Node
