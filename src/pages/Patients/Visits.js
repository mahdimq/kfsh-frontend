import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { useFetchHook } from '../../helpers/useFetch';
import { addAlert, fetchVisits } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import kfshAPI from '../../kfshAPI';
import { FETCH_ALL_USERS } from '../../actions/actionTypes';

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
  { id: 'log_num', label: 'NPL' },
  { id: 'ped_log_num', label: 'P-NPL' },
  { id: 'patient_mrn', label: 'MRN' },
  { id: 'procedure_id', label: 'Procedure' },
  { id: 'physician_id', label: 'Physician' },
  { id: 'user_id', label: 'Technologist' },
  { id: 'visit_date', label: 'Date of Visit' },
  { id: 'location_id', label: 'Location' }
];

export default function Visits() {
  const { mrn } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);
  const [ visit, setVisit ] = useState([]);
  const [ details, setDetails ] = useState();

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

  const getVisits = async () => {
    setLoading(true);
    try {
      const result = await kfshAPI.getVisits(mrn);
      setVisit((prev) => [ ...prev, ...result ]);
     } catch (error) {
      await dispatch(addAlert(error, 'error'));
    }
    setLoading(false);
  };

  // const getDetails = useCallback(
  //   () => {
  //     const res = visit.map( (info) => (
  //       Promise.all([
  //          kfshAPI.getUser(info.user_id),
  //          kfshAPI.getSinglePhysician(info.physician_id),
  //          kfshAPI.getProcedure(info.procedure_id),
  //          kfshAPI.getLocation(info.location_id),
  //          kfshAPI.getPatient(info.patient_mrn),
  //        ])).then(res => setDetails(res))
  //      )
  //   },
  //   [],
  // )


  useEffect(() => {
    getVisits();
    // getDetails();
  }, []);


  return (
    <div>
      <PageHeader
        title='View Patient Visits'
        subtitle='Neurophysiology Department'
        icon={<LocalHospitalIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        {!loading && (
          <React.Fragment>
            <TableContainer>
              <TableHeader />

              <TableBody>
                {recordsAfterSorting().map((item) => (
                  <TableRow key={item.log_num}>
                   
                    <TableCell>{item.log_num}</TableCell>
                    <TableCell>{item.ped_log_num}</TableCell>
                    <TableCell>{item.patient_mrn}</TableCell>
                    <TableCell>{item.procedure_id}</TableCell>
                    <TableCell>{item.physician_id}</TableCell>
                    <TableCell>{item.user_id}</TableCell>
                    <TableCell>{formatDate(item.visit_date)}</TableCell>
                    <TableCell>{item.location_id}</TableCell>
                  
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
