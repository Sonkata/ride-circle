import { Link } from "react-router-dom";

import { riders } from "../data/riders";
import RiderList from "../components/RiderList";
import useLocalStorage from "../hooks/useLocalStorage";

function SavedRiders() {
  const [savedRiderIds, setSavedRiderIds] = useLocalStorage("savedRiderIds", []);

  const savedRiders = riders.filter((rider) => savedRiderIds.includes(rider.id));

  function handleToggleSave(riderId) {
    setSavedRiderIds((currentIds) => {
      if (currentIds.includes(riderId)) {
        return currentIds.filter((id) => id !== riderId);
      }

      return [...currentIds, riderId];
    });
  }

  function handleClearSaved() {
    setSavedRiderIds([]);
  }

  return (
    <section className="page-section saved-riders-page">
      <div className="section-header">
        <p className="eyebrow">Saved riders</p>
        <h1>Your saved biker connections.</h1>

        <p className="page-text">
          Keep riders here when their bike, city, pace, or vibe matches what
          you are looking for.
        </p>
      </div>

      <div className="results-row">
        <p>
          You have <strong>{savedRiders.length}</strong> saved rider
          {savedRiders.length !== 1 ? "s" : ""}
        </p>

        {savedRiders.length > 0 && (
          <button onClick={handleClearSaved}>Clear saved</button>
        )}
      </div>

      {savedRiders.length > 0 ? (
        <RiderList
          riders={savedRiders}
          savedRiderIds={savedRiderIds}
          onToggleSave={handleToggleSave}
        />
      ) : (
        <div className="empty-state">
          <h2>No saved riders yet.</h2>
          <p>
            Go to Discover and save riders that look like good riding buddies.
          </p>

          <Link to="/discover" className="btn primary-btn">
            Discover Riders
          </Link>
        </div>
      )}
    </section>
  );
}

export default SavedRiders;