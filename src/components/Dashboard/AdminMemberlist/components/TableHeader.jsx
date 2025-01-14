import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'flowbite-react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const TableHeader = ({
  field,
  children,
  className = '',
  width,
  sortField,
  sortDirection,
  onSort,
  onResize,
  isResizable = false
}) => {
  return (
    <Table.HeadCell 
      className={`!p-3 cursor-pointer group bg-gray-50/80 relative ${className}`}
      onClick={() => onSort(field)}
      style={{ width: `${width}px` }}
    >
      <div className="flex items-center gap-1.5 justify-between">
        {children}
        <div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">
          <FiChevronUp 
            className={`h-2.5 w-2.5 -mb-0.5 ${
              sortField === field && sortDirection === 'asc'
                ? 'text-cyan-600'
                : 'text-gray-400'
            }`}
          />
          <FiChevronDown 
            className={`h-2.5 w-2.5 ${
              sortField === field && sortDirection === 'desc'
                ? 'text-cyan-600'
                : 'text-gray-400'
            }`}
          />
        </div>
      </div>

      {isResizable && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize group/resizer hover:bg-cyan-500/20 transition-colors duration-200"
          onMouseDown={(e) => onResize(field, e)}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 opacity-0 group-hover/resizer:opacity-100 transition-opacity duration-200">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500/20 rounded-full" />
          </div>
        </div>
      )}
    </Table.HeadCell>
  );
};

TableHeader.propTypes = {
  field: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
  onSort: PropTypes.func.isRequired,
  onResize: PropTypes.func,
  isResizable: PropTypes.bool
};

TableHeader.defaultProps = {
  className: '',
  isResizable: false,
  onResize: () => {}
};

export default TableHeader; 