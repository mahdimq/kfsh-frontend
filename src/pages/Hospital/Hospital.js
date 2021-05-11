import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { MoreTwoTone, Search } from '@material-ui/icons';

import { useSelector } from 'react-redux';
import { loadHospitalData, loadLocations, loadTests } from '../../actions/actions';

import {
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';

import { useFetchHook } from '../../helpers/useFetch';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}));

const initialValues = {
  procedure_id: '',
  test_cpt: '',
  quantity: 0
};

const headCells = [
  { id: 'log_num', label: 'NPL Log ID' },
  { id: 'ped_log_num', label: 'P-NPL Log ID' },
  { id: 'name', label: 'Procedure' },
  { id: 'visit_id', label: 'Visit ID' }
];

export default function Hospital() {
  const classes = useStyles();
  const { data } = useSelector((state) => state.hospital);
  const [ loading ] = useFetchHook(loadHospitalData());
  // console.log("DATA: ", data)

  console.log('DATA: ', data, typeof data)
    

  // const [ filterFunc, setFilterFunc ] = useState({
  //   func: (items) => {
  //     return items;
  //   }
  // });

  // console.log('console.log(thingS: ', things))

  // const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
  // data,
  // headCells,
  // filterFunc
  // );

  // const handleSearch = (e) => {
  //   // e.preventDefault();
  //   const target = e.target;
  //   setFilterFunc({
  //     func: (items) => {
  //       if (target.value === '') return items;
  //       else
  //         return items.filter(
  //           (x) => JSON.stringify(x.mrn).includes(target.value)
  //           // x.firstname.toLowerCase().includes(target.value.toLowerCase())
  //         );
  //     }
  //   });
  // };

  // {
  //   loading && <h1>LOADING data...</h1>;
  // }

  return (
    <div>
      <PageHeader
        title='Hospital Information Page'
        subtitle='Neurophysiology Department'
        icon={<LocalHospitalIcon fontSize='large' />}
      />
      {/* <Paper className={classes.pageContent}> */}
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

        {/* <ProcedureForm /> */}

        {/* {!loading && (
          <React.Fragment>
            <TableContainer>
              <TableHeader />

              <TableBody>
                {morethings.map((item) => (
                  <TableRow>
                    <TableCell>{item.locations}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>

            <TablePagination />

          </React.Fragment>
        )} */}
      {/* </Paper> */}
    </div>
  );
}
