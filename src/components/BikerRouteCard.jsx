function BikerRouteCard({ route }) {
  return (
    <article className="biker-route-card">
      <div className="route-card-header">
        <div>
          <p className="ride-city">{route.city}</p>
          <h2>{route.title}</h2>
        </div>

        <span className="route-difficulty">{route.difficulty}</span>
      </div>

      <p className="route-description">{route.description}</p>

      <div className="route-info-grid">
        <div>
          <span>Route</span>
          <strong>{route.route}</strong>
        </div>

        <div>
          <span>Distance</span>
          <strong>{route.distance}</strong>
        </div>

        <div>
          <span>Road type</span>
          <strong>{route.roadType}</strong>
        </div>

        <div>
          <span>Best time</span>
          <strong>{route.bestTime}</strong>
        </div>

        <div>
          <span>Recommended pace</span>
          <strong>{route.recommendedPace}</strong>
        </div>
      </div>

      <div className="ride-tags">
        {route.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
    </article>
  );
}

export default BikerRouteCard;