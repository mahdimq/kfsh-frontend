import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
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
import PatientForm from './PatientForm';
import { useFetchHook } from '../../helpers/useFetch';

import { formatDate, age } from '../../helpers/dateFormatter';

import { useSelector } from 'react-redux';
import { getAllPatients } from '../../actions/actions';

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
        else
          return items.filter(
            (x) => JSON.stringify(x.mrn).includes(target.value)
            // x.firstname.toLowerCase().includes(target.value.toLowerCase())
          );
      }
    });
  };

  {
    loading && <h1>LOADING Patients...</h1>;
  }

  return (
    <div>
      <PageHeader
        title='View Patients'
        subtitle='Neurophysiology Department'
        icon={<LocalHospitalIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            className={classes.searchInput}
            label='Search MRN'
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

        {/* <PatientForm /> */}
        
        {!loading && (
          <React.Fragment>
            <TableContainer>
              <TableHeader />

              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow key={item.mrn}>
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
        )}
      </Paper>
    </div>
  );
}

export default Patients;
