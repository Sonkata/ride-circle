import { useState } from "react";

import { riders } from "../data/riders";
import RiderList from "../components/RiderList";
import SearchBox from "../components/SearchBox";
import FilterButtons from "../components/FilterButtons";
import useLocalStorage from "../hooks/useLocalStorage";

function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBikeType, setActiveBikeType] = useState("All");
  const [activeConnectionMode, setActiveConnectionMode] = useState("All");
  const [savedRiderIds, setSavedRiderIds] = useLocalStorage("savedRiderIds", []);

  const bikeTypeFilters = ["All", "Sport", "Naked", "Supersport"];
  const connectionFilters = [
    "All",
    "Friends only",
    "Group rides",
    "Maybe dating"
  ];

  const filteredRiders = riders.filter((rider) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      rider.name.toLowerCase().includes(searchText) ||
      rider.city.toLowerCase().includes(searchText) ||
      rider.bike.toLowerCase().includes(searchText);

    const matchesBikeType =
      activeBikeType === "All" || rider.bikeType === activeBikeType;

    const matchesConnectionMode =
      activeConnectionMode === "All" ||
      rider.connectionMode === activeConnectionMode;

    return matchesSearch && matchesBikeType && matchesConnectionMode;
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
    setActiveBikeType("All");
    setActiveConnectionMode("All");
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    activeBikeType !== "All" ||
    activeConnectionMode !== "All";

  return (
    <section className="page-section discover-page">
      <div className="section-header">
        <p className="eyebrow">Discover</p>
        <h1>Find biker friends near you.</h1>

        <p className="page-text">
          Search for riders by city, bike type, riding style, and connection
          mode. Dating is optional, not the main focus.
        </p>
      </div>

      <div className="ride-controls">
        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="filters-panel">
          <div className="filter-group">
            <p>Bike type</p>

            <FilterButtons
              filters={bikeTypeFilters}
              activeFilter={activeBikeType}
              onFilterChange={setActiveBikeType}
            />
          </div>

          <div className="filter-group">
            <p>Connection mode</p>

            <FilterButtons
              filters={connectionFilters}
              activeFilter={activeConnectionMode}
              onFilterChange={setActiveConnectionMode}
            />
          </div>
        </div>
      </div>

      <div className="results-row">
        <p>
          Showing <strong>{filteredRiders.length}</strong> rider
          {filteredRiders.length !== 1 ? "s" : ""} ·{" "}
          <strong>{savedRiderIds.length}</strong> saved
        </p>

        {hasActiveFilters && (
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
          <p>Try another city, bike model, or connection mode.</p>
          <button onClick={handleClearFilters}>Reset search</button>
        </div>
      )}
    </section>
  );
}

export default Discover;