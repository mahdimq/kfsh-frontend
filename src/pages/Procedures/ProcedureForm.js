import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles, Paper } from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';
import RadioButton from '../../hooks/controls/RadioButton';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import { addSingleProcedure, addAlert } from '../../actions/actions';
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}));

const initialValues = {
  name: '',
  visit_id: ''
};

export default function ProcedureForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true
    // validation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      await dispatch(addSingleProcedure(formData));
      // history.goBack();
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
    handleReset();
    // }
    window.alert('Clicked submit');
  };

  return (
    <Paper className={classes.pageContent}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <Input
            fullWidth
              name='name'
              label='Enter Procedure'
              value={formData.name}
              onChange={handleChange}
              id='name'
              required
              error={errors.name}
            />
           <Grid item xs={12} sm={4} md={3}>
          <Button
            fullWidth
            size='large'
            label='Submit'
            variant='outlined'
            type='submit'
            color='primary'
          />
        </Grid>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
}
