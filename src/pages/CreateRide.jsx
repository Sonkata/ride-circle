import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRide() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setSuccess("");
      return;
    }

    if (Number(formData.maxRiders) < 2) {
      setError("Max riders must be at least 2.");
      setSuccess("");
      return;
    }

    const newRide = {
      id: Date.now(),
      title: formData.title.trim(),
      city: formData.city.trim(),
      route: formData.route.trim(),
      meetingPoint: formData.meetingPoint.trim(),
      date: formData.date.trim(),
      pace: formData.pace,
      difficulty: formData.difficulty,
      joinedRiders: 1,
      maxRiders: Number(formData.maxRiders),
      bikeTypes: formData.bikeTypes
        .split(",")
        .map((type) => type.trim())
        .filter((type) => type !== ""),
      description: formData.description.trim(),
      isUserCreated: true
    };

    if (newRide.bikeTypes.length === 0) {
      newRide.bikeTypes = ["All bikes"];
    }

    const savedRides = localStorage.getItem("createdRides");
    const currentCreatedRides = savedRides ? JSON.parse(savedRides) : [];

    const updatedCreatedRides = [newRide, ...currentCreatedRides];

    localStorage.setItem("createdRides", JSON.stringify(updatedCreatedRides));

    setError("");
    setSuccess("Ride created successfully. Redirecting to rides...");

    setFormData({
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
    });

    setTimeout(() => {
      navigate("/rides");
    }, 800);
  }

  return (
    <section className="page-section create-ride-page">
      <div className="section-header">
        <p className="eyebrow">Create ride</p>
        <h1>Plan a new group ride.</h1>

        <p className="page-text">
          Add a ride with city, meeting point, route, pace, difficulty, and
          allowed bike types. For now, the ride is saved in LocalStorage.
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
              placeholder="Example: Night Ride in Pleven"
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
              placeholder="Example: Pleven"
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
              placeholder="Example: Pleven → Kaylaka → Pleven"
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
              placeholder="Example: OMV Pleven"
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
              placeholder="Example: Saturday, 18:00"
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
              placeholder="Example: 125cc, Sport, Naked"
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
              placeholder="Describe the ride, pace, rules, and who it is good for..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <div className="form-actions">
          <button type="submit" className="btn primary-btn">
            Create Ride
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateRide;