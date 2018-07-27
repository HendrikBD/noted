import { TOGGLE_NODE } from '../actions/types';
import initialState from '../lib/initialState';

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_NODE:
      const newState = Object.assign({}, state);
      newState.nodes.byId[action.nodeId].toggled = !newState.nodes.byId[action.nodeId].toggled;
      return newState;
    default:
      return state;
  }
}
