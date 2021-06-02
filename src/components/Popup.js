import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography
} from '@material-ui/core';
import ActionButton from '../hooks/controls/ActionButton';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    // temp setting for testForm
    width: "100%"
  },
  dialogTitle: {
    paddingRight: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2)
  }
}));

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  const classes = useStyles();
  return (
    <Dialog maxWidth='md' classes={{ paper: classes.dialogWrapper }} open={openPopup}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <ActionButton color='secondary' onClick={() => setOpenPopup(false)}>
            <Close />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
