import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination as MuiTablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(1),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#faf7f0',
      // backgroundColor: '#f7f7fa'
      // backgroundColor: theme.palette.primary.light
    },
    '& tbody td': {
      fontWeight: '300',
      // fontSize: '0.75em'
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}));

export default function useTable(records, headCells, filterFunc) {
  const classes = useStyles();
  const pages = [ 5, 10, 25 ];
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(pages[page]);
  const [ order, setOrder ] = useState();
  const [ orderBy, setOrderBy ] = useState();

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (arr, comparator) => {
    const stabilizedThis = arr.map((el, index) => [ el, index ]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const recordsAfterSorting = () =>
    stableSort(filterFunc.func(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );

  const handleSortRequest = (cellId) => {
    const isAscending = orderBy === cellId && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(cellId);
  };

  const TableContainer = ({ children, size=null }) => (
    <Table size={size} className={classes.table}>{children}</Table>
  );
  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
              {headCell.disableSorting ? headCell.label :
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => handleSortRequest(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
              }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const TablePagination = () => (
    <MuiTablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return { TableContainer, TableHeader, TablePagination, recordsAfterSorting };
}
