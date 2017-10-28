import Immutable from 'immutable';

export const AJAX = 'AJAX';
const AJAX_PENDING = 'AJAX_PENDING';
const AJAX_FULFILLED = 'AJAX_FULFILLED';
const AJAX_REJECTED = 'AJAX_REJECTED';

export const ajaxReducer = (state = Immutable.Map({}), action) => {
  switch (action.type) {
    case AJAX_PENDING:
      return state.setIn([action.meta.name, 'pending'], true);      
    case AJAX_FULFILLED:
      return state.set(action.meta.name, Immutable.fromJS(action.payload));
    case AJAX_REJECTED:
      return state.set(action.meta.name, Immutable.Map({error: true, status: action.payload.status}));
    default:
      return state;
  }
};

export const LOCAL = 'LOCAL';

export const localReducer = (state = Immutable.Map({}), action) => {
  switch(action.type) {
    case LOCAL:
      return state.setIn([action.name, action.key], action.value);
    default:
      return state;
  }
}
