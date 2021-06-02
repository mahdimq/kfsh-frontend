// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import { Button, Container, Typography } from '@material-ui/core';

// function Home() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const user = useSelector((state) => state.user);
//   const patient = useSelector((state) => state.patient);

//   // const searchPatient = async (mrn) => {
//   // 	try {
//   // 		await dispatch(getPatient(mrn))

//   // 	} catch (err){
//   // 		console.error(err);
//   // 	}
//   // }
//   return (
//     <Container component='main' maxWidth='md'>
//       {/* <Search callback={searchPatient} /> */}
//       {/* <PatientInfo data={patient.patient}/> */}
//       <div style={{textAlign: 'center'}}>
//         <Typography align="center" gutterBottom variant="h2">KFSH Neurophysiology</Typography >
//         <Typography align="center" variant="h3">Clinical Data Management</Typography >
//         <Typography gutterBottom align="center" variant="h3">Intuitive. Beautiful. Simple.</Typography >

//       {user.token ? (
//         <Typography align="center" color="secondary" variant="h4">Hello {user.firstname}!</Typography>
//         ) : (
//           <Button
//           onClick={() => history.push('/login')}
//           variant='contained'
//           size='large'
//           color='primary'>
//           Login
//         </Button>
//       )}
//       </div>
//     </Container>
//   );
// }
// export default Home;

import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import Button from '../hooks/controls/Button';
import neuro4 from '../images/neuro4.jpeg';
import report from '../images/report.jpg';
import kfshLogo from '../images/kfshLogo.png';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    // backgroundColor: theme.palette.primary.light
    backgroundColor: '#f2f2f2'
    // backgroundColor: '#e8e8e8',
  },
  image: {
    maxWidth: 800,
    width: '100%'
  },
  comment: {
    fontStyle: 'italic',
    textAlign: 'center',
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    fontWeight: 600
  },
  commentDetails: {
    textAlign: 'center',
    padding: 0,
    fontSize: 12,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  title: {
    paddingBottom: theme.spacing(2),
    fontWeight: 600
  },
  list: {
    marginLeft: -25,
    marginTop: 5
  },
  bold: {
    fontWeight: 600
  },
  gridItem: {
    paddingLeft: theme.spacing(2)
  },
  gridItem2: {
    paddingTop: theme.spacing(5)
  },
  logo: {
    height: '100%',
    display: 'block',
    maxWidth: 300,
    width: '100%',
    margin: 'auto',
    paddingBottom: '10px'
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  return (
    <Box className={classes.root}>
      <Grid item>
        <img src={kfshLogo} alt='Logo' className={classes.logo} />
        <Typography gutterBottom align='center' color='primary' variant='h2'>
          Neurophysiology Department
        </Typography>
        <Typography gutterBottom align='center' variant='h4'>
          Manage Data. Beautifully.
        </Typography>
        {user.token ? (
          <Typography align='center' variant='h5'>
            Welcome {user.firstname}
          </Typography>
        ) : (
          <Button
            onClick={() => history.push('/login')}
            variant='contained'
            size='large'
            color='primary'
            label='Login'
            className={classes.logo}>
            Login
          </Button>
        )}
      </Grid>
      <Paper elevation={3} className={classes.paper}>
        <Box p={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography color='primary' className={classes.title} variant='h5'>
                Neurophysiology Department
              </Typography>
              <Typography>
                Neurophysiology Department offers sophisticated and advanced diagnostic
                procedures to help neurology healthcare provider to identify neurological
                conditions and develop treatment plans for our precious patients and their
                families.{' '}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem2}>
              <Typography color='primary' className={classes.title} variant='h5'>
                What services we provide?
              </Typography>
            </Grid>
            <Grid item sm={12} md={6} className={classes.gridItem}>
              <Typography className={classes.subheader}>
                One of the most advanced centers in the reagion, we provide state of the
                art neurodiagnostic services
              </Typography>

              <ul className={classes.list}>
                <li>
                  <Typography className={classes.bold}>
                    Electroencephalograms (EEG):
                  </Typography>The visual interpretation of the electrical activity of the
                  brain.
                </li>

                <li>
                  <Typography className={classes.bold}>
                    Long-term video-EEG monitoring:
                  </Typography>{' '}
                  The neurophysiology department monitors patients with seizures and
                  conditions mimicking seizures with video recordings over a long term to
                  determine whether patients have seizures and localizing seizures in
                  candidates for epilepsy surgery.
                </li>

                <li>
                  <Typography className={classes.bold}>
                    Nerve conduction studies (NCS):
                  </Typography>Our highly skilled and experienced technologist uses
                  state-of-the-art equipment to measure the electrical activity in nerves.
                </li>

                <li>
                  <Typography className={classes.bold}>
                    Electromyograms (EMG):
                  </Typography>In collaboration with our neurlogists, we use EMG's to
                  measure the electrical activity in the muscles.
                </li>

                <li>
                  <Typography className={classes.bold}>ICU monitoring:</Typography>{' '}
                  determining the depth of coma in patients with brain injury receiving
                  protective treatment with barbiturates to reduce brain metabolism and
                  intracranial pressure.
                </li>

                <li>
                  <Typography className={classes.bold}>
                    Visual Evoked Potentials tests (VEP):
                  </Typography>These measure the rate of conduction between the retina and
                  the brain.
                </li>
              </ul>
            </Grid>
            <Grid item sm={12} md={6} className={classes.gridItem}>
              <img className={classes.image} src={neuro4} alt='neuro' />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} className={classes.paper}>
        <Box p={6}>
          <Grid container>
            <Grid container spacing={4}>
              <Grid item sm={12} md={6} className={classes.gridItem2}>
                <Typography color='primary' className={classes.title} variant='h5'>
                  Data Entry and Data Retrieval with Precision
                </Typography>
                <img src={report} alt='reports' className={classes.image} />
              </Grid>

              <Grid item sm={12} md={6} className={classes.gridItem2}>
                <Typography className={classes.gridItem2}>
                  With every completed procedure, we input the patient details, visitation
                  information and specific tests performed into a custom designed database
                  system. With the ability to query monthly reports specific to the needs
                  of the department, we achieve accountability and strive to exceed
                  expectations, without compromising on quality of care and the safety of
                  our patients.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
