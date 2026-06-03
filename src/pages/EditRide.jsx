import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";

function EditRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [createdRides, setCreatedRides] = useLocalStorage("createdRides", []);

  const ride = createdRides.find((ride) => ride.id === Number(rideId));

  const [formData, setFormData] = useState(() => {
    if (!ride) {
      return {
        title: "",
        city: "",
        route: "",
        meetingPoint: "",
        date: "",
        pace: "Chill",
        difficulty: "Beginner friendly",
        maxRiders: "8",
        bikeTypes: "",
        description: ""
      };
    }

    return {
      title: ride.title,
      city: ride.city,
      route: ride.route,
      meetingPoint: ride.meetingPoint,
      date: ride.date,
      pace: ride.pace,
      difficulty: ride.difficulty,
      maxRiders: String(ride.maxRiders),
      bikeTypes: ride.bikeTypes.join(", "),
      description: ride.description
    };
  });

  const [error, setError] = useState("");

  if (!ride) {
    return (
      <section className="page-section">
        <p className="eyebrow">Edit ride</p>
        <h1>This ride cannot be edited.</h1>

        <p className="page-text">
          Only rides created by you can be edited. Default rides are read-only.
        </p>

        <Link to="/rides" className="btn primary-btn">
          Back to Rides
        </Link>
      </section>
    );
  }

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
      formData.title.trim() === "" ||
      formData.city.trim() === "" ||
      formData.route.trim() === "" ||
      formData.meetingPoint.trim() === "" ||
      formData.date.trim() === "" ||
      formData.description.trim() === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(formData.maxRiders) < 2) {
      setError("Max riders must be at least 2.");
      return;
    }

    const updatedRide = {
      ...ride,
      title: formData.title.trim(),
      city: formData.city.trim(),
      route: formData.route.trim(),
      meetingPoint: formData.meetingPoint.trim(),
      date: formData.date.trim(),
      pace: formData.pace,
      difficulty: formData.difficulty,
      maxRiders: Number(formData.maxRiders),
      bikeTypes: formData.bikeTypes
        .split(",")
        .map((type) => type.trim())
        .filter((type) => type !== ""),
      description: formData.description.trim()
    };

    if (updatedRide.bikeTypes.length === 0) {
      updatedRide.bikeTypes = ["All bikes"];
    }

    setCreatedRides((currentRides) => {
      return currentRides.map((currentRide) => {
        if (currentRide.id === ride.id) {
          return updatedRide;
        }

        return currentRide;
      });
    });

    navigate(`/rides/${ride.id}`);
  }

  return (
    <section className="page-section create-ride-page">
      <div className="section-header">
        <p className="eyebrow">Edit ride</p>
        <h1>Update your group ride.</h1>

        <p className="page-text">
          Edit the ride details, route, meeting point, pace, difficulty, and
          bike requirements.
        </p>
      </div>

      <form className="ride-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Ride title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
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
            <label htmlFor="route">Route *</label>
            <input
              id="route"
              name="route"
              type="text"
              value={formData.route}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="meetingPoint">Meeting point *</label>
            <input
              id="meetingPoint"
              name="meetingPoint"
              type="text"
              value={formData.meetingPoint}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date / time *</label>
            <input
              id="date"
              name="date"
              type="text"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxRiders">Max riders</label>
            <input
              id="maxRiders"
              name="maxRiders"
              type="number"
              min="2"
              value={formData.maxRiders}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pace">Pace</label>
            <select
              id="pace"
              name="pace"
              value={formData.pace}
              onChange={handleChange}
            >
              <option>Very chill</option>
              <option>Chill</option>
              <option>Normal</option>
              <option>Medium / Fast</option>
              <option>Fast</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Beginner friendly</option>
              <option>Easy</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="bikeTypes">Bike types</label>
            <input
              id="bikeTypes"
              name="bikeTypes"
              type="text"
              value={formData.bikeTypes}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions edit-form-actions">
          <button type="submit" className="btn primary-btn">
            Save Changes
          </button>

          <Link to={`/rides/${ride.id}`} className="btn secondary-btn">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default EditRide;