import React from 'react';

function SearchBar({ setSearchTerm  }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search for skills or interests..."
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
