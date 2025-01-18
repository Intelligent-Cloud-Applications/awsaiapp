import React from 'react';
import PropTypes from 'prop-types';
import { FiUsers, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import { STATS_CONFIG } from '../constants/tableConstants';

const IconMap = {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiTrendingUp
};

const StatsGrid = ({ stats, onStatClick, activeSort }) => {
  const renderIcon = (iconName) => {
    const Icon = IconMap[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS_CONFIG.map((config, index) => {
        const statValue = stats[config.id] || 0;
        
        return (
          <div
            key={config.id}
            onClick={() => onStatClick(config.sortConfig, index)}
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer ${
              activeSort === index ? 'ring-1 ring-cyan-500 shadow-md' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{config.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{statValue}</h3>
              </div>
              <div className={`p-2 bg-gray-50 rounded-lg ${config.iconColor}`}>
                {renderIcon(config.icon)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

StatsGrid.propTypes = {
  stats: PropTypes.shape({
    total_members: PropTypes.number,
    active_members: PropTypes.number,
    inactive_members: PropTypes.number,
    total_delivered: PropTypes.number
  }).isRequired,
  onStatClick: PropTypes.func.isRequired,
  activeSort: PropTypes.number
};

export default StatsGrid; 