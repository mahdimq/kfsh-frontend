import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from '@material-ui/core';

export default function Select({ name, error = null, label, value, onChange, options }) {
  return (
    <FormControl variant='outlined' {...error && { error: true }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value || ""} onChange={onChange}>
        {/* <MenuItem value=''>None</MenuItem> */}
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
