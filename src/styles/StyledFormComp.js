import styled from 'styled-components';

export const StyledFormComp = styled.div`
	max-width: 480px;
	margin: 1.5em auto;
	padding: 1.5em;

	.input-box {
		color: black;
		font-family: 'Abel', sans-serif;
		font-weight: 500;
		font-size: 18px;
		border-radius: 5px;
		line-height: 22px;
		background-color: transparent;
		border: 1px solid #cc6666;
		transition: all 0.3s;
		padding: 12px;
		margin-top: 15px;
		width: 100%;
		box-sizing: border-box;
		outline: 0;
		color: lightslategray;
	}
	.input-box:focus {
		border: 1px solid #cc4949;
	}

	h3 {
		font-family: 'Abel', sans-serif;
		color: gray;
		font-size: 1.3em;
		border-bottom: solid 1px gray;
	}

	h3 span {
		color: #e3d0cf;
		margin-left: 0.25em;
	}

	.button-group {
		margin: 0.75em auto;
	}

	.btn-col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.profile-btns {
		width: 100%;
		margin: 0.5em 0;
	}

	@media screen and (min-width: 568px) {
		.btn-col {
			flex-direction: row;
		}

		.profile-btns + .profile-btns {
			margin-left: 0.8em;
		}
		margin: auto;
	}
`;
