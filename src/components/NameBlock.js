import React from 'react';
import {
  LocalHospital,
  Event,
  Wc,
  Public,
  HourglassEmpty,
  Person
} from '@material-ui/icons';
import {
  makeStyles,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core';
import { age, formatDate } from '../helpers/dateFormatter';

const useStyles = makeStyles((theme) => ({
  nameBlock: {
    textTransform: 'capitalize',
    // padding: theme.spacing(1),
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 600,
    fontSize: '40px',
    color: '#faf7f0'
  },
  divider: {
    backgroundColor: '#faf7f0',
    opacity: 0.6
  }
}));

export default function NameBlock({ patient }) {
  const classes = useStyles();

  return (
    
    <List className={classes.nameBlock} dense>
      <Grid container>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${patient.firstname} ${patient.middlename} ${patient.lastname}`}
              secondary='Full Name'
            />
          </ListItem>
        </Grid>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalHospital />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={patient.mrn} secondary='MRN' />
          </ListItem>
        </Grid>
      </Grid>

      <Divider variant='inset' component='li' className={classes.divider} />

      <Grid container>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Event />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={formatDate(patient.dob)}
              secondary={`Age: ${age(patient.dob)} yrs`}
            />
          </ListItem>
        </Grid>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Wc />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={patient.gender} secondary='Gender' />
          </ListItem>
        </Grid>
      </Grid>

      <Divider variant='inset' component='li' className={classes.divider} />

      <Grid container>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Public />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={patient.nationality} secondary='Nationality' />
          </ListItem>
        </Grid>
        <Grid item sm={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HourglassEmpty />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={patient.age_group} secondary='Age Category' />
          </ListItem>
        </Grid>
      </Grid>
    </List>
  );
}
