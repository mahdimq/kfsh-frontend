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

import { formatDate, age } from '../../helpers/dateFormatter';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchVisits, fetchAllVisits } from '../../actions/actions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import VisitForm from './VisitForm';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '60%'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fffbf2 !important'
    }
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

export default function Visit() {
  const { mrn } = useParams();
  const classes = useStyles();
  const [ loading ] = useFetchHook(fetchVisits(mrn));
  const [ load ] = useFetchHook(fetchAllVisits());
  const { visit } = useSelector((state) => state.patient);
  const { visits } = useSelector((state) => state.patient);

  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    visit,
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
    if (!loading && visit.length === 0) return <h1>NO VISITS FOUND</h1>;
  }

  return (
    <div>
      {!load && (
        <PageHeader
          title='View Patient Visit'
          subtitle={
            visits[visits.length - 1].ped_log_num ? (
              `Current Running Log: NPL#: ${visits[visits.length - 1]
                .log_num} / P-NPL#: ${visits[visits.length - 1].ped_log_num}`
            ) : (
              `Current Running Log: NPL#: ${visits[visits.length - 1].log_num}`
            )
          }
          icon={<LocalHospitalIcon fontSize='large' />}
        />
      )}

      {!loading && (
        <React.Fragment>
          <div
            style={{
              margin: '0.5em 4em',
              border: 'solid brown 2px',
              textAlign: 'center'
            }}>
            <h2>
              {visit[0].p_firstname} {visit[0].p_middlename} {visit[0].p_lastname}
            </h2>
            <h3>
              NATIONALITY: {visit[0].nationality} - GENDER: {visit[0].gender} - DOB:{' '}
              {formatDate(visit[0].dob)}
            </h3>
            <h3>AGE: {age(visit[0].dob)}</h3>
          </div>

          <Paper className={classes.pageContent}>
            <VisitForm />
            <TableContainer>
              <TableHeader />
              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow
                    className={classes.link}
                    key={item.log_num}
                    component={Link}
                    to={`/visits/${item.patient_mrn}/${item.log_num}`}>
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
            <TablePagination />
          </Paper>
        </React.Fragment>
      )}
    </div>
  );
}
