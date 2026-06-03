import { Link } from "react-router-dom";

function RiderCard({ rider, isSaved = false, onToggleSave }) {
  function handleSaveClick() {
    if (onToggleSave) {
      onToggleSave(rider.id);
    }
  }

  return (
    <article className="rider-card">
      <div className="rider-card-top">
        <div className="rider-avatar">{rider.avatar}</div>

        <div>
          <h2>{rider.name}</h2>
          <p>{rider.city}</p>
        </div>
      </div>

      <div className="rider-bike">
        <span className="bike-label">Bike</span>
        <strong>{rider.bike}</strong>
      </div>

      <div className="rider-details">
        <span>{rider.bikeType}</span>
        <span>{rider.experience}</span>
        <span>{rider.ridingStyle}</span>
      </div>

      <div className="looking-for">
        <p>Looking for:</p>

        <div className="tag-list">
          {rider.lookingFor.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="rider-card-footer">
        <span>Available: {rider.available}</span>

        <div className="card-actions">
          {onToggleSave && (
            <button
              type="button"
              className={isSaved ? "saved-btn" : ""}
              onClick={handleSaveClick}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
          )}

          <Link to={`/riders/${rider.id}`}>View Profile</Link>
        </div>
      </div>
    </article>
  );
}

export default RiderCard;