import React from 'react';
import {
  Card,
  makeStyles,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Table,
  Grid
} from '@material-ui/core/';
import ActionButton from '../hooks/controls/ActionButton';
import { LocalPrintshop, MailOutline } from '@material-ui/icons';
import reportLogo from '../images/reportLogo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  table: {
    marginTop: theme.spacing(1),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      // backgroundColor: '#faf7f0',
      // backgroundColor: '#f7f7fa',
      backgroundColor: theme.palette.primary.light
    },
    '& tbody td': {
      fontWeight: '300'
      // fontSize: '0.75em'
    },
    '& tbody tr:hover': {
      // backgroundColor: '#fffbf2',
      // cursor: 'pointer'
    }
  },
  total: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 10, 2)
  },
  logo: {
    maxWidth: 50,
    marginRight: theme.spacing(2)
  }
}));

export default function Report({ data, title, other = '' }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems='center' justify='center'>
        <Grid item>
          <img className={classes.logo} src={reportLogo} alt='report logo' />
        </Grid>
        <Grid item>
          <Typography style={{ textTransform: 'capitalize' }} variant='h4'>
            {title} {other}
          </Typography>
        </Grid>
      </Grid>

      <Card className={classes.root}>
        {data[0] ? (
          <Table className={classes.table} size='small'>
            <TableHead>
              <TableRow style={{ textTransform: 'capitalize' }}>
                {Object.keys(data[0]).map(
                  (headCell, id) =>
                    headCell.includes('age_group') ? null : (
                      <TableCell key={id}>{headCell}</TableCell>
                    )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((d, idx) => (
                <TableRow key={idx}>
                  {d.procedure && <TableCell>{d.procedure}</TableCell>}
                  {d.technologist && <TableCell>{d.technologist}</TableCell>}
                  {d.department && <TableCell>{d.department}</TableCell>}
                  {d.physician && <TableCell>{d.physician}</TableCell>}
                  {d.count && <TableCell>{d.count}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant='h4'>No Reports Found</Typography>
        )}
      </Card>

      <Card className={classes.total}>
        <Grid container alignItems='center'>
          <Grid item>
            <ActionButton color='primary' onClick={() => window.print()}>
              <LocalPrintshop />
            </ActionButton>

            <ActionButton color='secondary'>
              <MailOutline />
            </ActionButton>
          </Grid>
          <Grid item sm />
          <Grid item>
            <Typography variant='h5' align='right' component='span'>
              Total: {data.reduce((acc, next) => (acc = acc + +next.count), 0)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
