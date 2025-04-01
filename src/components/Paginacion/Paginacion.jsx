import React from "react";

export const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <nav
        aria-label="Pagination"
        className="bg-[rgb(241,241,241)] p-2 rounded-lg"
      >
        <ul className="flex items-center space-x-4">
          <li>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-black text-white border border-black rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
          </li>
          <li>
            <p>{page}</p>
          </li>
          <li>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-black text-white border border-black rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
