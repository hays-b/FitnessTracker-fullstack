import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAuth();

  const [searchTerm, setSearchTerm] = useState(searchQuery)

  return (
    <form
    className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(searchTerm);
      }}
    >
      <input
      className="searchbar-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit" className="searchbar-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 2 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-3"
        >
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
