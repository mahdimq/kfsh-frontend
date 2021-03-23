import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Procedures = () => {
	return (
		<Formik
			initialValues={{
				procedureName: '',
				procedureDesc: '',
				date: '',
				status: ''
			}}
			validationSchema={Yup.object({
				procedureName: Yup.string().required('Required'),
				procedureDesc: Yup.mixed().required('Required'),
				date: Yup.date().required('Required'),
				status: Yup.string().required('Required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}>
			<Form>
				<label htmlFor='procedureName'>Procedure</label>
				<Field name='procedureName' as='select'>
					<option value=''>Enter Procedure..</option>
					<option value='eeg'>EEG</option>
					<option value='ltm'>LTM</option>
					<option value='iom'>IOM</option>
					<option value='vep'>VEP</option>
					<option value='baep'>BAEP</option>
					<option value='emg'>EMG</option>
					<option value='ncs'>NCS</option>
				</Field>
				<ErrorMessage name='procedureName' />

				<label htmlFor='procedureDesc'>CPT Code</label>
				<Field name='procedureDesc' as='select'>
					<option value=''>Enter CPT/Procedure..</option>
					<option value='91816'>91816 - Awake and Drowsy EEG</option>
					<option value='93746'>93746 - Upper SSEP</option>
					<option value='62374'>62374 - Pattern Reversal VEP</option>
					<option value='21343'>21343 - Clinical BAEP</option>
					<option value='69821'>69821 - Upper and Lower MEP</option>
				</Field>
				<ErrorMessage name='procedureDesc' />

				<label htmlFor='date'>Date Performed</label>
				<Field name='date' type='date' />
				<ErrorMessage name='date' />

				<label htmlFor='status'>Status</label>
				<Field name='status' as='select'>
					<option value=''>Enter Status..</option>
					<option value='complete'>Complete</option>
					<option value='no-show'>No Show</option>
					<option value='rescheduled'>Rescheduled</option>
				</Field>
				<ErrorMessage name='date' />

				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	);
};

export default Procedures;
