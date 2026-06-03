import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmModal from "../components/ConfirmModal";
import { rides as defaultRides } from "../data/rides";
import useLocalStorage from "../hooks/useLocalStorage";

function RideDetails() {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [createdRides, setCreatedRides] = useLocalStorage("createdRides", []);
  const [joinedRideIds, setJoinedRideIds] = useLocalStorage("joinedRideIds", []);

  const allRides = [...createdRides, ...defaultRides];
  const ride = allRides.find((ride) => ride.id === Number(rideId));

  if (!ride) {
    return (
      <section className="page-section">
        <p className="eyebrow">Ride not found</p>
        <h1>This ride does not exist.</h1>

        <p className="page-text">
          The ride you are looking for may have been deleted or the link is
          wrong.
        </p>

        <Link to="/rides" className="btn primary-btn">
          Back to Rides
        </Link>
      </section>
    );
  }

  const isJoined = joinedRideIds.includes(ride.id);
  const joinedCount = isJoined ? ride.joinedRiders + 1 : ride.joinedRiders;
  const spotsLeft = Math.max(ride.maxRiders - joinedCount, 0);
  const isFull = spotsLeft === 0 && !isJoined;

  function handleToggleJoin() {
    setJoinedRideIds((currentIds) => {
      if (currentIds.includes(ride.id)) {
        return currentIds.filter((id) => id !== ride.id);
      }

      return [...currentIds, ride.id];
    });
  }

  function handleDeleteRide() {
    setCreatedRides((currentRides) => {
      return currentRides.filter((currentRide) => currentRide.id !== ride.id);
    });

    setJoinedRideIds((currentIds) => {
      return currentIds.filter((id) => id !== ride.id);
    });

    setIsConfirmOpen(false);
    navigate("/rides");
  }

  return (
    <>
      <section className="page-section ride-details-page">
        <Link to="/rides" className="back-link">
          ← Back to Rides
        </Link>

        <div className="ride-details-layout">
          <div className="ride-details-main">
            <p className="eyebrow">{ride.city}</p>
            <h1>{ride.title}</h1>

            {ride.isUserCreated && (
              <span className="created-tag">Created by you</span>
            )}

            <p className="page-text">{ride.description}</p>

            <div className="ride-details-grid">
              <div>
                <span>Route</span>
                <strong>{ride.route}</strong>
              </div>

              <div>
                <span>Meeting point</span>
                <strong>{ride.meetingPoint}</strong>
              </div>

              <div>
                <span>Date / time</span>
                <strong>{ride.date}</strong>
              </div>

              <div>
                <span>Pace</span>
                <strong>{ride.pace}</strong>
              </div>

              <div>
                <span>Difficulty</span>
                <strong>{ride.difficulty}</strong>
              </div>

              <div>
                <span>Riders</span>
                <strong>
                  {joinedCount}/{ride.maxRiders} joined
                </strong>
              </div>
            </div>

            <div className="profile-section">
              <h3>Allowed bike types</h3>

              <div className="tag-list">
                {ride.bikeTypes.map((type) => (
                  <span key={type}>{type}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="ride-details-side">
            <h2>Ride status</h2>

            <div className="ride-status-number">
              <span>{spotsLeft}</span>
              <p>spots left</p>
            </div>

            <button
              className={isJoined ? "btn secondary-btn" : "btn primary-btn"}
              disabled={isFull}
              onClick={handleToggleJoin}
            >
              {isJoined ? "Leave Ride" : isFull ? "Ride Full" : "Join Ride"}
            </button>

            <Link to="/joined-rides" className="btn secondary-btn">
              My Joined Rides
            </Link>

            {ride.isUserCreated && (
              <>
                <Link to={`/edit-ride/${ride.id}`} className="btn secondary-btn">
                  Edit Ride
                </Link>

                <button
                  className="btn delete-details-btn"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Delete Ride
                </button>
              </>
            )}
          </aside>
        </div>
      </section>

      {isConfirmOpen && (
        <ConfirmModal
          title="Delete ride?"
          message={`Are you sure you want to delete "${ride.title}"? This cannot be undone.`}
          confirmText="Delete ride"
          cancelText="Cancel"
          onConfirm={handleDeleteRide}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  );
}

export default RideDetails;