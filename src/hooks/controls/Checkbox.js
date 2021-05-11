import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox, FormControl } from '@material-ui/core';

export default function Checkbox({ name, value, onChange, label }) {
  const convertToDefaultEvent = (name, value) => ({ target: { name, value } });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            type='checkbox'
            name={name}
            onChange={(e) => onChange(convertToDefaultEvent(name, e.target.checked))}
            value={value}
            color='primary'
          />
        }
        label={label}
      />
    </FormControl>
  );
}
