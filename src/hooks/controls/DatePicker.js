import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker({ name, label, value, onChange }) {
  const convertToDefaultEvent = (name, value) => ({ target: { name, value } });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // disableToolbar
        // variant='inline'
        // inputVariant='outlined'
        // label={label}
        // value={value}
        // name={name}
        // onChange={(date) => onChange(convertToDefaultEvent(name, date))}
        // format='dd-MMM-yyyy'
        // type='date'
        disableFuture
        openTo="year"
        format="dd-MMM-yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={value}
        onChange={(date) => onChange(convertToDefaultEvent(name, date))}
        variant='inline'
        inputVariant='outlined'
        name={name}
      />
    </MuiPickersUtilsProvider>
  );
}
