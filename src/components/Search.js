import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

// Style Imports
import { StyledSearchBar, StyledSearchBarContent } from '../styles/StyledSearchBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search({ callback }) {
	const [search, setSearch] = useState('');
	const timeOut = useRef(null);
	// Debounce waits a while before making an api call to limit api calls
	const debouncedSave = useRef(debounce((nextVal) => setSearch(nextVal), 300)).current;

	const handleSearch = (e) => {
		const { value } = e.target;
		clearTimeout(timeOut.current);
		setSearch(value);

		timeOut.current = setTimeout(() => {
			callback(value);
		}, 400);
		debouncedSave(value);
	};

	return (
		<StyledSearchBar>
			<StyledSearchBarContent>
				{/* <FontAwesomeIcon className='search' icon={faSearch} /> */}
				<input
					type='text'
					placeholder='Search MRN...'
					onChange={handleSearch}
					value={search}
				/>
			</StyledSearchBarContent>
		</StyledSearchBar>
	);
}

Search.propTypes = {
	callback: PropTypes.func
};

export default Search;
