import React from 'react';

const TableRow = ({
  user,
  handleEdit,
  handleDelete,
  selectedRows,
  handleSelectRow,
  editingRow,
  setEditingRow
}) => {
  const isEditing = editingRow === user.id;

  return (
    <tr className={`border-t ${selectedRows.includes(user.id) ? 'bg-gray-200' : ''}`}>
      <td className="p-2">
        <input
          type="checkbox"
          checked={selectedRows.includes(user.id)}
          onChange={() => handleSelectRow(user.id)}
        />
      </td>
      <td className="p-2">
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
      <td className="p-2 flex flex-col sm:flex-row">
        {isEditing ? (
          <button
            className="bg-green-500 text-white p-1 rounded save mb-1 sm:mb-0 sm:mr-1"
            onClick={() => setEditingRow(null)}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white p-1 rounded edit mb-1 sm:mb-0 sm:mr-1"
            onClick={() => setEditingRow(user.id)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white p-1 rounded delete"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
