import { TOGGLE_NODE, UPDATE_TRACE, SET_HEIGHT } from '../actions/types';
import initialState from '../lib/initialState';

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case TOGGLE_NODE:
      newState.nodes.byId[action.nodeId].toggled = !newState.nodes.byId[action.nodeId].toggled;
      return newState;
    case UPDATE_TRACE:
      Object.keys(action.traceUpdate).forEach(key => {
        newState.nodes.byId[action.nodeId].trace[key] = action.traceUpdate[key];
        if(key==='active') {
          if(newState.nodes.byId[action.nodeId].trace.active===true) {
            newState.nodes.active.push(action.nodeId);
          } else {
            let index = newState.nodes.active.indexOf(action.nodeId)
            if(index>-1) {
              newState.nodes.active.splice(index, 1);
            }
          }
        }
      })
      return newState;
    case SET_HEIGHT:
      newState.nodes.byId[action.nodeId].height = action.height;
      return newState
    default:
      return state;
  }
}
