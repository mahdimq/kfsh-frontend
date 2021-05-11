import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Search } from '@material-ui/icons';

import { useSelector } from 'react-redux';
import { fetchAllProcedures } from '../../actions/actions';

import { InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';
// import PatientForm from './PatientForm';
// import { useFetchHook } from '../../helpers/useFetch';

import { formatDate, age } from '../../helpers/dateFormatter';
import ProcedureForm from './ProcedureForm';
import { useFetchHook } from '../../helpers/useFetch';

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
  { id: 'log_num', label: 'NPL Log ID' },
  { id: 'ped_log_num', label: 'P-NPL Log ID' },
  { id: 'name', label: 'Procedure' },
  { id: 'visit_id', label: 'Visit ID' },
];

export default function Procedures() {
  const classes = useStyles();
  const [ loading ] = useFetchHook(fetchAllProcedures());
  const { procedures } = useSelector((state) => state.procedure);

  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    procedures,
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
    loading && <h1>LOADING Procedures...</h1>;
  }

  return (
    <div>
      <PageHeader
        title='View Patient Procedures'
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

        {/* <ProcedureForm /> */}

        {!loading && (
          <React.Fragment>
            <TableContainer>
              <TableHeader />

              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.log_num}</TableCell>
                    <TableCell>{item.ped_log_num}</TableCell>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>{item.visit_id}</TableCell>
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