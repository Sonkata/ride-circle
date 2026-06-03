import { Link } from "react-router-dom";

function About() {
  return (
    <section className="page-section about-page">
      <div className="section-header">
        <p className="eyebrow">About</p>
        <h1>Community first. Dating second.</h1>

        <p className="page-text">
          RideCircle is not built as a normal dating app. It is made for bikers
          who want real rides, real groups, and real connections.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <span>🏍️</span>
          <h2>Riding compatibility</h2>
          <p>
            Riders connect by city, bike type, experience level, riding pace,
            availability, and ride interests.
          </p>
        </div>

        <div className="about-card">
          <span>🛣️</span>
          <h2>Ride-based social app</h2>
          <p>
            The main action is not swiping. The main action is joining rides,
            creating routes, and meeting people on the road.
          </p>
        </div>

        <div className="about-card">
          <span>🔥</span>
          <h2>Optional dating mode</h2>
          <p>
            Dating can exist naturally, but only as an optional connection type.
            The app should never feel like a desperate dating platform.
          </p>
        </div>
      </div>

      <div className="about-highlight">
        <p className="eyebrow">App positioning</p>

        <h2>Find your next ride, not just your next match.</h2>

        <p>
          The strongest idea behind RideCircle is that biker connections feel
          more natural when they start from shared roads, group rides, and
          similar riding energy.
        </p>

        <div className="hero-actions">
          <Link to="/discover" className="btn primary-btn">
            Discover Riders
          </Link>

          <Link to="/rides" className="btn secondary-btn">
            View Rides
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;