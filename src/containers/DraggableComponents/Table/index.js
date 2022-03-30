import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const DataGridDemo = ({ styles, rows, columns, data }) => {
  return (
    <div style={styles}>
      <DataGrid {...data} rows={rows} columns={columns} />
    </div>
  );
}

DataGridDemo.defaultProps = {
  rows: [],
  columns: [],
  data: {},
  styles: {
    height: 400,
    width: '100%',
  }
}

DataGridDemo.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.object,
  styles: PropTypes.object
}

export default DataGridDemo;
