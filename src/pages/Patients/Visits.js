import React, { useState } from 'react';
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
// import PatientForm from './PatientForm';
// import { useFetchHook } from '../../helpers/useFetch';

import { formatDate, age } from '../../helpers/dateFormatter';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  },
  searchInput: {
    width: '60%'
  }
}));

export default function Procedures() {
  const classes = useStyles();
  return (
    <div>
      <PageHeader
        title='View Patient Procedures'
        subtitle='Neurophysiology Department'
        icon={<LocalHospitalIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        {/* <Toolbar>
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
        </Toolbar> */}

      </Paper>
    </div>
  )
}
