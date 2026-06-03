function RideCard({ ride, isJoined, onToggleJoin }) {
  const joinedCount = isJoined ? ride.joinedRiders + 1 : ride.joinedRiders;
  const spotsLeft = Math.max(ride.maxRiders - joinedCount, 0);
  const isFull = spotsLeft === 0 && !isJoined;

  return (
    <article className="ride-card">
      <div className="ride-card-header">
        <div>
          <p className="ride-city">{ride.city}</p>
          <h2>{ride.title}</h2>

          {ride.isUserCreated && (
            <span className="created-tag">Created by you</span>
          )}
        </div>

        <span className="ride-pace">{ride.pace}</span>
      </div>

      <p className="ride-description">{ride.description}</p>

      <div className="ride-info-grid">
        <div>
          <span>Route</span>
          <strong>{ride.route}</strong>
        </div>

        <div>
          <span>Meeting point</span>
          <strong>{ride.meetingPoint}</strong>
        </div>

        <div>
          <span>Date</span>
          <strong>{ride.date}</strong>
        </div>

        <div>
          <span>Difficulty</span>
          <strong>{ride.difficulty}</strong>
        </div>
      </div>

      <div className="ride-tags">
        {ride.bikeTypes.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>

      <div className="ride-card-footer">
        <p>
          {joinedCount}/{ride.maxRiders} riders joined · {spotsLeft} spots left
        </p>

        <button
          className={isJoined ? "joined-btn" : ""}
          disabled={isFull}
          onClick={() => onToggleJoin(ride.id)}
        >
          {isJoined ? "Joined" : isFull ? "Full" : "Join Ride"}
        </button>
      </div>
    </article>
  );
}

export default RideCard;