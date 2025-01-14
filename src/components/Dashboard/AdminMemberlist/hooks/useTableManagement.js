import { useState, useCallback, useMemo, useEffect } from 'react';
import { COLUMN_WIDTHS, ITEMS_PER_PAGE } from '../constants/tableConstants';

// Column constraints for resizing
const constraints = {
  userName: { min: 180, max: 400 },    // Name column
  emailId: { min: 180, max: 500 },     // Email column
  phoneNumber: { min: 150, max: 300 }  // Phone number column
};

export const useTableManagement = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('userName');
  const [sortField, setSortField] = useState('joiningDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [columnWidths, setColumnWidths] = useState(COLUMN_WIDTHS);
  const [resizing, setResizing] = useState(null);

  // Column resizing
  const startResizing = useCallback((field, e) => {
    e.stopPropagation();
    const tableContainer = e.currentTarget.closest('.overflow-x-auto');
    if (!tableContainer) return;

    const headerCell = e.currentTarget.closest('th');
    const headerRect = headerCell.getBoundingClientRect();
    const tableRect = tableContainer.getBoundingClientRect();

    // Get all cells for this column (header + body cells)
    const columnIndex = Array.from(headerCell.parentElement.children).indexOf(headerCell);
    const bodyCells = tableContainer.querySelectorAll(`td:nth-child(${columnIndex + 1})`);
    const fixedHeaderCell = tableContainer.querySelector(`th:nth-child(${columnIndex + 1})`);

    // Create resize line
    const resizeLine = document.createElement('div');
    resizeLine.style.position = 'absolute';
    resizeLine.style.top = '0';
    resizeLine.style.width = '2px';
    resizeLine.style.backgroundColor = 'rgba(6, 182, 212, 0.8)';
    resizeLine.style.height = `${tableContainer.scrollHeight}px`;
    resizeLine.style.zIndex = '50';
    resizeLine.style.cursor = 'col-resize';
    resizeLine.style.transition = 'none';
    resizeLine.style.pointerEvents = 'none';

    // Calculate initial positions
    const headerLeft = headerRect.left - tableRect.left;
    const headerRight = headerRect.right - tableRect.left;
    const startX = e.clientX;
    const startWidth = columnWidths[field];
    const minWidth = constraints[field]?.min || 80;
    const maxWidth = constraints[field]?.max || 500;

    // Position the resize line at the right edge of the column
    resizeLine.style.left = `${headerRight}px`;

    // Ensure table container is properly positioned
    tableContainer.style.position = 'relative';
    tableContainer.style.overflow = 'hidden';
    tableContainer.appendChild(resizeLine);

    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    setResizing({
      field,
      startX,
      startWidth,
      headerLeft,
      resizeLine,
      tableContainer,
      bodyCells,
      fixedHeaderCell,
      minWidth,
      maxWidth
    });
  }, [columnWidths]);

  // Handle mouse move during resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizing) return;

      const {
        field,
        startX,
        startWidth,
        headerLeft,
        resizeLine,
        bodyCells,
        fixedHeaderCell,
        minWidth,
        maxWidth
      } = resizing;

      // Calculate the movement and new width
      const movement = e.clientX - startX;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + movement));
      
      // Update resize line position
      if (resizeLine) {
        const newPosition = headerLeft + newWidth;
        resizeLine.style.left = `${newPosition}px`;
      }

      // Update header cell width
      if (fixedHeaderCell) {
        fixedHeaderCell.style.width = `${newWidth}px`;
        fixedHeaderCell.style.minWidth = `${newWidth}px`;
        fixedHeaderCell.style.maxWidth = `${newWidth}px`;
      }

      // Update all body cells in the column
      bodyCells.forEach(cell => {
        cell.style.width = `${newWidth}px`;
        cell.style.minWidth = `${newWidth}px`;
        cell.style.maxWidth = `${newWidth}px`;
      });

      // Update column width state
      setColumnWidths(prev => ({
        ...prev,
        [field]: newWidth
      }));
    };

    const handleMouseUp = () => {
      if (!resizing) return;

      const { resizeLine, tableContainer, bodyCells, fixedHeaderCell, field } = resizing;

      // Ensure final width is applied to header and body cells
      const finalWidth = columnWidths[field];
      
      if (fixedHeaderCell) {
        fixedHeaderCell.style.width = `${finalWidth}px`;
        fixedHeaderCell.style.minWidth = `${finalWidth}px`;
        fixedHeaderCell.style.maxWidth = `${finalWidth}px`;
      }

      bodyCells.forEach(cell => {
        cell.style.width = `${finalWidth}px`;
        cell.style.minWidth = `${finalWidth}px`;
        cell.style.maxWidth = `${finalWidth}px`;
      });

      // Remove resize line with fade out effect
      if (resizeLine && resizeLine.parentNode) {
        resizeLine.style.transition = 'opacity 0.2s ease-out';
        resizeLine.style.opacity = '0';
        setTimeout(() => {
          if (resizeLine.parentNode) {
            resizeLine.parentNode.removeChild(resizeLine);
          }
        }, 200);
      }

      // Reset cursor and text selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      if (tableContainer) {
        tableContainer.style.userSelect = '';
      }

      setResizing(null);
    };

    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (resizing) {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
  }, [resizing, columnWidths]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchField]);

  // Handle search
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  // Handle search field change
  const handleSearchFieldChange = useCallback((field) => {
    setSearchField(field);
  }, []);

  // Handle sorting
  const handleSort = useCallback((field) => {
    setSortDirection((current) => {
      if (sortField === field) {
        return current === 'asc' ? 'desc' : 'asc';
      }
      return 'asc';
    });
    setSortField(field);
  }, [sortField]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        const value = String(item[searchField] || '').toLowerCase();
        return value.includes(query);
      });
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'joiningDate') {
        aVal = new Date(parseInt(aVal)).getTime();
        bVal = new Date(parseInt(bVal)).getTime();
      } else if (['delivered', 'inprogress'].includes(sortField)) {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
      } else {
        aVal = String(aVal || '').toLowerCase();
        bVal = String(bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, searchQuery, searchField, sortField, sortDirection]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);

  // Get current page data
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedData, currentPage]);

  return {
    currentPage,
    searchQuery,
    searchField,
    sortField,
    sortDirection,
    columnWidths,
    totalPages,
    currentData,
    filteredAndSortedData,
    setCurrentPage,
    handleSort,
    handleSearch,
    handleSearchFieldChange,
    startResizing,
    setData
  };
};