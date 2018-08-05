import { TOGGLE_NODE, UPDATE_TRACE, SET_HEIGHT } from './types';

export function toggleNode(nodeId) {
  return {
    type: TOGGLE_NODE,
    nodeId: nodeId
  }
}

export function updateTrace(nodeId, traceUpdate) {
  return {
    type: UPDATE_TRACE,
    nodeId: nodeId,
    traceUpdate: traceUpdate
  }
}

export function setHeight(nodeId, height) {
  return {
    type: SET_HEIGHT,
    nodeId: nodeId,
    height: height
  }
}
