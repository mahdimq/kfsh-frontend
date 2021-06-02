import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { Add, MenuBook, Search } from '@material-ui/icons';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';

import { formatDate, age } from '../../helpers/dateFormatter';
import { useFetchHook } from '../../hooks/useFetch';
import { addAlert, fetchAllVisits } from '../../actions/actions';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Button from '../../hooks/controls/Button';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    textTransform:'capitalize'
  },
  searchInput: {
    width: '60%'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      // backgroundColor: '#fffbf2 !important'
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    }
  }
}));

const headCells = [
  { id: 'visit_date', label: 'Date' },
  { id: 'patient_mrn', label: 'MRN', disableSorting: true },
  { id: 'p_firstname', label: 'Name', disableSorting: true},
  { id: 'procedure_id', label: 'Procedure', disableSorting: true },
  { id: 'location_id', label: 'Location', disableSorting: true},
  { id: 'physician_id', label: 'Physician', disableSorting: true},
  { id: 'user_id', label: 'Technologist', disableSorting: true},
  { id: 'log_num', label: 'NPL' },
  { id: 'ped_log_num', label: 'PNPL', disableSorting: true}
];

export default function Visits() {
  const classes = useStyles();
  const [ loading ] = useFetchHook(fetchAllVisits());
  const { visits } = useSelector((state) => state.patient);

  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    // visits,
    headCells,
    filterFunc
  );

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => JSON.stringify(x.patient_mrn).includes(target.value));
      }
    });
  };


  // { if (!loading && visits.length === 0) return <h1>NO LOGS FOUND</h1>}
{ if (loading) return <Spinner />}

  return (
    !loading && (
      <div>
        <PageHeader
          title='View Logbook'
          subtitle={`Current Running Log: NPL#: ${visits[visits.length-1].log_num} / P-NPL#: ${visits[visits.length - 1].ped_log_num}`}
          icon={<MenuBook fontSize='large' />}
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
            {/* <Button
              label='Add New Patient'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            /> */}
          </Toolbar>

          
            <TableContainer size="small">
              <h4>Visits component</h4>
              <TableHeader />

              <TableBody>
                {recordsAfterSorting(visits).map((item) => (
                  <TableRow
                    className={classes.link}
                    key={item.log_num}
                    component={Link}
                    to={`/visits/${item.log_num}`}>

                    <TableCell>{formatDate(item.visit_date)}</TableCell>
                    <TableCell>{item.patient_mrn}</TableCell>
                    <TableCell>
                      {item.p_firstname} {item.p_middlename} {item.p_lastname}
                    </TableCell>
                    <TableCell>{item.procedure_name}</TableCell>
                    <TableCell>{item.location_name}</TableCell>
                    <TableCell>
                      {item.firstname} {item.lastname}
                    </TableCell>
                    <TableCell>
                      {item.user_firstname} {item.user_lastname}
                    </TableCell>
                    <TableCell>{item.log_num}</TableCell>
                    <TableCell>{item.ped_log_num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>

            <TablePagination count={visits.length}/>
        
        </Paper>
      </div>
    )
  );
}
