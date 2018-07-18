import React from 'react';


export default class Node extends React.Component {
  render() {
    return (
      <div className="node">
        <svg>
          <circle cx='9' cy='9' r='7.5' stroke-width='3' stroke='black' fill="none"></circle>
          <circle cx='9' cy='9' r='4.5' stroke-width='1' fill="black"></circle>
        </svg>
        {this.props.nodes.byId[this.props.nodeId].name}
        { this.props.nodes.byId[this.props.nodeId].childNodes.map(nodeId => 
          <Node nodes={this.props.nodes} nodeId={nodeId}/>
        )}
      </div>
    )
  }
}
