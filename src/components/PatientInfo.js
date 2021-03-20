import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

async function getPatient() {
	const res = await axios.get('http://localhost:3001/patients/123456');
	console.log(res);
}

const PatientInfo = () => {
	// const [itExists, setItExists] = useState(true);
	return (
		<Formik
			initialValues={{
				mrn: '',
				firstname: '',
				lastname: '',
				dob: '',
				nationality: '',
				age_category: '',
				nationality: ''
			}}
			validationSchema={Yup.object({
				mrn: Yup.number().required().typeError('Must be a number'),
				firstname: Yup.string()
					.max(15, 'Must be 15 characters or less')
					.required('Required'),
				lastname: Yup.string()
					.max(20, 'Must be 20 characters or less')
					.required('Required'),
				dob: Yup.date().required('Required'),
				gender: Yup.string().required('Required').oneOf(['male', 'female']),
				age_category: Yup.string().required('Required').oneOf(['adult', 'pediatric']),
				nationality: Yup.string().required().oneOf(['saudi', 'non-saudi'])
			})}
			onSubmit={(values, { setSubmitting }) => {
				// setTimeout(() => {
				// 	alert(JSON.stringify(values, null, 2));
				// 	setSubmitting(false);
				// }, 400);
				getPatient();
			}}>
			{/* {!itExists ? ( */}
			{/* <Form>
					<label htmlFor='firstname'>First Name</label>
					<Field name='firstname' type='text' />
					<ErrorMessage name='firstname' />

					<label htmlFor='lastname'>Last Name</label>
					<Field name='lastname' type='text' />
					<ErrorMessage name='lastname' />

					<label htmlFor='dob'>Date of Birth</label>
					<Field name='dob' type='date' />
					<ErrorMessage name='dob' />

					<label htmlFor='gender'>Gender</label>
					<Field name='gender' as='select'>
						<option value=''>Select Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</Field>

					<label htmlFor='age_category'>Age Category</label>
					<Field name='age_category' as='select'>
						<option value=''>Select Age</option>
						<option value='adult'>Adult</option>
						<option value='pediatric'>Pediatric</option>
					</Field>

					<label htmlFor='nationality'>Nationality</label>
					<Field name='nationality' as='select'>
						<option value=''>Select Nationality</option>
						<option value='saudi'>Saudi</option>
						<option value='non-saudi'>Non Saudi</option>
					</Field>
					<button type='submit'>Submit</button>
				</Form>
			) : ( */}
			<Form>
				<label htmlFor='mrn'>MRN</label>
				<Field name='mrn' />
				<ErrorMessage name='mrn' />

				<button type='submit'>Submit</button>
			</Form>
			{/* )} */}
		</Formik>
	);
};

export default PatientInfo;
