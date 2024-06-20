import React, { useState, useEffect } from 'react';

const AdminInterface = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRow, setEditingRow] = useState(null);

  // Fetch data from API
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
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery]);

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
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(user => user.id));
    }
  };

  const handleDeleteSelected = () => {
    setData(data.filter(user => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
    }
  };

  const startEditing = id => {
    setEditingRow(id);
  };

  const stopEditing = () => {
    setEditingRow(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleDeleteSelected}
          disabled={!selectedRows.length}
        >
          Delete Selected
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">
              <input
                type="checkbox"
                checked={selectedRows.length === paginatedData.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(user => (
            <tr
              key={user.id}
              className={`border-t ${selectedRows.includes(user.id) ? 'bg-gray-200' : ''}`}
            >
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                />
              </td>
              <td className="p-2">
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={e => handleEdit(user.id, 'name', e.target.value)}
                    className="p-1 border rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2">
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={e => handleEdit(user.id, 'email', e.target.value)}
                    className="p-1 border rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2">
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={user.role}
                    onChange={e => handleEdit(user.id, 'role', e.target.value)}
                    className="p-1 border rounded"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="p-2">
                {editingRow === user.id ? (
                  <button
                    className="bg-green-500 text-white p-1 rounded save"
                    onClick={stopEditing}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white p-1 rounded edit"
                    onClick={() => startEditing(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white p-1 rounded delete ml-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 border rounded first-page"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded mx-2 previous-page"
          >
            Previous
          </button>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`p-2 border rounded mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded mx-2 next-page"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded last-page"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;
