import React, { useReducer } from 'react'
import PropTypes from 'prop-types';

import { apiGet } from '../../api';
import {GET_DATA_TABLE} from '../types';

import TableContext from './TableContext';

const TableState = ({ children }) => {
  const initialState = {
    dataTable: {}
  };

  const [state, dispatch] = useReducer(useReducer, initialState);

  async function getTableData(url) {
    const response = await apiGet(url);
    dispatch({
      type: GET_DATA_TABLE,
      payload: response
    });
  }

  return (
    <TableContext.Provider value={{
      dataTable: state.dataTable,
      getTableData
    }}>
      {children}
    </TableContext.Provider>
  )
}

TableState.propTypes = {
  children: PropTypes.node
}

export default TableState
