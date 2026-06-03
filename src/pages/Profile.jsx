import { Link } from "react-router-dom";

import { riders } from "../data/riders";
import { rides as defaultRides } from "../data/rides";
import { defaultProfile } from "../data/defaultProfile";
import useLocalStorage from "../hooks/useLocalStorage";

function Profile() {
  const [savedRiderIds] = useLocalStorage("savedRiderIds", []);
  const [joinedRideIds] = useLocalStorage("joinedRideIds", []);
  const [createdRides] = useLocalStorage("createdRides", []);
  const [storedProfile] = useLocalStorage("userProfile", defaultProfile);

  const profile = {
    ...defaultProfile,
    ...storedProfile,
    garage:
      storedProfile.garage && storedProfile.garage.length > 0
        ? storedProfile.garage
        : defaultProfile.garage
  };

  const allRides = [...createdRides, ...defaultRides];

  const savedRiders = riders.filter((rider) => savedRiderIds.includes(rider.id));
  const joinedRides = allRides.filter((ride) => joinedRideIds.includes(ride.id));

  return (
    <section className="page-section profile-page">
      <div className="section-header">
        <p className="eyebrow">My profile</p>
        <h1>Your biker identity.</h1>

        <p className="page-text">
          This is how other riders would see your profile inside RideCircle.
        </p>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <span>{savedRiders.length}</span>
          <p>Saved riders</p>
        </div>

        <div className="profile-stat-card">
          <span>{joinedRides.length}</span>
          <p>Joined rides</p>
        </div>

        <div className="profile-stat-card">
          <span>{createdRides.length}</span>
          <p>Created rides</p>
        </div>
      </div>

      <div className="rider-details-layout">
        <div className="rider-profile-card">
          <div className="rider-profile-avatar">{profile.avatar}</div>

          <h1>{profile.name}</h1>
          <p>{profile.city}</p>

          <div className="profile-status">
            <span>{profile.experience}</span>
            <span>{profile.ridingStyle}</span>
            <span>{profile.connectionMode}</span>
          </div>

          <Link to="/edit-profile" className="btn primary-btn profile-save-btn">
            Edit Profile
          </Link>
        </div>

        <div className="rider-profile-info">
          <p className="eyebrow">Personal profile</p>
          <h2>{profile.name}'s garage</h2>

          <p className="page-text">{profile.bio}</p>

          <div className="profile-info-grid">
            <div>
              <span>Bike</span>
              <strong>{profile.bike}</strong>
            </div>

            <div>
              <span>Bike type</span>
              <strong>{profile.bikeType}</strong>
            </div>

            <div>
              <span>City</span>
              <strong>{profile.city}</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>{profile.available}</strong>
            </div>

            <div>
              <span>Connection mode</span>
              <strong>{profile.connectionMode}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{profile.experience}</strong>
            </div>
          </div>

          <div className="profile-section">
            <h3>Looking for</h3>

            <div className="tag-list">
              {profile.lookingFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3>My garage</h3>

            <div className="garage-grid">
              {profile.garage.map((bike) => (
                <div className="garage-card" key={bike.id}>
                  <span>{bike.type}</span>
                  <h4>{bike.name}</h4>
                  <p>{bike.engine}</p>
                  <strong>{bike.role}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/create-ride" className="btn primary-btn">
              Create Ride
            </Link>

            <Link to="/joined-rides" className="btn secondary-btn">
              Joined Rides
            </Link>

            <Link to="/routes" className="btn secondary-btn">
              Explore Routes
            </Link>
          </div>
        </div>
      </div>

      <div className="profile-dashboard">
        <div className="dashboard-card">
          <h3>Saved riders</h3>

          {savedRiders.length > 0 ? (
            savedRiders.slice(0, 3).map((rider) => (
              <Link to={`/riders/${rider.id}`} key={rider.id}>
                {rider.avatar} {rider.name} · {rider.city}
              </Link>
            ))
          ) : (
            <p>No saved riders yet.</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3>Joined rides</h3>

          {joinedRides.length > 0 ? (
            joinedRides.slice(0, 3).map((ride) => (
              <Link to={`/rides/${ride.id}`} key={ride.id}>
                {ride.title} · {ride.city}
              </Link>
            ))
          ) : (
            <p>No joined rides yet.</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3>Created rides</h3>

          {createdRides.length > 0 ? (
            createdRides.slice(0, 3).map((ride) => (
              <Link to={`/rides/${ride.id}`} key={ride.id}>
                {ride.title} · {ride.city}
              </Link>
            ))
          ) : (
            <p>No created rides yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;