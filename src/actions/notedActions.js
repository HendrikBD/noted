import { TOGGLE_NODE } from './types';

export const toggleNode = nodeId => {
  dispatch({
    type: TOGGLE_NODE,
    nodeId: nodeId
  })
}
