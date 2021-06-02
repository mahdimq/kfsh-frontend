import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlerts } from '../actions/actions';

// Style imports from Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		}
	}
}));

function Alerts() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const alerts = useSelector((state) => state.alerts);

	useEffect(() => {
		if (alerts[0]) {
			setTimeout(function () {
				dispatch(removeAlerts());
			}, 30000);
		}
	});

	if (!alerts) {
		return null;
	} else {
		return alerts.map((a, i) => (
			<div key={i} className={classes.root}>
				<Alert severity={a.type}>{a.message}</Alert>
			</div>
		));
	}
}

export default Alerts;
