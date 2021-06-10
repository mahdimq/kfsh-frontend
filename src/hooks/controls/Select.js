import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from '@material-ui/core';
import {v4 as uuid} from 'uuid'

export default function Select({ name, error = null, label, value, onChange, options }) {
  return (
    <FormControl variant='outlined' {...error && { error: true }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value || ""} onChange={onChange}>
        {/* <MenuItem value=''>None</MenuItem> */}
        {options && options.map((option) => (
          <MenuItem key={uuid()} value={option.id || option.cpt}>
            {option.firstname} {option.lastname} {option.department_name}
            {option.location_name} {option.procedure_name} {option.description}
            {option.title}
          </MenuItem>
        ))}
{/* {Object.entries(options).map(([key, value]) => {
  <MenuItem key={key}>
     {console.log("KEY AND VALUE: ", key, value)}
     {value}
   </MenuItem>
})} */}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
