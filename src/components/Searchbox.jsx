function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search by name, city or bike..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBox;