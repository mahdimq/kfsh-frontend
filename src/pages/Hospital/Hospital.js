import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchVisits,
  getVisitInfo,
  loadHospitalData,
  loadLocations,
  loadTests
} from '../../actions/actions';

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
import kfshAPI from '../../kfshAPI';
import { useParams } from 'react-router';

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
  {
    id: 'log_num',
    label: 'NPL Log ID'
  },
  {
    id: 'ped_log_num',
    label: 'P-NPL Log ID'
  },
  {
    id: 'name',
    label: 'Procedure'
  },
  {
    id: 'visit_id',
    label: 'Visit ID'
  }
];

export default function Hospital() {
  const { mrn } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  // const { data } = useSelector((state) => state.hospital);
  // const [ loading ] = useFetchHook(fetchVisits(2348));
  // console.log("DATA: ", data)
  const [ loading, setLoading ] = useState(true);
  // const [ locations, setLocations ] = useState();
  // const [ physicians, setPhysicians ] = useState();
  // const [ tests, setTests ] = useState();
  // const [ procedures, setProcedures ] = useState();
  // const [ departments, setDepartments ] = useState();
  const [ state, setState ] = useState();

  // const visits = useSelector((state) => state.visit);

  // {
  //   !loading && console.log(visits);
  // }
  // async function getInfo () {
  //   const res = await dispatch(getVisitInfo(2348))
  //   console.log(res)
  // }

  // useEffect(() => {
  //   getInfo()
  // }, [])

  const getInfo = async () => {
      setLoading(true);
    //   try {
    //     const res = await kfshAPI.getVisits(mrn)
    //     .then(res => console.log(res))
    // const result = await dispatch(fetchVisits(2348))

    // console.log("result from dispatch hospital", result)
    const result = await Promise.all([
      kfshAPI.getLocations(),
      kfshAPI.getPhysicians(),
      kfshAPI.getTests(),
      kfshAPI.getProcedures(),
      kfshAPI.getDepartments()
    ])
      .then((res) => Array.from(res))
      .then(res => setState(res))
      // .then((res) => res.map((items) => setState(items)));
    // setLocations(result[0].locations);
    // setPhysicians(result[1].physicians);
    // setPhysicians(result[2].tests);
    // setPhysicians(result[3].procedures);
    // setPhysicians(result[4].departments);
    //   } catch (error) {
    //     console.log(error);
    //   }
      setLoading(false);
    
  };

  useEffect(() => {
    getInfo();
  }, []);

  // console.log(state)
  // state.map(i => i.map(j => console.log(j)))

  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    // [locations, physicians, tests, procedures, departments],
    // headCells,
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

  // {
  //   loading && <h1>LOADING data...</h1>;
  // }

  return (
    <div>
      <PageHeader
        title='Hospital Information Page'
        subtitle='Neurophysiology Department'
        icon={<LocalHospitalIcon fontSize='large' />}
      />{' '}
      {' '}
      <Paper className={classes.pageContent}>
        {' '}
        {/* <ProcedureForm /> */}{' '}
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
                  )} */}{' '}
      </Paper>{' '}
    </div>
  );
}
