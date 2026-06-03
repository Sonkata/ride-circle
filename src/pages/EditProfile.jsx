import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { defaultProfile } from "../data/defaultProfile";
import useLocalStorage from "../hooks/useLocalStorage";

function EditProfile() {
  const navigate = useNavigate();

  const [storedProfile, setStoredProfile] = useLocalStorage(
    "userProfile",
    defaultProfile
  );

  const profile = {
    ...defaultProfile,
    ...storedProfile,
    garage:
      storedProfile.garage && storedProfile.garage.length > 0
        ? storedProfile.garage
        : defaultProfile.garage
  };

  const mainBike = profile.garage[0];

  const [formData, setFormData] = useState({
    name: profile.name,
    city: profile.city,
    bike: profile.bike,
    bikeType: profile.bikeType,
    experience: profile.experience,
    ridingStyle: profile.ridingStyle,
    connectionMode: profile.connectionMode,
    available: profile.available,
    bio: profile.bio,
    garageEngine: mainBike.engine,
    garageRole: mainBike.role
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => {
      return {
        ...currentData,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.city.trim() === "" ||
      formData.bike.trim() === "" ||
      formData.bio.trim() === ""
    ) {
      setError("Please fill in name, city, bike, and bio.");
      return;
    }

    const updatedProfile = {
      ...profile,
      name: formData.name.trim(),
      city: formData.city.trim(),
      bike: formData.bike.trim(),
      bikeType: formData.bikeType,
      experience: formData.experience,
      ridingStyle: formData.ridingStyle.trim(),
      connectionMode: formData.connectionMode,
      available: formData.available.trim(),
      bio: formData.bio.trim(),
      lookingFor:
        formData.connectionMode === "Maybe dating"
          ? ["Riding friends", "Group rides", "Maybe dating"]
          : formData.connectionMode === "Group rides"
          ? ["Riding friends", "Group rides", "Events"]
          : ["Riding friends", "Coffee rides"],
      garage: [
        {
          id: 1,
          name: formData.bike.trim(),
          type: formData.bikeType,
          engine: formData.garageEngine.trim(),
          role: formData.garageRole.trim()
        }
      ]
    };

    setStoredProfile(updatedProfile);
    navigate("/profile");
  }

  return (
    <section className="page-section edit-profile-page">
      <div className="section-header">
        <p className="eyebrow">Edit profile</p>
        <h1>Update your biker identity.</h1>

        <p className="page-text">
          Change your city, bike, riding style, connection mode, and garage
          details.
        </p>
      </div>

      <form className="ride-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bike">Main bike *</label>
            <input
              id="bike"
              name="bike"
              type="text"
              value={formData.bike}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeType">Bike type</label>
            <select
              id="bikeType"
              name="bikeType"
              value={formData.bikeType}
              onChange={handleChange}
            >
              <option>Sport</option>
              <option>Naked</option>
              <option>Supersport</option>
              <option>Cruiser</option>
              <option>Adventure</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="connectionMode">Connection mode</label>
            <select
              id="connectionMode"
              name="connectionMode"
              value={formData.connectionMode}
              onChange={handleChange}
            >
              <option>Friends only</option>
              <option>Group rides</option>
              <option>Maybe dating</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ridingStyle">Riding style</label>
            <input
              id="ridingStyle"
              name="ridingStyle"
              type="text"
              value={formData.ridingStyle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="available">Available</label>
            <input
              id="available"
              name="available"
              type="text"
              value={formData.available}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="garageEngine">Bike engine</label>
            <input
              id="garageEngine"
              name="garageEngine"
              type="text"
              value={formData.garageEngine}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="garageRole">Bike role</label>
            <input
              id="garageRole"
              name="garageRole"
              type="text"
              value={formData.garageRole}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="bio">Bio *</label>
            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions edit-form-actions">
          <button type="submit" className="btn primary-btn">
            Save Profile
          </button>

          <Link to="/profile" className="btn secondary-btn">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default EditProfile;