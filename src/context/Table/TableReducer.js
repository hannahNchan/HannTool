import { CALL_TABLE, GET_DATA_TABLE } from '../types';

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_DATA_TABLE:
      return {
        ...state,
        dataTable: payload
      }
    default:
      return state;
  }
}
