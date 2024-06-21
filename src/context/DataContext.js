import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleEdit = (id, key, value) => {
    setData(data.map(user => (user.id === id ? { ...user, [key]: value } : user)));
  };

  const handleDelete = id => {
    setData(data.filter(user => user.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSelectRow = id => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(user => user.id));
    }
  };

  const handleDeleteSelected = () => {
    setData(data.filter(user => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const filteredData = data.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DataContext.Provider
      value={{
        data,
        currentPage,
        rowsPerPage,
        selectedRows,
        searchQuery,
        editingRow,
        setCurrentPage,
        setSearchQuery,
        handleEdit,
        handleDelete,
        handleSelectRow,
        handleSelectAll,
        handleDeleteSelected,
        setEditingRow,
        paginatedData,
        totalPages
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
