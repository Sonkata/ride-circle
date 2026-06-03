import { useEffect, useState } from "react";

import { rides as defaultRides } from "../data/rides";
import RideList from "../components/RideList";
import SearchBox from "../components/SearchBox";
import FilterButtons from "../components/FilterButtons";

function getStoredCreatedRides() {
  const savedRides = localStorage.getItem("createdRides");

  if (savedRides) {
    return JSON.parse(savedRides);
  }

  return [];
}

function getStoredJoinedRideIds() {
  const savedIds = localStorage.getItem("joinedRideIds");

  if (savedIds) {
    return JSON.parse(savedIds);
  }

  return [];
}

function Rides() {
  const [createdRides] = useState(getStoredCreatedRides);
  const [joinedRideIds, setJoinedRideIds] = useState(getStoredJoinedRideIds);

  const [searchTerm, setSearchTerm] = useState("");
  const [activePace, setActivePace] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const paceFilters = ["All", "Very chill", "Chill", "Normal", "Medium / Fast", "Fast"];

  const difficultyFilters = [
    "All",
    "Beginner",
    "Beginner friendly",
    "Easy",
    "Intermediate",
    "Advanced"
  ];

  const allRides = [...createdRides, ...defaultRides];

  const filteredRides = allRides.filter((ride) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      ride.title.toLowerCase().includes(searchText) ||
      ride.city.toLowerCase().includes(searchText) ||
      ride.route.toLowerCase().includes(searchText) ||
      ride.meetingPoint.toLowerCase().includes(searchText);

    const matchesPace = activePace === "All" || ride.pace === activePace;

    const matchesDifficulty =
      activeDifficulty === "All" || ride.difficulty === activeDifficulty;

    return matchesSearch && matchesPace && matchesDifficulty;
  });

  useEffect(() => {
    localStorage.setItem("joinedRideIds", JSON.stringify(joinedRideIds));
  }, [joinedRideIds]);

  function handleToggleJoin(rideId) {
    setJoinedRideIds((currentIds) => {
      if (currentIds.includes(rideId)) {
        return currentIds.filter((id) => id !== rideId);
      }

      return [...currentIds, rideId];
    });
  }

  function handleClearFilters() {
    setSearchTerm("");
    setActivePace("All");
    setActiveDifficulty("All");
  }

  const hasActiveFilters =
    searchTerm !== "" || activePace !== "All" || activeDifficulty !== "All";

  return (
    <section className="page-section rides-page">
      <div className="section-header">
        <p className="eyebrow">Rides</p>
        <h1>Join upcoming rides.</h1>

        <p className="page-text">
          Browse local rides, meeting points, ride pace, and groups you can
          join. Find people who ride like you, not just people near you.
        </p>
      </div>

      <div className="ride-controls">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="filters-panel">
          <div className="filter-group">
            <p>Pace</p>
            <FilterButtons
              filters={paceFilters}
              activeFilter={activePace}
              onFilterChange={setActivePace}
            />
          </div>

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
          Showing <strong>{filteredRides.length}</strong> ride
          {filteredRides.length !== 1 ? "s" : ""}
        </p>

        {hasActiveFilters && (
          <button onClick={handleClearFilters}>Clear filters</button>
        )}
      </div>

      {filteredRides.length > 0 ? (
        <RideList
          rides={filteredRides}
          joinedRideIds={joinedRideIds}
          onToggleJoin={handleToggleJoin}
        />
      ) : (
        <div className="empty-state">
          <h2>No rides found.</h2>
          <p>Try another city, route, pace, or difficulty.</p>
          <button onClick={handleClearFilters}>Reset filters</button>
        </div>
      )}
    </section>
  );
}

export default Rides;