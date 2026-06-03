import { Link, useParams } from "react-router-dom";
import { riders } from "../data/riders";
import useLocalStorage from "../hooks/useLocalStorage";

function RiderDetails() {
  const { riderId } = useParams();
  const [savedRiderIds, setSavedRiderIds] = useLocalStorage("savedRiderIds", []);

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
          </div>

          <button
            type="button"
            className={isSaved ? "btn secondary-btn profile-save-btn" : "btn primary-btn profile-save-btn"}
            onClick={handleToggleSave}
          >
            {isSaved ? "Saved Rider" : "Save Rider"}
          </button>
        </div>

        <div className="rider-profile-info">
          <p className="eyebrow">Rider profile</p>
          <h2>{rider.name}'s road vibe</h2>

          <p className="page-text">
            {rider.name} rides a {rider.bike} and is looking for biker
            connections based on real rides, similar pace, and shared routes.
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
          </div>

          <div className="profile-section">
            <h3>Looking for</h3>

            <div className="tag-list">
              {rider.lookingFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3>Compatibility idea</h3>

            <p className="profile-note">
              RideCircle is not matching people only by photos. This profile is
              focused on bike type, pace, experience, city, availability, and
              what kind of connection the rider wants.
            </p>
          </div>

          <div className="profile-actions">
            <Link to="/create-ride" className="btn primary-btn">
              Invite to Ride
            </Link>

            <button className="btn secondary-btn">Send Message</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiderDetails;