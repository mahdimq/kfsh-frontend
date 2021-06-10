import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography, Grid, Toolbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { loadHospitalData, addAlert } from '../../actions/actions';
import kfshAPI from '../../kfshAPI';
import ActionButton from '../../hooks/controls/ActionButton';
import { Add, Close } from '@material-ui/icons';
import ConfirmDialog from '../../components/ConfirmDialog';
import Popup from '../../components/Popup';
import Button from '../../hooks/controls/Button';
import HospitalForm from './HospitalForm';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(1),
    textTransform: 'capitalize',
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    },
    '& tbody td': {
      fontWeight: '300'
      // fontSize: '0.75em'
    },
    width: 300
  },
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  },
  table2: {
    marginTop: theme.spacing(1),
    textTransform: 'capitalize',
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    },
    '& tbody td': {
      fontWeight: '300'
      // fontSize: '0.75em'
    }
  }
}));

export default function Hospital() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  const [ openPopup, setOpenPopup ] = useState(false);

  const { procedures, locations, departments, testCodes, physicians } = useSelector(
    (state) => state.hospital
  );
  const [ confirmDialog, setConfirmDialog ] = useState({
    isOpen: false,
    title: '',
    subtitle: ''
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      await dispatch(loadHospitalData());
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const deleteProcedure = async (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    await kfshAPI.deleteProcedure(id);
    dispatch(
      addAlert('Deleted Successfully, please refresh to reflect changes', 'error')
    );
  };

  const deleteLocation = async (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    await kfshAPI.deleteLocation(id);
    dispatch(
      addAlert('Deleted Successfully, please refresh to reflect changes', 'error')
    );
  };

  const deleteDepartment = async (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    await kfshAPI.deleteDepartment(id);
    dispatch(
      addAlert('Deleted Successfully, please refresh to reflect changes', 'error')
    );
  };

  const deleteTestCode = async (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    await kfshAPI.deleteTestCode(id);
    dispatch(
      addAlert('Deleted Successfully, please refresh to reflect changes', 'error')
    );
  };

  const deletePhysician = async (id) => {
    setConfirmDialog({ ...ConfirmDialog, isOpen: false });
    await kfshAPI.deletePhysician(id);
    dispatch(
      addAlert('Deleted Successfully, please refresh to reflect changes', 'error')
    );
  };

  const handleSubmit = () => setOpenPopup(false);
  const handleClose = () => setOpenPopup(false);

  useEffect(
    () => {
      fetchData();
    },
    [ dispatch ]
  );

  return (
    !loading && (
      <div>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Grid item>
              <Typography align='center' variant='h4' component='div'>
                Hospital Internal Data
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                label='Add New Detail'
                variant='contained'
                startIcon={<Add />}
                className={classes.newButton}
                onClick={() => setOpenPopup(true)}
                color='primary'
              />
            </Grid>
          </Toolbar>
        </Paper>

        <Paper className={classes.pageContent}>
          <Grid container spacing={4} justify='center'>
            <Grid item>
              <Typography align='center' variant='h6' component='div'>
                Procedures
              </Typography>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label='Procedure Table'
                  size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {procedures.map((item) => (
                      <TableRow key={uuid()} hover>
                        <TableCell>{item.procedure_name}</TableCell>
                        <TableCell>
                          <ActionButton
                            color='secondary'
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: `Are you sure you want to delete ${item.procedure_name}?`,
                                subtitle: "You can't undo this operation",
                                onConfirm: () => {
                                  deleteProcedure(item.id);
                                }
                              })}>
                            <Close fontSize='small' />
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item>
              <Typography align='center' variant='h6' component='div'>
                Locations
              </Typography>
              <TableContainer>
                <Table className={classes.table} aria-label='Location Table' size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {locations.map((item) => (
                      <TableRow key={uuid()} hover>
                        <TableCell>{item.location_name}</TableCell>
                        <TableCell>
                          <ActionButton
                            color='secondary'
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: `Are you sure you want to delete ${item.location_name}?`,
                                subtitle: "You can't undo this operation",
                                onConfirm: () => {
                                  deleteLocation(item.id);
                                }
                              })}>
                            <Close fontSize='small' />
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item>
              <Typography align='center' variant='h6' component='div'>
                Departments
              </Typography>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label='Department Table'
                  size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {departments.map((item) => (
                      <TableRow key={uuid()} hover>
                        <TableCell>{item.department_name}</TableCell>
                        <TableCell>
                          <ActionButton
                            color='secondary'
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: `Are you sure you want to delete ${item.department_name}?`,
                                subtitle: "You can't undo this operation",
                                onConfirm: () => {
                                  deleteDepartment(item.id);
                                }
                              })}>
                            <Close fontSize='small' />
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.pageContent}>
          <Grid container spacing={4} justify='center'>
            <Grid item>
              <Typography align='center' variant='h6' component='div'>
                Tests
              </Typography>
              <TableContainer>
                <Table aria-label='Tests Table' size='small' className={classes.table2}>
                  <TableHead>
                    <TableRow>
                      <TableCell>CPT</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {testCodes.map((item) => (
                      <TableRow key={item.cpt} hover>
                        <TableCell>{item.cpt}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <ActionButton
                            color='secondary'
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: `Are you sure you want to delete CPT: ${item.cpt}?`,
                                subtitle: "You can't undo this operation",
                                onConfirm: () => {
                                  deleteTestCode(item.cpt);
                                }
                              })}>
                            <Close fontSize='small' />
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item>
              <Typography align='center' variant='h6' component='div'>
                Physicians
              </Typography>
              <TableContainer>
                <Table
                  aria-label='Physician Table'
                  size='small'
                  className={classes.table2}>
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {physicians.map((item) => (
                      <TableRow key={uuid()} hover>
                        <TableCell>{item.firstname}</TableCell>
                        <TableCell>{item.lastname}</TableCell>
                        <TableCell>{item.d_name}</TableCell>
                        <TableCell>
                          <ActionButton
                            color='secondary'
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: `Are you sure you want to delete: Dr. ${item.firstname} ${item.lastname}?`,
                                subtitle: "You can't undo this operation",
                                onConfirm: () => {
                                  deletePhysician(item.id);
                                }
                              })}>
                            <Close fontSize='small' />
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>

        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        <Popup openPopup={openPopup} handleClose={handleClose} title='Add New Detail'>
          <HospitalForm handleSubmit={handleSubmit} setOpenPopup={setOpenPopup} />
        </Popup>
      </div>
    )
  );
}
