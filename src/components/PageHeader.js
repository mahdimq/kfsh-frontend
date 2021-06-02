import React from 'react';
import { Card, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
  root: {
    backgroundColor: "#253053",
    // backgroundColor: "#faf7f0"
    // backgroundColor: "#f7f7fa"
    // backgroundColor: "#f4f5fd"
    // backgroundColor: "#fdfdff",
    color: "#faf7f0"
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    // marginBottom: theme.spacing(2)
    margin: theme.spacing(0, 10, 0)
    // margin: theme.spacing(0, 10, 2)
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: "#3c44b1"
  }, 
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle1': {
      opacity: "0.7"
    }
  }
}))

function PageHeader({ title, subtitle, icon }) {
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
          {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
          {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PageHeader;
