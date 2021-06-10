import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, addVisitDetail } from '../../actions/actions';

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
import Select from '../../hooks/controls/Select';
import { Close } from '@material-ui/icons';
import kfshAPI from '../../kfshAPI';

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
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
}));

export default function TestForm({ setOpenPopup, log }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ testData, setTestData ] = useState([]);

  const { testCodes } = useSelector((state) => state.hospital);

  const validation = (fieldValues = formData) => {
    const temp = { ...errors };
    if ('quantity' in fieldValues)
      temp.quantity = formData.quantity ? '' : 'Quantity required';
    if ('test_id' in fieldValues)
      temp.test_id = formData.test_id ? '' : 'CPT Code required';

    setErrors({ ...temp });
    if (fieldValues === formData) return Object.values(temp).every((i) => i === '');
  };

  const initialValues = {
    test_id: '',
    quantity: 1,
    visit_id: log
  };

  const { formData, handleReset, handleChange, errors, setErrors, setFormData } = useForm(
    initialValues,
    true,
    validation
  );

  const handleAdd = () => {
    if (validation()) {
      setTestData((prev) => [ ...prev, formData ]);
    }

    handleReset();
  };

  const handleRemove = (cpt) => {
    const newItems = testData.filter((item, i) => i !== cpt);
    setTestData(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      testData.forEach(async (item) => {
        await dispatch(addVisitDetail(log, item));
      });
      dispatch(addAlert('Tests added successfully!', 'success'));
    } catch (err) {
      dispatch(addAlert(err, 'error'));
    }
    handleReset();
    history.push(`/visits/${log}`);
    console.log("LOG ", log)
    setOpenPopup(false);
  };

  return (
    <Paper className={classes.pageContent}>
      <Form onSubmit={handleAdd}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={6} xs={12}>
            <Select
              name='test_id'
              label='Test Description'
              options={testCodes}
              value={formData.test_id}
              onChange={handleChange}
              error={errors.test_id}
              required
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <Input
              name='quantity'
              label='Quantity'
              value={parseInt(formData.quantity)}
              onChange={handleChange}
              type='number'
              id='quantity'
              error={errors.quantity}
              InputProps={{ inputProps: { min: 1, max:100 } }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              size='small'
              label='Add'
              variant='contained'
              onClick={handleAdd}
              color='primary'
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
              <ListItem button className={classes.listItem}>
                <ListItemText
                  primary={`CPT Code: ${item.test_id} - Quantity: ${item.quantity}`}
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
