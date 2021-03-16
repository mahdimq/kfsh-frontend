import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
	return (
		<Formik
			initialValues={{ id: '' }}
			validationSchema={Yup.object({
				id: Yup.number().typeError('ID must be a number!').required('Required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}>
			<Form>
				<label htmlFor='id'>Employee ID</label>
				<Field name='id' />

				<ErrorMessage name='id' />

				<button type='submit'>Login</button>
			</Form>
		</Formik>
	);
};

export default Login;
