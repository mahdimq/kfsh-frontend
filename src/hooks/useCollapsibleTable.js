import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableBody,
  IconButton,
  Box,
  Typography,
  Collapse
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons/';
import { formatDate } from '../helpers/dateFormatter';

const useStyles = makeStyles((theme) => ({
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
    }
  }
}));

// function createData(
//   log_num,
//   ped_log_num,
//   patient_mrn,
//   procedure_name,
//   p_firstname,
//   p_lastname,
//   u_firstname,
//   u_lastname,
//   location_name,
//   visit_date
// ) {
//   return {
//     log_num,
//     ped_log_num,
//     patient_mrn,
//     procedure_name,
//     p_firstname,
//     p_lastname,
//     u_firstname,
//     u_lastname,
//     location_name,
//     visit_date,
//     // visitDetails
//   };
// }

// const rows = visit.map((item) => [
//   createData(
//     item.log_num,
//     item.ped_log_num,
//     item.patient_mrn,
//     item.procedure_name,
//     item.firstname,
//     item.lastname,
//     item.user_firstname,
//     item.user_lastname,
//     item.location_name,
//     item.visit_date
//   )
// ]);

export default function useCollapsibleTable(row, headCells, detailHeadCells) {
  const classes = useStyles();
  const [ order, setOrder ] = useState();
  const [ orderBy, setOrderBy ] = useState();
  const [ open, setOpen ] = useState(false);

  const handleSortRequest = (cellId) => {
    const isAscending = orderBy === cellId && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(cellId);
  };

  const TableContainer = ({ children, size = null }) => (
    <Table size={size} className={classes.table}>
      {children}
    </Table>
  );

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.disableSorting ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => handleSortRequest(headCell.id)}>
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const TableDetailsHeader = () => (
    <TableHead>
      <TableRow>
        {detailHeadCells.map((detailCell) => (
          <TableCell
            key={detailCell.id}
            sortDirection={orderBy === detailCell.id ? order : false}>
            {detailCell.disableSorting ? (
              detailCell.label
            ) : (
              <TableSortLabel
                active={orderBy === detailCell.id}
                direction={orderBy === detailCell.id ? order : 'asc'}
                onClick={() => handleSortRequest(detailCell.id)}>
                {detailCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  {
    /* {rows.details.map(item => console.log("ITEM: ", item.cpt))} */
  }
  // <TableRow className={classes.root} key={rows.log_num}>
  //   <TableCell>
  //     <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
  //       {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  //     </IconButton>
  //   </TableCell>
  //   <TableCell component='th' scope='row'>
  //     {rows.log_num}
  //   </TableCell>
  //   <TableCell>{rows.ped_log_num}</TableCell>
  //   <TableCell>{rows.patient_mrn}</TableCell>
  //   <TableCell>
  //     {rows.p_firstname} {rows.p_lastname}
  //   </TableCell>
  //   <TableCell>{rows.procedure_name}</TableCell>
  //   <TableCell>
  //     {rows.u_firstname} {rows.u_lastname}
  //   </TableCell>
  //   <TableCell>{rows.location_name}</TableCell>
  //   <TableCell>{formatDate(rows.visit_date)}</TableCell>
  // </TableRow>;
  {
    /* ))} */
  }

  // <TableRow>
  //   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
  //     <Collapse in={open} timeout='auto' unmountOnExit>
  //       <Box margin={1}>
  //         <Typography variant='h6' gutterBottom component='div'>
  //           Details
  //         </Typography>

  {
    /* <TableHead>
                  <TableRow>
                    <TableCell>CPT</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Physician</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Visit Date</TableCell>
                  </TableRow>
                </TableHead> */
  }

  // <TableBody>
  //   <TableRow key={detailsRow.cpt}>
  //     <TableCell component='th' scope='row'>
  //       {detailsRow.cpt}
  //     </TableCell>
  //     <TableCell component='th' scope='row'>
  //       {detailsRow.description}
  //     </TableCell>
  //     <TableCell>{detailsRow.quantity}</TableCell>
  //     <TableCell>
  //       {detailsRow.firstname} {detailsRow.lastname}
  //     </TableCell>
  //     <TableCell>{detailsRow.location_name}</TableCell>
  //     <TableCell>{formatDate(detailsRow.visit_date)}</TableCell>
  //   </TableRow>
  // </TableBody>

  //       </Box>
  //     </Collapse>
  //   </TableCell>
  // </TableRow>;
  return { TableContainer, TableHeader, TableDetailsHeader};
}
