import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'flowbite-react';
import { FiSearch, FiX, FiChevronDown, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { SEARCH_FIELDS } from '../constants/tableConstants';

const IconMap = {
  userName: FiUser,
  emailId: FiMail,
  phoneNumber: FiPhone
};

const SearchAndFilter = ({ searchQuery, onSearchChange, searchField, onSearchFieldChange }) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle field selection
  const handleFieldSelect = (field) => {
    onSearchFieldChange(field);
    setIsDropdownOpen(false);
    searchInputRef.current?.focus();
  };

  // Handle search clear
  const handleClearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus();
  };

  // Get current field label and icon
  const currentField = SEARCH_FIELDS.find(f => f.value === searchField);
  const CurrentIcon = IconMap[searchField] || FiSearch;

  return (
    <div className="relative flex items-center gap-2">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CurrentIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <TextInput
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="!pl-10 !pr-10"
          placeholder={`Search by ${currentField?.label.toLowerCase() || 'name'}`}
          theme={{
            field: {
              input: {
                base: "block w-full text-sm border-gray-200 rounded-lg bg-white focus:border-cyan-500 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                sizes: {
                  md: "p-2.5"
                }
              }
            }
          }}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors duration-150" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-150"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center gap-2">
            <CurrentIcon className="h-4 w-4 text-gray-400" />
            <span>{currentField?.label || 'Filter'}</span>
          </div>
          <FiChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          >
            <div className="py-1">
              {SEARCH_FIELDS.map(({ value, label }) => {
                const Icon = IconMap[value] || FiSearch;
                const isSelected = searchField === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleFieldSelect(value)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                      isSelected
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    } transition-colors duration-150`}
                  >
                    <Icon 
                      className={`h-4 w-4 ${
                        isSelected ? 'text-cyan-500' : 'text-gray-400'
                      }`} 
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SearchAndFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  onSearchFieldChange: PropTypes.func.isRequired
};

export default SearchAndFilter;