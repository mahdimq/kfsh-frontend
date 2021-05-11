import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles, Paper } from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';
import RadioButton from '../../hooks/controls/RadioButton';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';

const useStyles = makeStyles(theme =>({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(5)
    },
}))

const initialValues = {
  procedure_id: "",
  test_cpt: "",
  quantity: 0
};

export default function ProcedureForm() {
  const classes = useStyles();
  const history = useHistory();


  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true,
    // validation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validation()) {
      // try {
      //   await dispatch(addPatient(formData));
      //   // history.goBack();
      // } catch (err) {
      //   err.forEach((error) => {
      //     dispatch(addAlert(error, 'error'));
      //   });
      // }
      // handleReset();
    // }
    window.alert("Clicked submit")
  };

  const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' }
  ];

  const ageGroupItems = [
    { id: 'adult', title: 'Adult' },
    { id: 'pediatric', title: 'Pediatric' }
  ];

  const nationalityItems = [
    { id: 'saudi', title: 'Saudi' },
    { id: 'non-saudi', title: 'Non-Saudi' }
  ];

  return (
    <Paper className={classes.pageContent}>

    
    
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6} sm={8} xs={12}>
          <Input
            name='mrn'
            label='Patient MRN'
            value={formData.mrn}
            onChange={handleChange}
            id='mrn'
            required
            type='number'
            error={errors.mrn}
          />
        </Grid>

        <Grid item md={4}>
        <RadioButton
            name='gender'
            label='Gender'
            value={formData.gender}
            onChange={handleChange}
            items={genderItems}
            error={errors.gender}
            default="male"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            name='firstname'
            label='First Name'
            value={formData.firstname}
            onChange={handleChange}
            id='firstname'
            required
            error={errors.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            name='middlename'
            label='Middle Name'
            value={formData.middlename}
            onChange={handleChange}
            id='middlename'
            required
            error={errors.middlename}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            name='lastname'
            label='Last Name'
            value={formData.lastname}
            onChange={handleChange}
            id='lastname'
            required
            error={errors.lastname}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
        <DatePicker
          name='dob'
          label='Date of Birth'
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
        />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Select
            name='nationality'
            label='Nationality'
            options={nationalityItems}
            value={formData.nationality}
            onChange={handleChange}
            error={errors.nationality}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
        <RadioButton
          name='age_group'
          label='Age Group'
          value={formData.age_group}
          onChange={handleChange}
          items={ageGroupItems}
          error={errors.age_group}
          default="adult"
        />
        </Grid>
      </Grid>

        <Grid container spacing={2}>
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
        </Grid>

    </Form>
    </Paper>
  );
}
