import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAlert, addPatient, addSingleVisit, fetchVisits } from '../../actions/actions';

import {
  Card,
  Grid,
  makeStyles,
  Paper,
  List,
  ListItemText,
  ListItem,
  Divider
} from '@material-ui/core/';
import { useForm, Form } from '../../hooks/useForm';
import Input from '../../hooks/controls/Input';
import Button from '../../hooks/controls/Button';
import RadioButton from '../../hooks/controls/RadioButton';
import DatePicker from '../../hooks/controls/DatePicker';
import Select from '../../hooks/controls/Select';
import { useParams } from 'react-router';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(5)
  },
  submit: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'flex-end'
  }
}));

const initialValues = {
  cpt: '',
  quantity: ''
};

export default function TestForm() {
  const { mrn } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ testData, setTestData ] = useState([]);

  // const validation = (fieldValues = formData) => {
  //   const temp = { ...errors };
  //   if ('log_num' in fieldValues)
  //     temp.log_num = formData.log_num ? '' : 'NPL Number is required';
  //   if ('procedure_id' in fieldValues)
  //     temp.procedure_id = formData.procedure_id ? '' : 'Procedure is required';
  //   if ('location_id' in fieldValues)
  //     temp.location_id = formData.location_id ? '' : 'Location is required';
  //   if ('visit_date' in fieldValues)
  //     temp.visit_date = formData.visit_date ? '' : 'Please enter Date of Procedure';

  //   setErrors({ ...temp });
  //   if (fieldValues === formData) return Object.values(temp).every((i) => i === '');
  // };

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true
    // validation
  );

  const handleAdd = () => {
    // if (validation()) {
    setTestData((prev) => [ ...prev, formData ]);
    // }
    handleReset();
  };

  const handleRemove = (cpt) => {
    const newItems = testData.filter((item, i) => i !== cpt);
    setTestData(newItems);
  };

  console.log("VISIT DETAILS: ", testData)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validation()) {
    try {
      await dispatch(addSingleVisit(mrn, {testData})); 
      // history.goBack();
    } catch (err) {
      await dispatch(addAlert(err, 'error'));
      };
    // }
    handleReset();

  };

  const testDescription = [
    { id: 91986, title: 'Awake & Asleep' },
    { id: 98213, title: 'Long Term Monitoring' },
    { id: 23478, title: 'Upper & Lower SSEP' },
    { id: 23876, title: '3-4 Nerves' },
    { id: 13232, title: '2 Muscle EMG' }
  ];

  return (
    <Paper className={classes.pageContent}>
      <Form onSubmit={handleAdd}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={6} xs={12}>
            <Select
              name='cpt'
              label='Test Description'
              options={testDescription}
              value={parseInt(formData.cpt)}
              onChange={handleChange}
              error={errors.cpt}
              required
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <Input
              name='quantity'
              label='Quantity'
              value={formData.quantity}
              onChange={handleChange}
              type='number'
              id='quantity'
              default={1}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='small'
              label='Add'
              variant='outlined'
              onClick={handleAdd}
              color='default'
            />
          </Grid>
          {/* 
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='small'
              label='Reset'
              variant='outlined'
              onClick={handleReset}
              color='secondary'
            />
          </Grid> */}
        </Grid>


      <List className={classes.root}>
        {testData.map((item, i) => (
          <React.Fragment key={i}>
            {console.log("INDEX i: ", i)}
            <ListItem button className={classes.listItem}>
              <ListItemText
                primary={`CPT Code: ${item.cpt} - ${item.description}: Quantity: ${item.quantity}`}
                />
              <Close onClick={() => handleRemove(i)} color='secondary' />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

        <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='large'
              label='Submit'
              variant='outlined'
              onClick={handleSubmit}
              color='primary'
            />
          </Grid>
        </Form>
    </Paper>
  );
}
