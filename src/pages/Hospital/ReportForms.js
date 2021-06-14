import React, { useState, useEffect } from 'react';
import kfshAPI from '../../kfshAPI';

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Button from '../../hooks/controls/Button';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import Report from '../../components/Report';
import Popup from '../../components/Popup';
import { addAlert, loadHospitalData } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Home from '../../components/Home'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  },
  title: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: '#253053',
    fontWeight: 'bold'
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
}));

const ageItems = [
  { id: 'adult', title: 'Adult' },
  { id: 'pediatric', title: 'Pediatric' }
];

const initialValues = {
  start_date: new Date(),
  end_date: new Date(),
  user_id: '',
  physician_id: '',
  age_group: ''
};

export default function ReportForms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const state = useSelector((state) => state.hospital);
  const [ byAge, setByAge ] = useState([]);
  const [ byDate, setByDate ] = useState([]);
  const [ byPhysician, setByPhysician ] = useState([]);
  const [ byDept, setByDept ] = useState([]);
  const [ openPopup, setOpenPopup ] = useState(false);
  const user = useSelector(state => state.users)

  const [ openPopupType, setOpenPopupType ] = useState(null);

  // const validation = (fieldValues = formData) => {
  //   const temp = { ...errors };
  //   if ('start_date' in fieldValues)
  //     temp.start_date = formData.start_date ? '' : 'Please enter Start Date';
  //   if ('end_date' in fieldValues)
  //     temp.end_date = formData.end_date ? '' : 'Please enter End Date';
  //   if ('age_group' in fieldValues)
  //     temp.age_group = formData.age_group ? '' : 'Please select Age Group';
  //   if ('physician_id' in fieldValues)
  //     temp.physician_id = formData.physician_id ? '' : 'Please select a Physician';

  //   setErrors({ ...temp });
  //   if (fieldValues === formData) return Object.values(temp).every((i) => i === '');
  // };

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true
    // validation
  );

  const handleByDate = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      const report = await kfshAPI.getNpl(formData);
      setByDate(report);
    } catch (err) {
      await dispatch(addAlert(err, 'error'));
    }
    // }
    handleReset();
    setOpenPopup(true);
    setOpenPopupType('date');
  };

  const handleByAge = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      const report = await kfshAPI.getByDate(formData);
      setByAge(report);
    } catch (err) {
      await setErrors(err);
    }
    // }
    handleReset();
    setOpenPopup(true);
    setOpenPopupType('age');
  };

  const handleByDept = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      const report = await kfshAPI.getByDepartment(formData);
      setByDept(report);
    } catch (err) {
      await setErrors(err);
    }
    // }
    handleReset();
    setOpenPopup(true);
    setOpenPopupType('dept');
  };

  const handleByPhysician = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      const report = await kfshAPI.getByPhysician(formData);
      setByPhysician(report);
    } catch (err) {
      await setErrors(err);
    }
    // }
    handleReset();
    setOpenPopup(true);

    setOpenPopupType('physician');
  };

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          await dispatch(loadHospitalData());
        } catch (error) {
          await dispatch(addAlert(error, 'error'));
        }
      };
      fetchData();
    },
    [ dispatch ]
  );

  const handleClose = () => (setOpenPopupType(null), setOpenPopup(false));

  { if (!user.token) return <Home />}

  {if (user.token && !user.is_admin) return (
    <div style={{margin: '2em', textAlign: "center"}}>
          <Typography variant='h4' component='div'>
            Unauthorized. Admin privelages required!
          </Typography>
          <Button label="Home" onClick={() => history.push('/')} size="large" color="secondary" variant="contained" />
        </div>
  )}


  return (
    <div>
      <Typography className={classes.title} variant='h4' align='center' component='div'>
        Neurophysiology Lab Reports
      </Typography>
      <Paper className={classes.pageContent}>
        <Typography variant='h5' align='center' gutterBottom>
          Generate NPL Procedure Records
        </Typography>
        {/* <Typography variant='h5' align='center' gutterBottom>
          Generate NPL Records by Date & Age Group
        </Typography> */}

        <Form onSubmit={handleByAge}>
          <Grid container spacing={3}>
            <Grid item sm={3} xs={12}>
              <DatePicker
                name='start_date'
                label='From Date (dd-mm-yyyy)'
                value={formData.start_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={3} xs={12}>
              <DatePicker
                name='end_date'
                label='To Date (dd-mm-yyyy)'
                value={formData.end_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={3} xs={12}>
              <Select
                name='physician_id'
                label='Physician'
                options={state.physicians}
                value={formData.physician_id}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={3} xs={12}>
              <Select
                name='age_group'
                label='Age Group'
                options={ageItems}
                value={formData.age_group}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                size='large'
                label='Age Group'
                variant='contained'
                onClick={handleByAge}
                color='primary'
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                size='large'
                label='NPL Department'
                variant='contained'
                onClick={handleByDate}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                size='large'
                label='Physician'
                variant='contained'
                onClick={handleByPhysician}
                color='default'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                size='large'
                label='Physician Dept'
                variant='contained'
                onClick={handleByDept}
                color='default'
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>

      {/* <Paper className={classes.pageContent}>
        <Typography variant='h5' align='center' gutterBottom>
          Generate NPL Records by Date
        </Typography>

        <Form onSubmit={handleByDate}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <DatePicker
                name='start_date'
                label='From Date'
                value={formData.start_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <DatePicker
                name='end_date'
                label='To Date'
                value={formData.end_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <Button
                fullWidth
                size='large'
                label='Show Report'
                variant='outlined'
                onClick={handleByDate}
                color='primary'
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>

      <Paper className={classes.pageContent}>
        <Typography variant='h5' gutterBottom align='center'>
          Generate Records by Physicians & Departments
        </Typography>

        <Form onSubmit={handleByDept}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <DatePicker
                name='start_date'
                label='From Date'
                value={formData.start_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <DatePicker
                name='end_date'
                label='To Date'
                value={formData.end_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <Button
                fullWidth
                size='large'
                label='Show Report'
                variant='outlined'
                onClick={handleByDept}
                color='primary'
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <Paper className={classes.pageContent}>
        <Typography variant='h5' gutterBottom align='center'>
          Generate Records by a Single Physician
        </Typography>

        <Form onSubmit={handleByPhysician}>
          <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
              <DatePicker
                name='start_date'
                label='From Date'
                value={formData.start_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <DatePicker
                name='end_date'
                label='To Date'
                value={formData.end_date}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <Select
                name='physician_id'
                label='Physician'
                options={state.physicians}
                value={formData.physician_id}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <Button
                fullWidth
                size='large'
                label='Show Report'
                variant='outlined'
                onClick={handleByPhysician}
                color='primary'
              />
            </Grid>
          </Grid>
        </Form>
      </Paper> */}

      {openPopupType === 'dept' && (
        <Popup openPopup={openPopup} handleClose={handleClose}>
          <Report data={byDept} title='Records by Physicians & Departments' />
        </Popup>
      )}

      {openPopupType === 'physician' && (
        <Popup openPopup={openPopup} handleClose={handleClose}>
          <Report data={byPhysician} title='Records by a Single Physician' />
        </Popup>
      )}

      {openPopupType === 'age' && (
        <Popup openPopup={openPopup} handleClose={handleClose}>
          <Report
            data={byAge}
            title='NPL Department Records by Age Group'
            other={byAge[0] && `(${byAge[0].age_group})`}
          />
        </Popup>
      )}

      {openPopupType === 'date' && (
        <Popup openPopup={openPopup} handleClose={handleClose}>
          <Report data={byDate} title='NPL Department Records by Date' />
        </Popup>
      )}
    </div>
  );
}
