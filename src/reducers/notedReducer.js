import { TOGGLE_NODE } from '../actions/types';
import initialState from '../lib/initialState';

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_NODE:
      return state;
    default:
      return state;
  }
}
