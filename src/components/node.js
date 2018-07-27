import React from 'react';
import { toggleNode } from '../actions/notedActions';

import TraceBlock from './traceBlock';


export default class Node extends React.Component {

  onClick(){
    this.props.toggleNode(this.props.nodeId)
  }


  render() {
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

        <div className="trace">
          <TraceBlock nodes={this.props.nodes} nodeId={this.props.nodeId} key={this.props.nodeId}/>
        </div>

        <div className="children">
          { this.props.nodes.byId[this.props.nodeId].childNodes.map(nodeId =>
            <Node nodes={this.props.nodes} nodeId={nodeId}/>
          )}
        </div>

      </div>
    )
  }
}
