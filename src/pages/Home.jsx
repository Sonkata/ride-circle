import { Link } from "react-router-dom";
import { riders } from "../data/riders";
import { rides } from "../data/rides";

function Home() {
  const featuredRiders = riders.slice(0, 3);
  const featuredRides = rides.slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Biker community app</p>

          <h1>Find riders who match your road.</h1>

          <p className="hero-text">
            RideCircle helps bikers find riding buddies, local group rides,
            events, and real connections. Dating is optional. The ride comes
            first.
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

        <div className="hero-card">
          <span className="status-dot"></span>
          <h2>Weekend Ride</h2>
          <p>Pleven → Kaylaka → Short mountain route</p>

          <div className="ride-info">
            <span>Chill pace</span>
            <span>5 riders joined</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="eyebrow">How it works</p>
          <h2>Community first. Dating optional.</h2>

          <p className="page-text">
            RideCircle is built around riding compatibility, not just profile
            photos. Find people by bike type, city, pace, experience, and ride
            plans.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <span>01</span>
            <h3>Discover riders</h3>
            <p>
              Search bikers by city, bike, riding style, and what kind of
              connection they want.
            </p>
          </div>

          <div className="feature-card">
            <span>02</span>
            <h3>Join rides</h3>
            <p>
              Find upcoming rides with meeting points, pace, difficulty, and
              open rider spots.
            </p>
          </div>

          <div className="feature-card">
            <span>03</span>
            <h3>Save connections</h3>
            <p>
              Save riders that match your road vibe and come back to them later.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section darker-section">
        <div className="section-header">
          <p className="eyebrow">Featured riders</p>
          <h2>People you could ride with.</h2>
        </div>

        <div className="mini-card-grid">
          {featuredRiders.map((rider) => (
            <Link
              to={`/riders/${rider.id}`}
              className="mini-profile-card"
              key={rider.id}
            >
              <div className="mini-avatar">{rider.avatar}</div>
              <h3>{rider.name}</h3>
              <p>{rider.city}</p>
              <span>{rider.bike}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="eyebrow">Upcoming rides</p>
          <h2>Start with the road.</h2>
        </div>

        <div className="home-ride-grid">
          {featuredRides.map((ride) => (
            <div className="home-ride-card" key={ride.id}>
              <p>{ride.city}</p>
              <h3>{ride.title}</h3>
              <span>{ride.route}</span>
              <strong>{ride.pace}</strong>
            </div>
          ))}
        </div>

        <div className="home-center-action">
          <Link to="/rides" className="btn primary-btn">
            View All Rides
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;