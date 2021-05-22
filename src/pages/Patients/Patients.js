import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import { Add, Apartment, Search } from '@material-ui/icons';
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
import PatientForm from './PatientForm';
import { useFetchHook } from '../../hooks/useFetch';

import { formatDate, age } from '../../helpers/dateFormatter';
import { useSelector } from 'react-redux';
import { getAllPatients } from '../../actions/actions';
import { Link } from 'react-router-dom';
import Popup from '../../components/Popup';
import Button from '../../hooks/controls/Button';
import { useDispatch } from 'react-redux';
import { addPatient, addAlert } from '../../actions/actions';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textTransform:'capitalize'
  },
  searchInput: {
    width: '60%'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fffbf2 !important'
    },
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
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
  const dispatch = useDispatch();
  // const { mrn } = useParams();
  const classes = useStyles();
  const [ openPopup, setOpenPopup ] = useState(false);
  const [ loading ] = useFetchHook(getAllPatients());
  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { patients } = useSelector((state) => state.patient);

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    patients,
    headCells,
    filterFunc
  );

  const handleSearch = (e) => {
    // e.preventDefault();
    const target = e.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
      }
    });
  };

  {
    loading && <h1>LOADING Patients...</h1>;
  }

  const addOrEdit = (patient, handleReset) => {
    async function get() {
      try {
        await dispatch(addPatient(patient));
        // history.goBack();
      } catch (err) {
        dispatch(addAlert(err, 'error'));
      }
    }
    get();
    handleReset();
    setOpenPopup(false);
  };

  return (
    !loading && (
      <div>
        <PageHeader
          title='View Patients'
          subtitle='Neurophysiology Department'
          icon={<Apartment fontSize='large' />}
        />
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Input
              className={classes.searchInput}
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
            <Button
              label='Add New Patient'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
          </Toolbar>

          <React.Fragment>
            <TableContainer size="small">
              <TableHeader />

              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow
                    className={classes.link}
                    key={item.mrn}
                    component={Link}
                    to={`/visits/${item.mrn}`}>
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

            <TablePagination />
          </React.Fragment>
        </Paper>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New Patient'>
          <PatientForm addOrEdit={addOrEdit} />
        </Popup>
      </div>
    )
  );
}

export default Patients;
