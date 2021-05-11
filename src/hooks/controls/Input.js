import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input({ name, label, value, error=null, onChange, type, id, ...other }) {
  return (
    <TextField
      variant='outlined'
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      id={id}
      autoComplete='off'
      {...other}
      {...(error && {error: true, helperText: error})}
    />
  );
}
