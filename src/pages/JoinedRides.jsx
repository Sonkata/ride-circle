import { Link } from "react-router-dom";

import { rides as defaultRides } from "../data/rides";
import RideList from "../components/RideList";
import useLocalStorage from "../hooks/useLocalStorage";

function JoinedRides() {
  const [createdRides, setCreatedRides] = useLocalStorage("createdRides", []);
  const [joinedRideIds, setJoinedRideIds] = useLocalStorage("joinedRideIds", []);

  const allRides = [...createdRides, ...defaultRides];

  const joinedRides = allRides.filter((ride) => {
    return joinedRideIds.includes(ride.id);
  });

  function handleToggleJoin(rideId) {
    setJoinedRideIds((currentIds) => {
      if (currentIds.includes(rideId)) {
        return currentIds.filter((id) => id !== rideId);
      }

      return [...currentIds, rideId];
    });
  }

  function handleDeleteRide(rideId) {
    setCreatedRides((currentRides) => {
      return currentRides.filter((ride) => ride.id !== rideId);
    });

    setJoinedRideIds((currentIds) => {
      return currentIds.filter((id) => id !== rideId);
    });
  }

  function handleClearJoined() {
    setJoinedRideIds([]);
  }

  return (
    <section className="page-section joined-rides-page">
      <div className="section-header">
        <p className="eyebrow">Joined rides</p>
        <h1>Your upcoming rides.</h1>

        <p className="page-text">
          These are the rides you joined. You can leave a ride anytime or open
          the ride details page.
        </p>
      </div>

      <div className="results-row">
        <p>
          You joined <strong>{joinedRides.length}</strong> ride
          {joinedRides.length !== 1 ? "s" : ""}
        </p>

        {joinedRides.length > 0 && (
          <button onClick={handleClearJoined}>Clear joined</button>
        )}
      </div>

      {joinedRides.length > 0 ? (
        <RideList
          rides={joinedRides}
          joinedRideIds={joinedRideIds}
          onToggleJoin={handleToggleJoin}
          onDeleteRide={handleDeleteRide}
        />
      ) : (
        <div className="empty-state">
          <h2>No joined rides yet.</h2>
          <p>
            Go to the Rides page and join a ride that matches your pace and
            city.
          </p>

          <Link to="/rides" className="btn primary-btn">
            Browse Rides
          </Link>
        </div>
      )}
    </section>
  );
}

export default JoinedRides;