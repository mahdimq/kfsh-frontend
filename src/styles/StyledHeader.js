import styled from 'styled-components';

// export const StyledTMDBLogo = styled.img`
// 	width: 70px;
// 	@media screen and (max-width: 500px) {
// 		width: 40px;
// 		margin: 0.5em auto;
// 	}
// `;

export const StyledLogo = styled.img`
	width: 10rem;

	@media screen and (max-width: 500px) {
		width: 8em;
	}
`;

export const StyledHeader = styled.div`
	
	box-sizing: border-box;

	.header-content {
		max-width: 1280px;
		width: 90%;
		padding: 1em 0;
		margin: 0 auto;
		box-sizing: border-box;

		@media screen and (max-width: 500px) {
			max-width: 1280px;
			min-height: 0px;
		}
	}
`;

export const StyledNavbar = styled.nav`
	background-color: #bbe7f2;
	-webkit-font-smoothing: antialiased;
	text-align: center;
	padding: 0.5em 0;
	color: white;

	.container {
		width: 90%;
		max-width: 1280px;
		margin: 0 auto;
		/* added for nav-toggle positioning */
		position: relative;
	}

	.nav {
		width: 100%;
		visibility: hidden;
		height: 0;
		position: absolute;
	}

	.nav--visible {
		visibility: visible;
		height: auto;
		position: relative;
	}

	.nav__item {
		font-family: 'Abel', sans-serif;
		padding: 0.75rem;
		font-size: 0.75rem;
		text-decoration: none;
		text-transform: uppercase;
	}

	.nav__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav__list--primary {
		margin-bottom: 0.5em;
	}

	.nav__link:hover,
	.nav__link:focus {
		opacity: 0.65;
	}

	.nav-toggle {
		cursor: pointer;
		border: 0;
		width: 3em;
		height: 3em;
		padding: 0em;
		border-radius: 50%;
		background: gray;
		color: white;
		outline: none;
		transition: opacity 250ms ease;

		position: absolute;
		right: 0;
	}

	.nav-toggle:focus,
	.nav-toggle:hover {
		opacity: 0.75;
	}

	.hamburger {
		width: 50%;
		position: relative;
	}

	.hamburger,
	.hamburger::before,
	.hamburger::after {
		display: block;
		margin: 0 auto;
		height: 3px;
		background: white;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		width: 100%;
	}

	.hamburger::before {
		transform: translateY(-6px);
	}

	.hamburger::after {
		transform: translateY(3px);
	}

	.logo {
		margin-bottom: 0.5em;
	}

	@media (min-width: 500px) {
		.nav-toggle {
			display: none;
		}

		.nav {
			display: flex;
			justify-content: flex-end;
			visibility: visible;
			height: auto;
			position: relative;
		}

		.logo-container {
			align-items: center;
		}

		.tmdb-logo {
			margin-left: 1rem;
		}

		.nav__list {
			display: flex;
			margin: 0;
		}

		.row {
			display: flex;
			justify-content: space-between;
		}

		.logo-container {
			align-items: center;
		}
	}

	a {
		text-decoration: none;
	}
`;
