import React from 'react';
import { DataProvider } from './context/DataContext';
import DataTable from './components/DataTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const App = () => {
  return (
    <DataProvider>
      <div className="container mx-auto p-4">
        <SearchBar />
        <DataTable />
        <Pagination />
      </div>
    </DataProvider>
  );
};

export default App;
