import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Procedures = () => {
	return (
		<Formik
			initialValues={{
				logNum: '',
				pedLogNum: '',
				cpt: '',
				procedureName: '',
				procedureDesc: ''
			}}
			validationSchema={Yup.object({
				logNum: Yup.mixed().required(),
				pedLogNum: Yup.mixed(),
				cpt: Yup.mixed().required('Required'),
				procedureName: Yup.string().required('Required'),
				procedureDesc: Yup.string().required('Required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}>
			<Form>
				<label htmlFor='logNum'>Log Number</label>
				<Field name='logNum' />
				<ErrorMessage name='logNum' />

				<label htmlFor='pedLogNum'>Ped Log Number</label>
				<Field name='pedLogNum' />
				<ErrorMessage name='pedLogNum' />

				<label htmlFor='cpt'>CPT Code</label>
				<Field name='cpt' />
				<ErrorMessage name='cpt' />

				<label htmlFor='procedureName'>Procedure</label>
				<Field name='procedureName' type='text' />
				<ErrorMessage name='procedureName' />

				<label htmlFor='procedureDesc'>Description</label>
				<Field name='procedureDesc' as='select'>
					<option value=''>Enter Description..</option>
					<option value='male'>Awake & Drowsy</option>
					<option value='female'>Awake & Asleep</option>
				</Field>

				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	);
};

export default Procedures;
