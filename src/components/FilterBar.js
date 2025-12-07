import React from 'react';
import './FilterBar.css';

function FilterBar({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Category:</label>
        <div className="filter-buttons">
          <button
            className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <label className="filter-label">Sort:</label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="popular">Most Popular</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;

