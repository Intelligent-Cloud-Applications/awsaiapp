import React, { useRef } from 'react';
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
  const headerRef = useRef(null);

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!headerRef.current) return;

    // Store all necessary references and values at the start
    const header = headerRef.current;
    const table = header.closest('table');
    const columnIndex = Array.from(header.parentElement.children).indexOf(header);
    const cells = table.querySelectorAll(`td:nth-child(${columnIndex + 1})`);
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const movement = e.clientX - startX;
      const newWidth = Math.max(150, Math.min(500, startWidth + movement));
      
      // Update header width
      header.style.width = `${newWidth}px`;
      header.style.minWidth = `${newWidth}px`;
      header.style.borderRight = '2px solid rgb(6, 182, 212)';

      // Update all cells in this column
      cells.forEach(cell => {
        cell.style.width = `${newWidth}px`;
        cell.style.minWidth = `${newWidth}px`;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // Reset border
      header.style.borderRight = '';

      // Get final width and update state
      const finalWidth = parseInt(header.style.width);
      onResize(field, finalWidth);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <Table.HeadCell 
      ref={headerRef}
      className={`!p-3 cursor-pointer group bg-gray-50/80 relative select-none ${className}`}
      onClick={() => onSort(field)}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
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
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-cyan-500/20 transition-colors duration-200"
          onMouseDown={handleResizeStart}
          onClick={(e) => e.stopPropagation()}
        />
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