import { useState, useCallback, useMemo, useEffect } from 'react';
import { COLUMN_WIDTHS, ITEMS_PER_PAGE } from '../constants/tableConstants';

export const useTableManagement = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('userName');
  const [sortField, setSortField] = useState('joiningDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [columnWidths, setColumnWidths] = useState(COLUMN_WIDTHS);
  const [activeSort, setActiveSort] = useState(null);

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

  // Handle column resize
  const startResizing = useCallback((field, newWidth) => {
    setColumnWidths(prev => ({
      ...prev,
      [field]: newWidth
    }));
  }, []);

  // Handle stat click
  const handleStatClick = useCallback((sortConfig, index) => {
    if (sortConfig) {
      setSortField(sortConfig.field);
      setSortDirection(sortConfig.direction);
      setActiveSort(index);
    }
  }, []);

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
    activeSort,
    totalPages,
    currentData,
    filteredAndSortedData,
    setCurrentPage,
    handleSort,
    handleSearch,
    handleSearchFieldChange,
    handleStatClick,
    startResizing,
    setData
  };
};