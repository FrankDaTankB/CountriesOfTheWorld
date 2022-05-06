import React from 'react';

const SearchBox = ({searchChange, number}) => {
  return (
    <input
      className = 'pa3 ba b--blue bg-lightest-blue'
      type='search'
      placeholder={`Search ${number} Countries!`}
      onChange={searchChange}
    />
  );
}

export default SearchBox;
