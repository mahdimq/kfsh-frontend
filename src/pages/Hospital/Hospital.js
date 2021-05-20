// import React, { useState, useEffect } from 'react';
// import PageHeader from '../../components/PageHeader';
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchAllVisits,
//   fetchVisits,
//   getVisitInfo,
//   loadHospitalData,
//   loadLocations,
//   loadTests
// } from '../../actions/actions';

// import {
//   InputAdornment,
//   makeStyles,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Toolbar
// } from '@material-ui/core';
// import useTable from '../../hooks/useTable';
// import Input from '../../hooks/controls/Input';

// import { useFetchHook } from '../../helpers/useFetch';
// import kfshAPI from '../../kfshAPI';
// import { useParams } from 'react-router';

// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     margin: theme.spacing(5),
//     padding: theme.spacing(5)
//   }
// }));

// const initialValues = {
//   procedure_id: '',
//   test_cpt: '',
//   quantity: 0
// };

// const headCells = [
//   {
//     id: 'log_num',
//     label: 'NPL Log ID'
//   },
//   {
//     label: 'P-NPL Log ID'
//   },
//   {
//     id: 'name',
//     label: 'Procedure'
//   },
//   {
//     id: 'visit_id',
//     label: 'Visit ID'
//   }
// ];

// export default function Hospital({visits}) {
//   const { mrn } = useParams();
//   const classes = useStyles();
//   // const dispatch = useDispatch();
//   const [loading] = useFetchHook(fetchVisits(2348))
//   // const [load] = useFetchHook(fetchAllVisits())
//   const {visit} = useSelector(state => state.patient)
//   // const {visits} = useSelector(state => state.patient)

//   {!loading && console.log("VISIT IN HOSP: ", visit)}
//   {!loading && console.log("VISITS IN HOSP: ", visits)}
//   // const { data } = useSelector((state) => state.hospital);
//   // const [ loading ] = useFetchHook(fetchVisits(2348));
//   // console.log("DATA: ", data)
//   // const [ loading, setLoading ] = useState(true);
//   // const [ locations, setLocations ] = useState();
//   // const [ physicians, setPhysicians ] = useState();
//   // const [ tests, setTests ] = useState();
//   // const [ procedures, setProcedures ] = useState();
//   // const [ departments, setDepartments ] = useState();
//   // const [ state, setState ] = useState();

//   // const visits = useSelector((state) => state.visit);

//   // {
//   //   !loading && console.log(visits);
//   // }
//   // async function getInfo () {
//   //   const res = await dispatch(getVisitInfo(2348))
//   //   console.log(res)
//   // }

//   // useEffect(() => {
//   //   getInfo()
//   // }, [])

//   // const getInfo = async () => {
//   //     setLoading(true);

//   //   //   try {
//   //       const res = await kfshAPI.getAllVisits()
//   //       .then(res => console.log(res))

//     // console.log("result from dispatch hospital", result)
//     // const result = await Promise.all([
//     //   kfshAPI.getLocations(),
//     //   kfshAPI.getPhysicians(),
//     //   kfshAPI.getTests(),
//     //   kfshAPI.getProcedures(),
//     //   kfshAPI.getDepartments()
//     // ])
//     //   .then((res) => Array.from(res))
//     //   .then(res => setState(res))
//       // .then((res) => res.map((items) => setState(items)));
//     // setLocations(result[0].locations);
//     // setPhysicians(result[1].physicians);
//     // setPhysicians(result[2].tests);
//     // setPhysicians(result[3].procedures);
//     // setPhysicians(result[4].departments);
//     //   } catch (error) {
//     //     console.log(error);
//   //   //   }
//   //     setLoading(false);

//   // };

//   // useEffect(() => {
//   //   getInfo();
//   // }, []);

//   // console.log(state)
//   // state.map(i => i.map(j => console.log(j)))

//   // const [ filterFunc, setFilterFunc ] = useState({
//   //   func: (items) => {
//   //     return items;
//   //   }
//   // });

//   // const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
//   //   // [locations, physicians, tests, procedures, departments],
//   //   // headCells,
//   //   filterFunc
//   // );

//   // const handleSearch = (e) => {
//   //   // e.preventDefault();
//   //   const target = e.target;
//   //   setFilterFunc({
//   //     func: (items) => {
//   //       if (target.value === '') return items;
//   //       else
//   //         return items.filter(
//   //           (x) => JSON.stringify(x.mrn).includes(target.value)
//   //           // x.firstname.toLowerCase().includes(target.value.toLowerCase())
//   //         );
//   //     }
//   //   });
//   // };

//   // {
//   //   loading && <h1>LOADING data...</h1>;
//   // }

//   return (
//     <div>
//       <PageHeader
//         title='Hospital Information Page'
//         subtitle='Neurophysiology Department'
//         icon={<LocalHospitalIcon fontSize='large' />}
//       />{' '}
//       {' '}
//       <Paper className={classes.pageContent}>
//         {/* {' '}
//         {/* <ProcedureForm /> */}
//          {/* {!loading && (
//                     <React.Fragment>
//                       <TableContainer>
//                         <TableHeader />

//                         <TableBody>
//                           {morethings.map((item) => (
//                             <TableRow >
//                               <TableCell>{item.locations}</TableCell>

//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </TableContainer>

//                       <TablePagination />

//                     </React.Fragment>
//                   )}  */}
//       </Paper>
//     </div>
//   );
// }
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchVisitTest, fetchVisits } from '../../actions/actions';
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});




// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


export default function CollapsibleTable() {
  const {npl} = useParams();
  const [loading] = useFetchHook(fetchVisitTest("21-241"));
  const [load] = useFetchHook(fetchVisits(123456));
  const {visitTest} = useSelector(state => state.visitTest)
  const {visit} = useSelector(state => state.patient)


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
];

  {!loading && 
console.log("VISIT TEST: ", visitTest, visit)
}
  function Row(props) {
    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      !loading && (

      <React.Fragment>
          {!load && visit.map(item => (
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

            <>
          <TableCell component="th" scope="row">
            {item.log_num}
          </TableCell>
          <TableCell align="right">{item.procedure_name}</TableCell>
          <TableCell align="right">{item.visit_date}</TableCell>
          <TableCell align="right">{item.location_name}</TableCell>
          <TableCell align="right">{item.nationality}</TableCell>
          </>
        </TableRow>
          ))}

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Visit Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  
                  <TableHead>
                    <TableRow>
                      <TableCell>CPT</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Location</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                  {!loading && visitTest.map((historyRow) => (
                      <TableRow key={historyRow.cpt}>
                        <TableCell component="th" scope="row">
                          {historyRow.cpt}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.description}
                        </TableCell>
                        <TableCell align="right">{historyRow.quantity}</TableCell>
                        <TableCell align="right">{historyRow.location_name}</TableCell>
                        <TableCell align="right">{historyRow.visit_date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      )
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>NPL</TableCell>
            <TableCell align="right">Procedure</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
