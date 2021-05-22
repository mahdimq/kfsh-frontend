// import React, { useState } from 'react';
// import PageHeader from '../../components/PageHeader';
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import { Search } from '@material-ui/icons';
// import {
//   InputAdornment,
//   makeStyles,
//   Paper,
//   TableBody,
//   TableCell,
//   TableRow,
//   Toolbar
// } from '@material-ui/core';
// import useTable from '../../hooks/useTable';
// import Input from '../../hooks/controls/Input';

// import { formatDate, age } from '../../helpers/dateFormatter';
// import { useFetchHook } from '../../hooks/useFetch';
// import { fetchVisitTest } from '../../actions/actions';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router';
// import VisitForm from './VisitForm';
// import { Link } from 'react-router-dom';

// import Spinner from '../../components/Spinner';

// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     margin: theme.spacing(3),
//     padding: theme.spacing(3)
//   },
//   searchInput: {
//     width: '60%'
//   },
//   link: {
//     textDecoration: 'none',
//     color: 'inherit',
//     '&:hover': {
//       backgroundColor: '#fffbf2 !important'
//     }
//   }
// }));

// const headCells = [
//   { id: 'log_num', label: 'NPL' },
//   { id: 'ped_log_num', label: 'PNPL' },
//   { id: 'patient_mrn', label: 'MRN' },
//   { id: 'procedure_id', label: 'Procedure' },
//   { id: 'physician_id', label: 'Physician' },
//   { id: 'user_id', label: 'Technologist' },
//   { id: 'visit_date', label: 'Visit Date' },
//   { id: 'location_id', label: 'Location' }
// ];

// export default function VisitTest() {
//   const { npl } = useParams();
//   console.log("NPL: ", npl)
//   // const classes = useStyles();
//   // // const [ loading ] = useFetchHook(fetchVisits(mrn));
//   const [ loading ] = useFetchHook(fetchVisitTest(npl));
//   const { visitTest } = useSelector((state) => state.visitTest);

//   // const [ filterFunc, setFilterFunc ] = useState({
//   //   func: (items) => {
//   //     return items;
//   //   }
//   // });

//   // const { TableContainer, TableHeader, TablePagination, recordsAfterSorting } = useTable(
//   //   visitT,
//   //   headCells,
//   //   filterFunc
//   // );

//   // const handleSearch = (e) => {
//   //   // e.preventDefault();
//   //   const target = e.target;
//   //   setFilterFunc({
//   //     func: (items) => {
//   //       if (target.value === '') return items;
//   //       else return items.filter((x) => JSON.stringify(x.mrn).includes(target.value));
//   //     }
//   //   });
//   // };

//   {
//     loading && <Spinner />;
//   }

//   {
//     // if (!loading && visitTests.length === 0) return <h1>NO VISITS FOUND</h1>;
//   }

//   {
//     !loading && console.log('VISIT TEST: ', visitTest);
//   }

//   return (
//     <div>
//       <h1>VISIT DETAILS</h1>

//       {/* {!load && (
//         <PageHeader
//           title='View Patient visitTest'
//           // subtitle={visits[visits.length-1].ped_log_num ? `Current Running Log: NPL#: ${visits[visits.length-1].ped_log_num}` ? `${visits[visits.length - 1]
//           //   .log_num}` :  `/ P-NPL#: ${visits[visits.length - 1].ped_log_num}`
//           subtitle={
//             visits[visits.length - 1].ped_log_num ? (
//               `Current Running Log: NPL#: ${visits[visits.length - 1]
//                 .log_num} / P-NPL#: ${visits[visits.length - 1].ped_log_num}`
//             ) : (
//               `Current Running Log: NPL#: ${visits[visits.length - 1].log_num}`
//             )
//           }
//           icon={<LocalHospitalIcon fontSize='large' />}
//         />
//       )}

//       {!loading && (
//         <React.Fragment>
//           <div
//             style={{
//               margin: '0.5em 4em',
//               border: 'solid brown 2px',
//               textAlign: 'center'
//             }}>
//             <h2>
//               {visit[0].p_firstname} {visit[0].p_middlename} {visit[0].p_lastname}
//             </h2>
//             <h3>
//               NATIONALITY: {visit[0].nationality} - GENDER: {visit[0].gender} - DOB:{' '}
//               {formatDate(visit[0].dob)}
//             </h3>
//             <h3>AGE: {age(visit[0].dob)}</h3>
//           </div>

//           <Paper className={classes.pageContent}>
//             <VisitForm />
//             <TableContainer>
//               <TableHeader />
//               <TableBody>
//                 {recordsAfterSorting().map((item) => (
//                   <TableRow
//                     className={classes.link}
//                     key={item.log_num}
//                     component={Link}
//                     to={`/visits/${item.patient_mrn}/${item.log_num}`}>
//                     <TableCell>{item.log_num}</TableCell>
//                     <TableCell>{item.ped_log_num}</TableCell>
//                     <TableCell>{item.patient_mrn}</TableCell>
//                     <TableCell>{item.procedure_name}</TableCell>
//                     <TableCell>
//                       {item.firstname} {item.lastname}
//                     </TableCell>
//                     <TableCell>
//                       {item.user_firstname} {item.user_lastname}
//                     </TableCell>
//                     <TableCell>{formatDate(item.visit_date)}</TableCell>
//                     <TableCell>{item.location_name}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </TableContainer>
//             <TablePagination />
//           </Paper>
//         </React.Fragment>
//       )} */}
//     </div>
//   );
// }
import React from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Card,
  Icon,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { LocalHospital, Person, Event, HourglassEmpty, Wc, Public, MenuBook } from '@material-ui/icons';
