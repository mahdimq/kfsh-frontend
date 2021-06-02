import React, { useState, useEffect } from 'react';
import { LocalHospital, MenuBook, Add } from '@material-ui/icons';
import { Search } from '@material-ui/icons';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  Grid,
  Divider,
  ListItem,
  Card
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';

import { formatDate, age } from '../../helpers/dateFormatter';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchVisits, getPatient, addSingleVisit, addAlert } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import VisitForm from '../Visits/VisitForm';
import { Link } from 'react-router-dom';
import Button from '../../hooks/controls/Button';
import Popup from '../../components/Popup';
import Spinner from '../../components/Spinner';
import NameBlock from '../../components/NameBlock';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  notFound: {
    margin: theme.spacing(3),
    padding: theme.spacing(5),
    textTransform: 'capitalize'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fffbf2 !important'
    }
  },
  header: {
    // backgroundColor: '#faf7f0',
    backgroundColor: '#253053',
    color: '#faf7f0',
    '& .MuiListItemText-secondary': {
      color: '#faf7f0',
      opacity: 0.5
    }
  },
  title: {
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 370,
    color: '#faf7f0'
  },
  pageIcon: {
    display: 'inline-block',
    borderRadius: '50%',
    padding: theme.spacing(1)
  },
  titleText: {
    paddingLeft: theme.spacing(2)
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  },
  divider: {
    backgroundColor: '#faf7f0',
    opacity: 0.6
  }
}));

const headCells = [
  { id: 'log_num', label: 'NPL' },
  { id: 'ped_log_num', label: 'PNPL' },
  { id: 'patient_mrn', label: 'MRN' },
  { id: 'procedure_id', label: 'Procedure' },
  { id: 'physician_id', label: 'Physician' },
  { id: 'user_id', label: 'Technologist' },
  { id: 'visit_date', label: 'Visit Date' },
  { id: 'location_id', label: 'Location' }
];

export default function Patient() {
  const { mrn } = useParams();
  const classes = useStyles();
  const [ loading ] = useFetchHook(getPatient(mrn));
  const patient = useSelector((state) => state.patient);
  const [ openPopup, setOpenPopup ] = useState(false);
  const dispatch = useDispatch();
  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    headCells,
    filterFunc
  );

  // const handleSearch = (e) => {
  //   const target = e.target;
  //   setFilterFunc({
  //     func: (items) => {
  //       if (target.value === '') return items;
  //       else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
  //     }
  //   });
  // };

  const addOrEdit = (data, handleReset) => {
    async function add() {
      try {
        await dispatch(addSingleVisit(data));
        // history.goBack();
      } catch (err) {
        dispatch(addAlert(err, 'error'));
      }
    }
    add();
    handleReset();
    setOpenPopup(false);
  };

  {
    if (loading) return <Spinner />;
  }

  if (!patient.visits[0]) {
    return (
      <div>
        <Grid container className={classes.header} alignItems='center'>
          <Grid item sm={5}>
            <ListItem className={classes.title}>
              <Card className={classes.pageIcon}>
                <LocalHospital fontSize='large' color='primary' />
              </Card>

              <Typography className={classes.titleText} variant='h5' component='div'>
                View Patient Visits
              </Typography>
            </ListItem>
          </Grid>

          <Grid item sm={7}>
            <NameBlock patient={patient} />
          </Grid>
        </Grid>

        <Paper className={classes.notFound}>
          <Toolbar>
            <Typography variant='h4' component='div'>
              No Visits Found
            </Typography>
            <Button
              label='Add New Visit'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
          </Toolbar>
        </Paper>

        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New Visit'>
          <VisitForm addOrEdit={addOrEdit} />
        </Popup>
      </div>
    );
  }

  return (
    !loading && (
      <div>
        <Grid container className={classes.header} alignItems='center'>
          <Grid item sm={5}>
            <ListItem className={classes.title}>
              <Card className={classes.pageIcon}>
                <LocalHospital fontSize='large' color='primary' />
              </Card>

              <Typography className={classes.titleText} variant='h5' component='div'>
                View Patient Visits
              </Typography>
            </ListItem>

            <Divider variant='inset' className={classes.divider} />

            <ListItem className={classes.title}>
              <Card className={classes.pageIcon}>
                <MenuBook fontSize='large' color='primary' />
              </Card>

              <Typography className={classes.titleText} variant='h6' component='div'>
                Running Log:
              </Typography>
            </ListItem>
          </Grid>

          <Grid item sm={7}>
            <NameBlock patient={patient} />
          </Grid>
        </Grid>

        <Paper className={classes.pageContent}>
          <Toolbar>
            <Button
              label='Add New Visit'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
          </Toolbar>

          <TableContainer>
            <h4>Patient component</h4>

            <TableHeader />
            <TableBody>
              {recordsAfterSorting(patient.visits).map((item) => (
                <TableRow
                  className={classes.link}
                  key={item.log_num}
                  component={Link}
                  to={`/visits/${item.log_num}`}>
                  <TableCell>{item.log_num}</TableCell>
                  <TableCell>{item.ped_log_num}</TableCell>
                  <TableCell>{item.patient_mrn}</TableCell>
                  <TableCell>{item.procedure_name}</TableCell>
                  <TableCell>
                    {item.firstname} {item.lastname}
                  </TableCell>
                  <TableCell>
                    {item.user_firstname} {item.user_lastname}
                  </TableCell>
                  <TableCell>{formatDate(item.visit_date)}</TableCell>
                  <TableCell>{item.location_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
          <TablePagination count={patient.visits.length} />
        </Paper>

        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New Visit'>
          <VisitForm addOrEdit={addOrEdit} />
        </Popup>
      </div>
    )
  );
}
