import React, { useEffect, useState } from 'react';
import { makeStyles, IconButton, TableBody, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useParams } from 'react-router';
import { useFetchHook } from '../../hooks/useFetch';
import {
  fetchAllVisits,
  fetchVisitDetails,
  fetchVisitDetail,
  fetchVisits
} from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../helpers/dateFormatter';
import kfshAPI from '../../kfshAPI';
import useCollapsibleTable from '../../hooks/useCollapsibleTable';
import { getPatient } from '../../actions/actions';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(4),
    textTransform: 'capitalize'
  },
}));

const headCells = [
  { id: 'empty', label: '' },
  { id: 'log_num', label: 'NPL' },
  { id: 'ped_log_num', label: 'PNPL' },
  { id: 'procedure_name', label: 'Procedure' },
  { id: 'p_firstname', label: 'Physician' },
  { id: 'u_firstname', label: 'Technologist' },
  { id: 'location_id', label: 'Location' },
  { id: 'visit_date', label: 'Visit Date' }
];

const detailHeadCells = [
  { id: 'cpt', label: 'CPT' },
  { id: 'description', label: 'Description' },
  { id: 'quantity', label: 'Quantity' }
];

export default function VisitDetails() {
  const [ state, setState ] = useState([]);
  const classes = useStyles();

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ open, setOpen ] = useState(false);

  const { TableContainer, TableDetailsHeader, TableHeader } = useCollapsibleTable(
    state,
    headCells,
    detailHeadCells
  );

  const fetchData = async (mrn, log) => {
    setLoading(true);
    try {
      // const result = await Promise.all([
      //   kfshAPI.getPatient(mrn),
      //   kfshAPI.getVisits(log)
      // ]);
      const result = await kfshAPI.getVisits(mrn)
      // console.log('RESULT IN COMP: ', result);
      setState(result);
      // setState((prev) => ({
      // 	...prev,
      // 	rows:
      // 			: [...result.results],
      // 	heroImage: prev.heroImage || result.results[0],
      // 	currentPage: result.page,
      // 	totalPages: result.total_pages
      // }));
    } catch (error) {
      setError(true);
      console.log('ERROR MESSAGE: ', error);
    }
    setLoading(false);
  };

  console.log('STATE: ', state);

  useEffect(() => {
    fetchData(123456);
  }, []);

  console.log('state: ', state);

  return (
    !loading && (
      <Paper className={classes.pageContent}>
      
      <TableContainer>
        <TableHeader />

        {state.map((item) => (
          <React.Fragment>
            <TableRow key={item.log_num}>
              <TableCell>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>

              <TableCell component='th' scope='row'>
                {item.log_num}
              </TableCell>
              <TableCell>{item.ped_log_num}</TableCell>
              <TableCell>{item.procedure_name}</TableCell>
              <TableCell>
                {item.firstname} {item.lastname}
              </TableCell>
              <TableCell>
                {item.user_firstname} {item.user_lastname}
              </TableCell>
              <TableCell>{item.location_name}</TableCell>
              <TableCell>{item.p_firstname}</TableCell>
              <TableCell>{item.p_lastname}</TableCell>
              <TableCell>{formatDate(item.visit_date)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box >
                    <Typography variant='h6' gutterBottom component='div'>
                      Details
                    </Typography>

                    <TableContainer size='small'>
                      <TableDetailsHeader />

                      <TableBody>
                        
                          <TableRow key={item.cpt}>
                            <TableCell component='th' scope='row'>
                              {item.cpt}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                              {item.description}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                      </TableBody>
                    </TableContainer>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}

        <TableBody />
      </TableContainer>
      </Paper>
    )
  );
}
