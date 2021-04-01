import styled from 'styled-components';

export const StyledSearchBar = styled.div`
	width: 50%;
	padding: 0.5em;
	box-sizing: border-box;
	margin: 1em auto;
	color: #fff;
`;

export const StyledSearchBarContent = styled.div`
	max-width: 1280px;
	width: 80%;
	height: 40px;
	background: skyblue;
	margin: 0 auto;
	border-radius: 5px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	.search {
		color: #fff;
		margin: 0 3px 0 10px;
		font-size: 1.5em;
	}

	input {
		font-family: 'Abel', sans-serif;
		font-size: 1.5em;
		border: none;
		width: 90%;
		background: transparent;
		height: 40px;
		color: #fff;
		box-sizing: border-box;

		:focus {
			outline: none;
		}

		@media screen and (max-width: 720px) {
			font-size: 1.5em;
		}
	}
`;
