import React, { useState } from 'react';
import Registration from './Registration';
import PageHeader from '../../components/PageHeader';
import GroupIcon from '@material-ui/icons/Group';
import { Add, Close, EditOutlined, Search } from '@material-ui/icons';
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
import { useFetchHook } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import {
  fetchUsers,
  registerUser,
  addAlert,
  removeUser,
  updateUser
} from '../../actions/actions';
import Popup from '../../components/Popup';
import Button from '../../hooks/controls/Button';

import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../components/ConfirmDialog';
import ActionButton from '../../hooks/controls/ActionButton';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textTransform:'capitalize'
  },
  searchInput: {
    width: '60%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}));

const headCells = [
  { id: 'id', label: 'Employee ID' },
  { id: 'firstname', label: 'Full Name' },
  { id: 'is_admin', label: 'Admin Account' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ openPopup, setOpenPopup ] = useState(false);
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
  const [ recordForEdit, setRecordForEdit ] = useState();
  const [ confirmDialog, setConfirmDialog ] = useState({
    isOpen: false,
    title: '',
    subtitle: ''
  });

  const handleSearch = (e) => {
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

  const addOrEdit = (user, handleReset) => {
    async function get() {
      try {
        await dispatch(registerUser(user));
      } catch (err) {
        await dispatch(addAlert(err, 'error'));
      }
    }
    get();
    handleReset();
    // setRecordForEdit(null)
    setOpenPopup(false);
  };

  // const openInPopup = (item) => {
  //   setRecordForEdit(item);
  //   setOpenPopup(true)
  // };

  const handleDelete = (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    dispatch(removeUser(id));
    dispatch(addAlert('Deleted Successfully', 'error'));
  };

  {
    loading && <Spinner />;
  }

  return (
    !loading && (
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
            <Button
              label='Add New User'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
          </Toolbar>

          <TableContainer>
            <TableHeader />

            <TableBody>
              {recordsAfterSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.firstname} {item.lastname}
                  </TableCell>
                  <TableCell>{item.is_admin ? 'Yes' : 'No'}</TableCell>

                  <TableCell>
                    {/* <ActionButton color='primary' onClick={() => openInPopup(item)}>
                        <EditOutlined fontSize='small' />
                      </ActionButton> */}

                    <ActionButton
                      color='secondary'
                      onClick={() =>
                        setConfirmDialog({
                          isOpen: true,
                          title: `Are you sure you want to delete ${item.firstname}'s account?`,
                          subtitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleDelete(item.id);
                          }
                        })}>
                      <Close fontSize='small' />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>

          <TablePagination />
        </Paper>
        
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New User'>
          <Registration recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>

        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
    )
  );
}

export default Users;
