import React from 'react';

const formatDate = (date) => {
	// NEED TO ADD DATE FORMATTER IN HERE
	let d = new Date(date).toLocaleDateString();
	return d;
};

const age = (date) => {
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

function PatientInfo({data}) {
	console.log(data)
	return (
		<div style={{color: "black", border: "solid 2px black", width: "40%", margin: "0 auto", background: "#fff"}}>
			<h4>MRN: {data.mrn}</h4>
			<h2>Full Name: {data.firstname} {data.middlename} {data.lastname}</h2>
			<p>Date of Birth: {formatDate(data.dob)} 	- 	Age: {age(data.dob)}</p>
			<p>Gender: {data.gender} 	- 	Nationality: {data.nationality}</p>
		</div>
	)
}

export default PatientInfo
