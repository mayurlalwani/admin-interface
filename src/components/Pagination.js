import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Pagination = () => {
  const { currentPage, totalPages, setCurrentPage } = useContext(DataContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
      <div className="flex mb-2 sm:mb-0">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="p-2 border rounded first-page"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded mx-2 previous-page"
        >
          Previous
        </button>
      </div>
      <div className="flex flex-wrap justify-center mb-2 sm:mb-0">
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
      <div className="flex">
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
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
  );
};

export default Pagination;
