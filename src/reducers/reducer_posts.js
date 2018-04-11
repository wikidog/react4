import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state={}, action) {

  switch (action.type) {

    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POST:
      // keep all the existing data
      // the new added one will overwrite the existing one
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_POSTS:
      // transform an array to an object
      // [ {id: 4, title: 'Hi'}, {id: 5, title: 'There'}]
      // { 4: {id: 4, title: 'Hi'}, 5: {id: 5, title: 'There'} }
      return _.mapKeys(action.payload.data, 'id');

    default:
      return state;
  }
};
