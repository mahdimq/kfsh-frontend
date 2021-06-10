import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, addSingleVisit, fetchUsers, loadHospitalData, fetchAllVisits } from '../../actions/actions';

import { Grid, makeStyles, Paper, Typography, Toolbar} from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import ActionButton from '../../hooks/controls/ActionButton'
import {useParams} from 'react-router'
import { Close } from '@material-ui/icons';

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


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textTransform: 'capitalize'
  }
}));

// export default function VisitForm({data, users, addOrEdit}) {
export default function VisitForm() {
  const classes = useStyles();
  const {mrn} = useParams();
  const {users} = useSelector((state) => state.users);
  const {procedures, physicians, departments, locations} = useSelector(state => state.hospital)

  // const {visits} = useSelector(state => state.patients)
  const history = useHistory();
  const dispatch = useDispatch();

  const validation = (fieldValues = formData) => {
    const temp = { ...errors };
    if ('log_num' in fieldValues)
      temp.log_num = (formData.log_num ? '' : 'NPL Number is required') || (!formData.log_num.includes("-") ? 'Please input NPL Number correctly' : '');
      
    if ('ped_log_num' in fieldValues && fieldValues.ped_log_num)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(loadHospitalData())
        await dispatch(fetchUsers())
        // await dispatch(fetchAllVisits())
      } catch (error){
        await dispatch(addAlert(error, 'error'))
      }
    }
    fetchData()
  }, [dispatch])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      await dispatch(addSingleVisit(mrn, {...formData, patient_mrn: parseInt(mrn)}));     
      history.push(`visits/${formData.log_num}`)
    }
    handleReset();
  };

  const handleClose = () => history.goBack();

  return (
    <Paper className={classes.pageContent}>

      <Toolbar>
        <Grid container>
          <Grid item>
            <Typography variant='h4' component='div'>
              Add New Visit 
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <ActionButton color='secondary' onClick={() => handleClose()}>
              <Close />
            </ActionButton>
          </Grid>
        </Grid>
      </Toolbar>


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
              options={physicians}
              value={parseInt(formData.physician_id)}
              onChange={handleChange}
              error={errors.physician_id}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='user_id'
              label='Technologist'
              options={users}
              value={parseInt(formData.user_id)}
              onChange={handleChange}
              error={errors.user_id}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='procedure_id'
              label='Procedure'
              options={procedures}
              value={parseInt(formData.procedure_id)}
              onChange={handleChange}
              error={errors.procedure_id}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Select
              name='location_id'
              label='Location'
              options={locations}
              value={parseInt(formData.location_id)}
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

      </Form>
      
    </Paper>
  );
}
