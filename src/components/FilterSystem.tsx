import React from 'react';

export interface Filter {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  color?: string;
}

interface FilterSystemProps {
  filters: Filter[];
  activeFilters: string[];
  onToggleFilter: (filterId: string) => void;
}

const FilterSystem: React.FC<FilterSystemProps> = ({ 
  filters, 
  activeFilters, 
  onToggleFilter 
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onToggleFilter(filter.id)}
          className={`filter-pill ${activeFilters.includes(filter.id) ? 'active' : ''} shrink-0 animate-spring`}
          style={{
            '--tw-shadow-colored': filter.color ? `0 4px 20px ${filter.color}20` : undefined,
          } as React.CSSProperties}
        >
          <span className="text-lg">{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterSystem;