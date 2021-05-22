import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import {
  LocalHospital,
  Event,
  Wc,
  Public,
  HourglassEmpty,
  Person,
  MenuBook,
  Add
} from '@material-ui/icons';
import { Search } from '@material-ui/icons';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText, Card, Avatar
} from '@material-ui/core';
import useTable from '../../hooks/useTable';
import Input from '../../hooks/controls/Input';

import { formatDate, age } from '../../helpers/dateFormatter';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchVisits, fetchAllVisits, addSingleVisit, addAlert } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import VisitForm from './VisitForm';
import { Link } from 'react-router-dom';
import Button from '../../hooks/controls/Button';
import Popup from '../../components/Popup';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fffbf2 !important'
    }
  },
  nameBlock: {
    textTransform: 'capitalize',
    // padding: theme.spacing(1),
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 600,
    fontSize: '40px'
  },
  header: {
    backgroundColor: '#faf7f0'
  },
  title: {
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 370
  },
  pageIcon: {
    display: 'inline-block',
    borderRadius: '50%',
    padding: theme.spacing(1),
    color: "#3c44b1"
  }, 
  titleText: {
    paddingLeft: theme.spacing(2)
  },
  newButton: {
    position: 'absolute',
    right: '10px'
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
  const [ openPopup, setOpenPopup ] = useState(false);
  const dispatch = useDispatch()

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
    const target = e.target;
    setFilterFunc({
      func: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
      }
    });
  };


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

  if (!loading && visit.length === 0) {
    return (
      <div>
        <h1>NO VISITS FOUND</h1>
        <Button
              label='Add New Visit'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
            />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New Visit'>
          <VisitForm addOrEdit={addOrEdit} />
        </Popup>
      </div>
    );
  }

  return (
    <div>
      <Grid container className={classes.header} alignItems='center'>
        {!load && (
          <Grid item sm={5}>
            <ListItem className={classes.title}>
              {/* <ListItemAvatar> */}
              <Card className={classes.pageIcon}>
                <LocalHospital fontSize="large" color='primary' />
        </Card>
              {/* </ListItemAvatar> */}
              <Typography className={classes.titleText} variant='h5' component='div'>
                View Patient Visits
              </Typography>
            </ListItem>

            <Divider variant='inset' />

            <ListItem className={classes.title}>
            <Card className={classes.pageIcon}>
                <MenuBook fontSize="large" color='primary' />
        </Card>
              {/* <ListItemAvatar>
                <MenuBook fontSize='large' color='primary' />
              </ListItemAvatar> */}
              <Typography className={classes.titleText} variant='paragraph1' component='div'>
                {visits[visits.length - 1].ped_log_num ? (
                  `NPL#: ${visits[visits.length - 1].log_num} / P-NPL#: ${visits[
                    visits.length - 1
                  ].ped_log_num}`
                ) : (
                  `NPL#: ${visits[visits.length - 1].log_num}`
                )}
              </Typography>
            </ListItem>
          </Grid>
        )}
        {/* 
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
          icon={<LocalHospital fontSize='large' />}
        /> */}


        <Grid item sm={7}>
          {!loading && (
            <List className={classes.nameBlock} dense>
              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${visit[0].p_firstname} ${visit[0]
                        .p_middlename} ${visit[0].p_lastname}`}
                        secondary="Full Name"
                    />
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                      <LocalHospital />

                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visit[0].patient_mrn} secondary="MRN" />
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                      <Event />

                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={formatDate(visit[0].dob)}
                      secondary={`Age: ${age(visit[0].dob)} yrs`}
                    />
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Wc />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visit[0].gender} secondary="Gender"/>
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Public />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visit[0].nationality} secondary="Nationality" />
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <HourglassEmpty />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={visit[0].age_group} secondary="Age Category" />
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          )}
        </Grid>
      </Grid>

      
      {!loading && (
          <Paper className={classes.pageContent}>
            <Toolbar>

            <Button
              label='Add New Visit'
              variant='outlined'
              startIcon={<Add />}
              className={classes.newButton}
              onClick={() => setOpenPopup(true)}
              />
              </Toolbar>
            {/* <VisitForm /> */}
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
      )}
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title='Add New Visit'>
          <VisitForm addOrEdit={addOrEdit} />
        </Popup>
    </div>
  );
}
