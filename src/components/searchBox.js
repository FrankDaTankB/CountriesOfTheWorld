import React from 'react';

const SearchBox = ({searchChange}) => {
  return (
    <input
      className = 'pa3 ba b--blue bg-lightest-blue'
      type='search'
      placeholder='search countries'
      onChange={searchChange}
    />
  );
}

export default SearchBox;
