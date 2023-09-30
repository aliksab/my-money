import React from "react";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    if (pageCount === 1) return (null);
    return (
        <nav>
            <ul className="inline-flex -space-x-px text-sm">
                {pages.map((page) => (
                    <li
                        key={"page_" + page}
                        onClick={() => onPageChange(page)}
                    >
                        <a className={(page === currentPage ? "flex items-center justify-center mx-1 px-3 h-8 text-purple-600 border border-gray-300 bg-purple-50 hover:bg-purple-100 hover:text-purple-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded" : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded")}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
