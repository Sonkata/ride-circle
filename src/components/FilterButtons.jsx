function FilterButtons({ filters = [], activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;