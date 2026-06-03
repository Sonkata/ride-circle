import { useState } from "react";

import { riders } from "../data/riders";
import RiderList from "../components/RiderList";
import SearchBox from "../components/SearchBox";
import FilterButtons from "../components/FilterButtons";
import useLocalStorage from "../hooks/useLocalStorage";

function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedRiderIds, setSavedRiderIds] = useLocalStorage("savedRiderIds", []);

  const bikeTypeFilters = ["All", "Sport", "Naked", "Supersport"];

  const filteredRiders = riders.filter((rider) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      rider.name.toLowerCase().includes(searchText) ||
      rider.city.toLowerCase().includes(searchText) ||
      rider.bike.toLowerCase().includes(searchText);

    const matchesFilter =
      activeFilter === "All" || rider.bikeType === activeFilter;

    return matchesSearch && matchesFilter;
  });

  function handleToggleSave(riderId) {
    setSavedRiderIds((currentIds) => {
      if (currentIds.includes(riderId)) {
        return currentIds.filter((id) => id !== riderId);
      }

      return [...currentIds, riderId];
    });
  }

  function handleClearFilters() {
    setSearchTerm("");
    setActiveFilter("All");
  }

  return (
    <section className="page-section discover-page">
      <div className="section-header">
        <p className="eyebrow">Discover</p>
        <h1>Find biker friends near you.</h1>

        <p className="page-text">
          Search for riders by city, bike type, riding style, and what kind of
          connection they are looking for.
        </p>
      </div>

      <div className="discover-controls">
        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <FilterButtons
          filters={bikeTypeFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="results-row">
        <p>
          Showing <strong>{filteredRiders.length}</strong> rider
          {filteredRiders.length !== 1 ? "s" : ""} ·{" "}
          <strong>{savedRiderIds.length}</strong> saved
        </p>

        {(searchTerm !== "" || activeFilter !== "All") && (
          <button onClick={handleClearFilters}>Clear filters</button>
        )}
      </div>

      {filteredRiders.length > 0 ? (
        <RiderList
          riders={filteredRiders}
          savedRiderIds={savedRiderIds}
          onToggleSave={handleToggleSave}
        />
      ) : (
        <div className="empty-state">
          <h2>No riders found.</h2>
          <p>Try another city, bike model, or filter.</p>
          <button onClick={handleClearFilters}>Reset search</button>
        </div>
      )}
    </section>
  );
}

export default Discover;