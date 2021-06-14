import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Add, Apartment, Search } from '@material-ui/icons';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Grid
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';
import PatientForm from './PatientForm';
import { useFetchHook } from '../../hooks/useFetch';
import { formatDate, age } from '../../helpers/dateFormatter';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Popup from '../../components/Popup';
import Button from '../../hooks/controls/Button';
import { addPatient, addAlert, getAllPatients } from '../../actions/actions';
import Spinner from '../../components/Spinner';
import Home from '../../components/Home'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textTransform: 'capitalize'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      // backgroundColor: '#fffbf2 !important',
      // backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main
    }
  },
}));

const headCells = [
  { id: 'mrn', label: 'MRN' },
  { id: 'firstname', label: 'Full Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'age', label: 'Age' },
  { id: 'age_group', label: 'Age Category' },
  { id: 'nationality', label: 'Nationality' }
];

function Patients() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ loading ] = useFetchHook(getAllPatients());
  const { patients } = useSelector((state) => state.patients);
  const user = useSelector((state) => state.users);
  const [ openPopup, setOpenPopup ] = useState(false);
  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const history = useHistory();

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    headCells,
    filterFunc
  );

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
      }
    });
  };

  const handleAddPatient = async (patient, handleReset) => {
    // async function get() {
    //   try {
    //     await dispatch(addPatient(patient));
    //     // history.goBack();
    //   } catch (err) {
    //     dispatch(addAlert(err, 'error'));
    //   }
    // }
    // get();
    // handleReset();
    // setOpenPopup(false);
    await dispatch(addPatient(patient));
    handleReset();
    setOpenPopup(false);
  };

  const handleClose = () => setOpenPopup(false);

  {
    if (loading && user.token) return <Spinner />;
  }

  { if (!user.token) return <Home />}

  return (
    <div>
      <PageHeader
        title='View Patients'
        subtitle='Neurophysiology Department'
        icon={<Apartment fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item sm={8} xs={12}>
              <Input
                fullWidth
                label='Search MRN'
                type='number'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search />
                    </InputAdornment>
                  )
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                label='Add New Patient'
                variant='outlined'
                startIcon={<Add />}
                className={classes.newButton}
                // onClick={() => setOpenPopup(true)}
                component={Link}
                to={'/addpatient'}
              />
            </Grid>
          </Grid>
        </Toolbar>

        <TableContainer size='small'>
          <TableHeader />

          <TableBody>
            {patients &&
              recordsAfterSorting(patients).map((item) => (
                <TableRow
                  className={classes.link}
                  key={item.mrn}
                  // component={Link}
                  // to={`/patients/${item.mrn}`}
                  onClick={() => history.push(`/patients/${item.mrn}`)}
                  hover>
                  <TableCell>{item.mrn}</TableCell>
                  <TableCell>
                    {item.firstname} {item.middlename} {item.lastname}
                  </TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{formatDate(item.dob)}</TableCell>
                  <TableCell>
                    {age(item.dob)} {age(item.dob) > 1 ? 'yrs' : 'yr'}
                  </TableCell>
                  <TableCell>{item.age_group}</TableCell>
                  <TableCell>{item.nationality}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableContainer>

        <TablePagination count={patients.length} />
      </Paper>

      {/* <Popup openPopup={openPopup} handleClose={handleClose} title='Add New Patient'>
          <PatientForm addOrEdit={handleAddPatient} />
        </Popup>  */}
    </div>
  );
}

export default Patients;
