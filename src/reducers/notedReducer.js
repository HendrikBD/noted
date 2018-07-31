import { TOGGLE_NODE, UPDATE_TRACE, UPDATE_TRACE_HEIGHT, UPDATE_CHILD_HEIGHTS, UPDATE_TRACE_WIDTHS } from '../actions/types';
import initialState from '../lib/initialState';

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case TOGGLE_NODE:
      newState.nodes.byId[action.nodeId].toggled = !newState.nodes.byId[action.nodeId].toggled;
      return newState;
    case UPDATE_TRACE:
      Object.keys(action.traceUpdate).forEach(key => {
        newState.nodes.byId[action.nodeId][key] = action.traceUpdate[key];
      })
      return newState;
    default:
      return state;
  }
}
