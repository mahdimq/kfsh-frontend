import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAlert, addPatient, addSingleVisit, fetchVisits } from '../../actions/actions';

import { Grid, makeStyles, Paper } from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';
import RadioButton from '../../hooks/controls/RadioButton';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import {useParams} from 'react-router'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}));

const initialValues = {
  log_num: '',
  ped_log_num: '',
  patient_mrn: '',
  physician_id: '',
  user_id: '',
  procedure_id: '',
  location_id: '',
  visit_date: new Date()
};

export default function VisitForm() {
  const {mrn} = useParams()
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const validation = (fieldValues = formData) => {
    const temp = { ...errors };
    if ('log_num' in fieldValues)
      temp.log_num = (formData.log_num ? '' : 'NPL Number is required') || (formData.log_num.includes("P") ||  formData.log_num.includes("p") ? 'Please remove the "P" from the Log Num' : '');
    if ('ped_log_num' in fieldValues)
      temp.ped_log_num =  formData.ped_log_num.includes("P") ||  formData.ped_log_num.includes("p") ? '' : 'Please include the "P" before the Log Num';
    if ('procedure_id' in fieldValues)
      temp.procedure_id = formData.procedure_id ? '' : 'Procedure is required';
    if ('location_id' in fieldValues)
      temp.location_id = formData.location_id ? '' : 'Location is required';
    if ('visit_date' in fieldValues)
      temp.visit_date = formData.visit_date ? '' : 'Please enter Date of Procedure';

    setErrors({ ...temp });
    if (fieldValues === formData) return Object.values(temp).every((i) => i === '');
  };

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true,
    validation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
    try {
      await dispatch(addSingleVisit(mrn, {...formData, patient_mrn: parseInt(mrn)})); 
      // await dispatch(addSingleVisit(mrn, {...formData, patient_mrn: parseInt(mrn)})); 
      // history.goBack();
    } catch (err) {
      await dispatch(addAlert(err, 'error'));
      };
    }
    handleReset();

  };


  const procedureItems = [
    { id: 1, title: 'EEG' },
    { id: 2, title: 'NCS' },
    { id: 3, title: 'EMG' },
    { id: 4, title: 'SSEP' },
    { id: 5, title: 'IOM' },
  ];
  const locationItems = [
    { id: 1, title: 'NPL' },
    { id: 2, title: 'AICU' },
    { id: 3, title: 'B1' },
    { id: 4, title: 'OR' },
    { id: 5, title: 'ER' }
  ];
  const userItems = [
    { id: 1111, title: 'John Conner' },
    { id: 5566, title: 'Clark Kent' },
    { id: 4849, title: 'Bruce Wayne' },
    { id: 3914, title: 'Denzil Tauro' },
    { id: 9999, title: 'Maryam AlAsil' }
  ];
  const physicianItems = [
    { id: 1, title: 'Ali Mir' },
    { id: 2, title: 'Raidah AlBaradie' },
    { id: 3, title: 'Ziyad AlThani' },
    { id: 4, title: 'Eman Nassim' },
    { id: 5, title: 'Fouad AlGhamdi' },
    { id: 6, title: 'Majed AlOtaibi' },
    { id: 7, title: 'Mahmood Taha' }
  ];

  return (
    <Paper className={classes.pageContent}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={6} xs={12}>
            <Input
              name='log_num'
              label='NPL Number'
              value={formData.log_num}
              onChange={handleChange}
              id='log_num'
              required
              error={errors.log_num}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <Input
              name='ped_log_num'
              label='P-NPL Number'
              value={formData.ped_log_num}
              onChange={handleChange}
              id='ped_log_num'
              default={null}
              error={errors.ped_log_num || null}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='physician_id'
              label='Physician'
              options={physicianItems}
              value={parseInt(formData.physician_id)}
              onChange={handleChange}
              error={errors.physician_id}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='user_id'
              label='Technologist'
              options={userItems}
              value={parseInt(formData.user_id)}
              onChange={handleChange}
              error={errors.user_id}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='procedure_id'
              label='Procedure'
              options={procedureItems}
              value={formData.procedure_id}
              onChange={handleChange}
              error={errors.procedure_id}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='location_id'
              label='Location'
              options={locationItems}
              value={formData.location_id}
              onChange={handleChange}
              error={errors.location_id}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              name='visit_date'
              label='Date of Procedure'
              value={formData.visit_date}
              onChange={handleChange}
              error={errors.visit_date}
            />
          </Grid>


          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='large'
              label='Submit'
              variant='outlined'
              type='submit'
              color='primary'
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='large'
              label='Reset'
              variant='outlined'
              onClick={handleReset}
              color='default'
            />
          </Grid>


        </Grid>

        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='large'
              label='Submit'
              variant='outlined'
              type='submit'
              color='primary'
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='large'
              label='Reset'
              variant='outlined'
              onClick={handleReset}
              color='secondary'
            />
          </Grid>
        </Grid> */}
      </Form>
    </Paper>
  );
}
