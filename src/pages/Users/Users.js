import React, { useState } from 'react';
import Registration from './Registration';
import PageHeader from '../../components/PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { Search } from '@material-ui/icons';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';
import { useFetchHook } from '../../helpers/useFetch';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../actions/actions';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  },
  searchInput: {
    width: '60%'
  }
}));

const headCells = [
  { id: 'id', label: 'Employee ID' },
  { id: 'firstname', label: 'Full Name' },
  { id: 'is_admin', label: 'Admin Account' }
];

function Users() {
  const classes = useStyles();
  const [ loading ] = useFetchHook(fetchUsers());
  const { users } = useSelector((state) => state.user);
  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    users,
    headCells,
    filterFunc
  );

  const handleSearch = (e) => {
    // e.preventDefault();
    const target = e.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === '') return items;
        else
          return items.filter(
            (x) =>
              x.firstname.toLowerCase().includes(target.value.toLowerCase()) ||
              x.lastname.toLowerCase().includes(target.value.toLowerCase())
          );
      }
    });
  };
  
  {loading && <h1>LOADING Users...</h1>}

  return (
    <div>
      <PageHeader
        title='View Users'
        subtitle='Neurophysiology Department'
        icon={<GroupIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            className={classes.searchInput}
            label='Search Users'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
        </Toolbar>

        {/* <Registration /> */}

        {!loading && (
          <React.Fragment>
            <TableContainer>
              <TableHeader />

              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {item.firstname} {item.lastname}
                    </TableCell>
                    <TableCell>{item.is_admin.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>

            <TablePagination />
          </React.Fragment>
        )}
      </Paper>
    </div>
  );
}

export default Users;