import { useFetchHook } from '../../hooks/useFetch';
import { fetchAllVisits, fetchVisits } from '../../actions/actions';
import {useSelector} from 'react-redux'
import {formatDate, age} from '../../helpers/dateFormatter'
import {useParams} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#faf7f0',
    padding: theme.spacing(1),
    margin: theme.spacing(0, 'auto', 0),
    
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#f4f5fd',
    fontSize: '40px'
  
  },
  nameBlock: {
    textTransform: 'capitalize',
    // padding: theme.spacing(1),
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 600,
    fontSize: '40px'
  },
  header: {
    backgroundColor: '#faf7f0'
  },
  title: {
    margin: theme.spacing(0, 'auto'),
    width: '100%',
    maxWidth: 370
  },
  pageIcon: {
    display: 'inline-block',
    borderRadius: '50%',
    padding: theme.spacing(1),
    color: "#3c44b1"
  }, 
  titleText: {
    paddingLeft: theme.spacing(2)
  },
 
}));

export default function VisitTest() {
  const {npl} = useParams();
  const classes = useStyles();
  const [loading] = useFetchHook(fetchAllVisits())
  const [load] = useFetchHook(fetchVisits(npl))
  const {visits} = useSelector(state => state.patient)
  const {visit} = useSelector(state => state.patient)

  return (
    // <Paper elevation={1} square className={classes.root}>

    //   <List >
    //     <Grid container>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <Person />
    //           </ListItemAvatar>
    //           <ListItemText primary='Bilal AbdulQadir' />
    //         </ListItem>
    //       </Grid>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <LocalHospital />
    //           </ListItemAvatar>
    //           <ListItemText primary='MRN: 123987' />
    //         </ListItem>
    //       </Grid>
    //     </Grid>
    //     <Divider variant='inset' component='li' />

    //     <Grid container>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <Event />
    //           </ListItemAvatar>
    //           <ListItemText primary='Date of Birth: 24/11/1945' secondary="Age: 24 yrs" />
    //         </ListItem>
    //       </Grid>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <Wc />
    //           </ListItemAvatar>
    //           <ListItemText primary="Gender: male" />
    //         </ListItem>
    //       </Grid>
    //     </Grid>
    //     <Divider variant='inset' component='li' />
    //     <Grid container>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <Public />
    //           </ListItemAvatar>
    //           <ListItemText primary='Nationality: Saudi' />
    //         </ListItem>
    //       </Grid>
    //       <Grid item sm={6}>
    //         <ListItem>
    //           <ListItemAvatar>
    //             <HourglassEmpty />
    //           </ListItemAvatar>
    //           <ListItemText primary='Age Category: Adult' />
    //         </ListItem>
    //       </Grid>
    //     </Grid>
        
       
    //   </List>

    // </Paper>
    <Grid container className={classes.header} alignItems='center'>
        {!load && (
          <Grid item sm={5}>
            <ListItem className={classes.title}>
              {/* <ListItemAvatar> */}
              <Card className={classes.pageIcon}>
                <LocalHospital fontSize="large" color='primary' />
        </Card>
              {/* </ListItemAvatar> */}
              <Typography className={classes.titleText} variant='h5' component='div'>
                View Visit Details
              </Typography>
            </ListItem>

            <Divider variant='inset' />

            <ListItem className={classes.title}>
            <Card className={classes.pageIcon}>
                <MenuBook fontSize="large" color='primary' />
        </Card>
              {/* <ListItemAvatar>
                <MenuBook fontSize='large' color='primary' />
              </ListItemAvatar> */}
              {/* <Typography className={classes.titleText} variant='paragraph1' component='div'>
                {visits[visits.length - 1].ped_log_num ? (
                  `NPL#: ${visits[visits.length - 1].log_num} / P-NPL#: ${visits[
                    visits.length - 1
                  ].ped_log_num}`
                ) : (
                  `NPL#: ${visits[visits.length - 1].log_num}`
                )}
              </Typography> */}
            </ListItem>
          </Grid>
        )}
        {/* 
        <PageHeader
          title='View Patient Visit'
          subtitle={
            visits[visits.length - 1].ped_log_num ? (
              `Current Running Log: NPL#: ${visits[visits.length - 1]
                .log_num} / P-NPL#: ${visits[visits.length - 1].ped_log_num}`
            ) : (
              `Current Running Log: NPL#: ${visits[visits.length - 1].log_num}`
            )
          }
          icon={<LocalHospital fontSize='large' />}
        /> */}


        <Grid item sm={7}>
          {!loading && (
            <List className={classes.nameBlock} dense>
              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Person />
                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText
                      primary={`${visit[0].p_firstname} ${visit[0]
                        .p_middlename} ${visit[0].p_lastname}`}
                        secondary="Full Name"
                    /> */}
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                      <LocalHospital />

                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText primary={visit[0].patient_mrn} secondary="MRN" /> */}
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                      <Event />

                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText
                      primary={formatDate(visit[0].dob)}
                      secondary={`Age: ${age(visit[0].dob)} yrs`}
                    /> */}
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Wc />
                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText primary={visit[0].gender} secondary="Gender"/> */}
                  </ListItem>
                </Grid>
              </Grid>

              <Divider variant='inset' component='li' />

              <Grid container>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <Public />
                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText primary={visit[0].nationality} secondary="Nationality" /> */}
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>

                      <HourglassEmpty />
                      </Avatar>
                    </ListItemAvatar>
                    {/* <ListItemText primary={visit[0].age_group} secondary="Age Category" /> */}
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          )}
        </Grid>
      </Grid>
  );
}
