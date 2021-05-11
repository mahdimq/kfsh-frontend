import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText
} from '@material-ui/core';
import React from 'react';

export default function RadioButton({ name, label, value, onChange, items, error=null }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item, i) => (
          <FormControlLabel
          key={i}
          value={item.id}
          control={<Radio />}
          label={item.title}
          />
          ))}
      </RadioGroup>
          {error && <FormHelperText style={{color: "red"}}>{error}</FormHelperText>}
    </FormControl>
  );
}
