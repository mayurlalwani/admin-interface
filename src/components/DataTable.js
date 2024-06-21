import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import TableRow from './TableRow';

const DataTable = () => {
  const {
    paginatedData,
    handleEdit,
    handleDelete,
    selectedRows,
    handleSelectRow,
    handleSelectAll,
    editingRow,
    setEditingRow
  } = useContext(DataContext);

  return (
    <div className="overflow-x-auto">
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
            <TableRow
              key={user.id}
              user={user}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              selectedRows={selectedRows}
              handleSelectRow={handleSelectRow}
              editingRow={editingRow}
              setEditingRow={setEditingRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
