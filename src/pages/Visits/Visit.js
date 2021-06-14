import React, { useState } from 'react';
import { Search } from '@material-ui/icons';
import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  Grid,
  ListItem,
  Card,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider
} from '@material-ui/core';
import {
  LocalHospital,
  Add,
  Person,
  Event,
  LocationOn,
  AssignmentInd,
  MenuBook,
  ArrowBackIosOutlined
} from '@material-ui/icons';

import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';

import { formatDate } from '../../helpers/dateFormatter';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchVisits, addSingleVisit, addAlert } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../hooks/controls/Button';
import Popup from '../../components/Popup';
import Spinner from '../../components/Spinner';
import TestForm from './TestForm';
import NameBlock from '../../components/NameBlock';
import Home from '../../components/Home';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textTransform: 'capitalize'
  },
  notFound: {
    margin: theme.spacing(3),
    padding: theme.spacing(5),
    textTransform: 'capitalize'
  },
  nameBlock: {
    // padding: theme.spacing(1),
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 600,
    fontSize: '40px',
    textTransform: 'capitalize'
  },
  header: {
    // backgroundColor: '#faf7f0',
    backgroundColor: '#253053',
    color: '#faf7f0',
    '& .MuiListItemText-secondary': {
      color: '#faf7f0',
      opacity: 0.6
    },
    padding: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 370
  },
  titleText: {
    paddingLeft: theme.spacing(2)
  },
  newButton: {
    marginLeft: theme.spacing(2)
  },
  divider: {
    backgroundColor: '#faf7f0',
    opacity: 0.6
  }
}));

const headCells = [
  { id: 'cpt', label: 'CPT Code' },
  { id: 'description', label: 'Test Description' },
  { id: 'quantity', label: 'Quantity' }
];

export default function Visit() {
  const { log } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [ loading ] = useFetchHook(fetchVisits(log));
  const {visits} = useSelector((state) => state.patients);
  const user = useSelector((state) => state.users);

  const [ openPopup, setOpenPopup ] = useState(false);
  const dispatch = useDispatch();

  const [ filterFunc, setFilterFunc ] = useState({
    func: (items) => {
      return items;
    }
  });

  const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
    headCells,
    filterFunc
  );

  // const handleSearch = (e) => {
  //   const target = e.target;
  //   setFilterFunc({
  //     func: (items) => {
  //       if (target.value === '') return items;
  //       else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
  //     }
  //   });
  // };
  
  const addOrEdit = (data, handleReset) => {
    async function get() {
      try {
        await dispatch(addSingleVisit(data));
        // history.goBack();
      } catch (err) {
        dispatch(addAlert(err, 'error'));
      }
    }
    get();
    handleReset();
    setOpenPopup(false);
  };
  
  const handleClose = () => setOpenPopup(false);

  {
    if (user.token && loading) return <Spinner />;
  }

  { if (!user.token) return <Home /> }

  if (!visits.visitDetails[0]) {
    return (
      <div>
        <Grid container className={classes.header} alignItems='center'>
          <Grid item sm={6}>
            <List className={classes.nameBlock} dense>
              <Grid container align='center'>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${visits.p_firstname} ${visits.p_lastname}`}
                      secondary='Physician'
                    />
                  </ListItem>
                </Grid>

                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <Event />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={formatDate(visits.visit_date)}
                      secondary='Visit Date'
                    />
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' className={classes.divider} />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visits.location_name} secondary='Location' />
                  </ListItem>
                </Grid>

                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <AssignmentInd />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visits.procedure_name} secondary='Procedure' />
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' className={classes.divider} />

              <Grid container>
                <Grid item sm={12}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <MenuBook />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${visits.log_num} ${visits.ped_log_num
                        ? '/ ' + visits.ped_log_num
                        : ''}`}
                      secondary='Log Number'
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          </Grid>

          <Grid item sm={6}>
            <NameBlock patient={visits} />
          </Grid>
        </Grid>

        <Paper className={classes.notFound}>
          <Toolbar>
            <Grid item>

            <Typography variant='h4' component='div'>
              Visit Details Not Found
            </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>

            <Button
              label="Go Back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlined/>}
              className={classes.newButton}
              onClick={() => history.goBack()}
              color="secondary"
            />

            <Button
              label='Add Tests'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
              </Grid>
          </Toolbar>
        </Paper>

        <Popup openPopup={openPopup} handleClose={handleClose} title='Add Tests'>
          <TestForm addOrEdit={addOrEdit} setOpenPopup={setOpenPopup} log={log}/>
        </Popup>
      </div>
    );
  }

  return (
    !loading && (
      <div>
        <Grid container className={classes.header} alignItems='center'>
          <Grid item sm={6}>
            <List className={classes.nameBlock} dense>
              <Grid container align='center'>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${visits.p_firstname} ${visits.p_lastname}`}
                      secondary='Physician'
                    />
                  </ListItem>
                </Grid>

                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <Event />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={formatDate(visits.visit_date)}
                      secondary='Visit Date'
                    />
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' className={classes.divider} />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visits.location_name} secondary='Location' />
                  </ListItem>
                </Grid>

                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <AssignmentInd />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visits.procedure_name} secondary='Procedure' />
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' className={classes.divider} />

              <Grid container>
                <Grid item sm={12}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded'>
                        <MenuBook />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${visits.log_num} ${visits.ped_log_num
                        ? '/ ' + visits.ped_log_num
                        : ''}`}
                      secondary='Log Number'
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          </Grid>

          <Grid item sm={6}>
            <NameBlock patient={visits} />
          </Grid>
        </Grid>

        <Paper className={classes.pageContent}>
          <Toolbar>
            <Grid item>


            <Typography variant='h5' component='div'>
              Visit Details
              </Typography>
            </Grid>

            <Grid item xs />
            <Grid item>

              <Button
              label="Go Back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlined/>}
              onClick={() => history.goBack()}
              color="secondary"
              />

              <Button
                label='Add Test'
                variant='outlined'
                startIcon={<Add />}
                className={classes.newButton}
                onClick={() => setOpenPopup(true)}
                />
                </Grid>
          </Toolbar>

          <TableContainer>
            <TableHeader />
            <TableBody>
              {recordsAfterSorting(visits.visitDetails).map((item) => (
                <TableRow className={classes.link} key={item.cpt}>
                  <TableCell>{item.cpt}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
          <TablePagination count={visits.visitDetails.length} />
        </Paper>

        <Popup openPopup={openPopup} handleClose={handleClose} title='Add Tests'>
          <TestForm addOrEdit={addOrEdit} setOpenPopup={setOpenPopup} log={log}/>
        </Popup>
      </div>
    )
  );
}
