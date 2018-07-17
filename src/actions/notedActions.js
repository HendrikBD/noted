import { TOGGLE_NODE } from './types';

export function toggleNode(nodeId) {
  return {
    type: TOGGLE_NODE,
    nodeId: nodeId
  }
}
