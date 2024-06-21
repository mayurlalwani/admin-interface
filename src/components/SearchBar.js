import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(DataContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-full sm:w-auto mb-2 sm:mb-0"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
