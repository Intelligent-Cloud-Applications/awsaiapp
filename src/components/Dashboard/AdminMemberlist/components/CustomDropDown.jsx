import React, { useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CustomDropDown = ({ 
  label,
  disabled,
  options,
  onSelect,
  selectedValue,
  isLoading
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState('bottom');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Check if there's more space below or above
      if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[100px]" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full flex items-center justify-between gap-1 px-2 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="truncate">{label}</span>
        {isLoading ? (
          <span>...</span>
        ) : (
          <FiChevronDown
            className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            width: '120px',
            left: Math.max(10, containerRef.current?.getBoundingClientRect().left || 0) + 'px',
            [dropdownPosition === 'top' ? 'bottom' : 'top']: 
              dropdownPosition === 'top' 
                ? `${window.innerHeight - (containerRef.current?.getBoundingClientRect().top || 0) + 4}px`
                : `${(containerRef.current?.getBoundingClientRect().bottom || 0) + 4}px`,
          }}
          className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[60]"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`w-full flex items-center px-2.5 py-1.5 text-sm ${
                  option.value === selectedValue
                    ? 'bg-cyan-50 text-cyan-700'
                    : `${option.color || 'text-gray-700'} hover:bg-gray-50`
                } transition-colors duration-150`}
              >
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropDown; 