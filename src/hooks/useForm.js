import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    }
  }
}));

export function useForm(initialValues, validateOnChange = false, validation) {
  const [ formData, setFormData ] = useState(initialValues);
  const [ errors, setErrors ] = useState({});

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'number' ? parseInt(target.value) : target.value;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (validation && validateOnChange) validation({ [name]: value });
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return { formData, setFormData, handleReset, handleChange, errors, setErrors };
}

export function Form({ children, ...others }) {
  const classes = useStyles();
  return (
    <form {...others} className={classes.root}>
      {children}
    </form>
  );
}
