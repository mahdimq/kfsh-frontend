import styled from 'styled-components';

export const StyledSpinner = styled.div`
	border: 3px solid #2b2120;
	border-top: 3px solid #c20a0a;
	border-bottom: 3px solid #c20a0a;
	position: absolute;
	top: 40%;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	border-radius: 50%;
	width: 70px;
	height: 70px;
	animation: spin 0.8s infinite linear;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
