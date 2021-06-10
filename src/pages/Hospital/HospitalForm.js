import React, { useState, useEffect } from 'react';
import kfshAPI from '../../kfshAPI';

import {
  Card,
  Grid,
  makeStyles,
  Paper,
  List,
  ListItemText,
  ListItem,
  Divider,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Button from '../../hooks/controls/Button';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import Input from '../../hooks/controls/Input';
import Report from '../../components/Report';
import Popup from '../../components/Popup';
import Alerts from '../../components/Alerts';
import { addAlert, loadHospitalData } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  location_name: '',
  department_name: '',
  department_id: '',
  firstname: '',
  lastname: '',
  procedure_name: '',
  cpt: '',
  description: ''
};

export default function HospitalForm({setOpenPopup}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.hospital);

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
    true
    // validation
  );

  const handleLocation = async (e) => {
    e.preventDefault();
    try {
      await kfshAPI.addLocation(formData);
      dispatch(addAlert(`Location ${formData.location_name} added successfully, Please refresh to reflect changes`));
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    history.push('/hospitaldata');
    setOpenPopup(false)

  };

  const handleProcedure = async (e) => {
    e.preventDefault();
    try {
      await kfshAPI.addProcedure(formData);
      dispatch(addAlert(`Procedure ${formData.procedure_name} added successfully, Please refresh to reflect changes`));
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    setOpenPopup(false)
    history.push('/hospitaldata');
  };

  const handleDepartment = async (e) => {
    e.preventDefault();
    try {
      await kfshAPI.addDepartment(formData);
      dispatch(addAlert(`Deparment ${formData.department_name} added successfully, Please refresh to reflect changes`));
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    history.push('/hospitaldata');
    setOpenPopup(false)
  };

  const handleTest = async (e) => {
    e.preventDefault();
    try {
      await kfshAPI.addTestCode(formData);
      dispatch(
        addAlert(`Test ${formData.cpt} - ${formData.description} added successfully, Please refresh to reflect changes`)
      );
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    history.goBack()
    setOpenPopup(false)
  };

  const handlePhysician = async (e) => {
    e.preventDefault();
    try {
      await kfshAPI.addPhysician(formData);
      dispatch(
        addAlert(
          `Physician ${formData.firstname} ${formData.lastname} added successfully, Please refresh to reflect changes`
        )
      );
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    history.goBack();
    setOpenPopup(false)
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

  return (
    <div>
      <Typography className={classes.title} variant='h4' align='center' component='div'>
        Clinical Neurophysiology Lab
      </Typography>

      <Paper className={classes.pageContent}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} align='center'>
            <Typography variant='h5' gutterBottom>
              Add a new location
            </Typography>

            <Form onSubmit={handleLocation}>
              <Input
                name='location_name'
                label='Location'
                value={formData.location_name}
                onChange={handleChange}
                id='location_name'
                error={errors.location}
                required
              />

              <Button
                fullWidth
                size='large'
                label='Add Location'
                variant='contained'
                onClick={handleLocation}
                color='primary'
              />
            </Form>
          </Grid>

          <Grid item md={6} sm={12} align='center'>
            <Typography variant='h5' gutterBottom>
              Add a new department
            </Typography>

            <Form onSubmit={handleDepartment}>
              <Input
                name='department_name'
                label='Department'
                value={formData.department_name}
                onChange={handleChange}
                id='department_name'
                required
              />

              <Button
                fullWidth
                size='large'
                label='Add Department'
                variant='contained'
                onClick={handleDepartment}
                color='primary'
              />
            </Form>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.pageContent}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} align='center'>
            <Typography variant='h5' gutterBottom>
              Add a Test
            </Typography>

            <Form onSubmit={handleTest}>
              <Input
                name='cpt'
                label='CPT Code'
                value={formData.cpt}
                onChange={handleChange}
                id='cpt'
                required
              />

              <Input
                name='description'
                label='CPT Description'
                value={formData.description}
                onChange={handleChange}
                id='description'
                required
              />

              <Button
                fullWidth
                size='large'
                label='Add Test'
                variant='contained'
                onClick={handleTest}
                color='primary'
              />
            </Form>
          </Grid>

          <Grid item md={6} sm={12} align='center'>
            <Typography variant='h5' gutterBottom>
              Add a Procedure
            </Typography>

            <Form onSubmit={handleProcedure}>
              <Input
                name='procedure_name'
                label='Procedure'
                value={formData.procedure_name}
                onChange={handleChange}
                id='procedure_name'
                required
              />

              <Button
                fullWidth
                size='large'
                label='Add Procedure'
                variant='contained'
                onClick={handleProcedure}
                color='primary'
              />
            </Form>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.pageContent}>
        <Typography variant='h5' align='center' gutterBottom>
          Add a Physician
        </Typography>

        <Form onSubmit={handlePhysician}>
          <Grid container spacing={1}>
            <Grid item sm={4} xs={12}>
              <Input
                name='firstname'
                label='First Name'
                value={formData.firstname}
                onChange={handleChange}
                id='firstname'
                required
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <Input
                name='lastname'
                label='Last Name'
                value={formData.lastname}
                onChange={handleChange}
                id='lastname'
                required
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <Select
                name='department_id'
                label='Department'
                options={state.departments}
                value={parseInt(formData.department_id)}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Button
                fullWidth
                size='large'
                label='Add Physician'
                variant='contained'
                onClick={handlePhysician}
                color='primary'
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </div>
  );
}
