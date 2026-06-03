import { Link, useParams } from "react-router-dom";

import { riders } from "../data/riders";
import { defaultProfile } from "../data/defaultProfile";
import { calculateCompatibility } from "../utils/calculateCompatibility";
import useLocalStorage from "../hooks/useLocalStorage";

function RiderDetails() {
  const { riderId } = useParams();

  const [savedRiderIds, setSavedRiderIds] = useLocalStorage("savedRiderIds", []);
  const [storedProfile] = useLocalStorage("userProfile", defaultProfile);

  const profile = {
    ...defaultProfile,
    ...storedProfile
  };

  const rider = riders.find((rider) => rider.id === Number(riderId));

  if (!rider) {
    return (
      <section className="page-section">
        <p className="eyebrow">Rider not found</p>
        <h1>This rider does not exist.</h1>

        <p className="page-text">
          The profile you are looking for may have been removed or the link is
          wrong.
        </p>

        <Link to="/discover" className="btn primary-btn">
          Back to Discover
        </Link>
      </section>
    );
  }

  const isSaved = savedRiderIds.includes(rider.id);
  const compatibility = calculateCompatibility(profile, rider);

  function handleToggleSave() {
    setSavedRiderIds((currentIds) => {
      if (currentIds.includes(rider.id)) {
        return currentIds.filter((id) => id !== rider.id);
      }

      return [...currentIds, rider.id];
    });
  }

  return (
    <section className="page-section rider-details-page">
      <Link to="/discover" className="back-link">
        ← Back to Discover
      </Link>

      <div className="rider-details-layout">
        <div className="rider-profile-card">
          <div className="rider-profile-avatar">{rider.avatar}</div>

          <h1>{rider.name}</h1>
          <p>{rider.city}</p>

          <div className="profile-status">
            <span>{rider.experience}</span>
            <span>{rider.ridingStyle}</span>
            <span>{rider.connectionMode}</span>
          </div>

          <div className="compatibility-mini">
            <span>{compatibility.score}%</span>
            <p>road match</p>
          </div>

          <button
            type="button"
            className={
              isSaved
                ? "btn secondary-btn profile-save-btn"
                : "btn primary-btn profile-save-btn"
            }
            onClick={handleToggleSave}
          >
            {isSaved ? "Saved Rider" : "Save Rider"}
          </button>
        </div>

        <div className="rider-profile-info">
          <p className="eyebrow">Rider profile</p>
          <h2>{rider.name}'s road vibe</h2>

          <p className="page-text">
            {rider.name} rides a {rider.bike}. This profile is based on riding
            compatibility, not just photos.
          </p>

          <div className="profile-info-grid">
            <div>
              <span>Bike</span>
              <strong>{rider.bike}</strong>
            </div>

            <div>
              <span>Bike type</span>
              <strong>{rider.bikeType}</strong>
            </div>

            <div>
              <span>City</span>
              <strong>{rider.city}</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>{rider.available}</strong>
            </div>

            <div>
              <span>Connection mode</span>
              <strong>{rider.connectionMode}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{rider.experience}</strong>
            </div>
          </div>

          <div className="compatibility-card">
            <div className="compatibility-header">
              <div>
                <p className="eyebrow">Compatibility</p>
                <h3>{compatibility.score}% road match</h3>
              </div>

              <span>{compatibility.score >= 60 ? "Strong match" : "Low match"}</span>
            </div>

            <div className="compatibility-list">
              {compatibility.checks.map((check) => (
                <div
                  className={
                    check.passed
                      ? "compatibility-row passed"
                      : "compatibility-row"
                  }
                  key={check.label}
                >
                  <span>{check.passed ? "✓" : "×"}</span>
                  <p>{check.label}</p>
                  <strong>{check.points} pts</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3>Looking for</h3>

            <div className="tag-list">
              {rider.lookingFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/create-ride" className="btn primary-btn">
              Invite to Ride
            </Link>

            <Link to="/messages" className="btn secondary-btn">
              Send Message
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiderDetails;