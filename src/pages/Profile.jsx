import { Link } from "react-router-dom";

import { riders } from "../data/riders";
import { rides as defaultRides } from "../data/rides";
import useLocalStorage from "../hooks/useLocalStorage";

function Profile() {
  const [savedRiderIds] = useLocalStorage("savedRiderIds", []);
  const [joinedRideIds] = useLocalStorage("joinedRideIds", []);
  const [createdRides] = useLocalStorage("createdRides", []);

  const profile = {
    name: "Soner",
    city: "Pleven",
    bike: "Honda CBR 125R",
    bikeType: "Sport",
    experience: "Beginner",
    ridingStyle: "Chill / Normal",
    available: "Weekends",
    avatar: "🏍️",
    lookingFor: ["Riding friends", "Group rides", "Maybe dating"],
    bio:
      "New rider building confidence, looking for chill rides, biker friends, and people who actually enjoy the road."
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
          </div>
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
          </div>

          <div className="profile-section">
            <h3>Looking for</h3>

            <div className="tag-list">
              {profile.lookingFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/create-ride" className="btn primary-btn">
              Create Ride
            </Link>

            <Link to="/discover" className="btn secondary-btn">
              Discover Riders
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
              <span key={ride.id}>
                {ride.title} · {ride.city}
              </span>
            ))
          ) : (
            <p>No joined rides yet.</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3>Created rides</h3>

          {createdRides.length > 0 ? (
            createdRides.slice(0, 3).map((ride) => (
              <span key={ride.id}>
                {ride.title} · {ride.city}
              </span>
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