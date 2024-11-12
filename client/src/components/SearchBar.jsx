import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-lg border-2 border-sky-300 focus:border-sky-500 focus:outline-none shadow-md"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;