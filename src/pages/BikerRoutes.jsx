import { useState } from "react";

import { bikerRoutes } from "../data/routes";
import SearchBox from "../components/SearchBox";
import FilterButtons from "../components/FilterButtons";
import BikerRouteList from "../components/BikerRouteList";

function BikerRoutes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const difficultyFilters = [
    "All",
    "Beginner",
    "Easy",
    "Intermediate",
    "Advanced"
  ];

  const filteredRoutes = bikerRoutes.filter((route) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      route.title.toLowerCase().includes(searchText) ||
      route.city.toLowerCase().includes(searchText) ||
      route.route.toLowerCase().includes(searchText) ||
      route.roadType.toLowerCase().includes(searchText);

    const matchesDifficulty =
      activeDifficulty === "All" || route.difficulty === activeDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  function handleClearFilters() {
    setSearchTerm("");
    setActiveDifficulty("All");
  }

  const hasActiveFilters = searchTerm !== "" || activeDifficulty !== "All";

  return (
    <section className="page-section biker-routes-page">
      <div className="section-header">
        <p className="eyebrow">Routes</p>
        <h1>Find roads worth riding.</h1>

        <p className="page-text">
          Browse route ideas by city, difficulty, road type, distance, and
          recommended pace.
        </p>
      </div>

      <div className="ride-controls">
        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="filters-panel">
          <div className="filter-group">
            <p>Difficulty</p>

            <FilterButtons
              filters={difficultyFilters}
              activeFilter={activeDifficulty}
              onFilterChange={setActiveDifficulty}
            />
          </div>
        </div>
      </div>

      <div className="results-row">
        <p>
          Showing <strong>{filteredRoutes.length}</strong> route
          {filteredRoutes.length !== 1 ? "s" : ""}
        </p>

        {hasActiveFilters && (
          <button onClick={handleClearFilters}>Clear filters</button>
        )}
      </div>

      {filteredRoutes.length > 0 ? (
        <BikerRouteList routes={filteredRoutes} />
      ) : (
        <div className="empty-state">
          <h2>No routes found.</h2>
          <p>Try another city, route, or difficulty.</p>
          <button onClick={handleClearFilters}>Reset filters</button>
        </div>
      )}
    </section>
  );
}

export default BikerRoutes;