import RiderCard from "./RiderCard";

function RiderList({ riders = [], savedRiderIds = [], onToggleSave }) {
  return (
    <div className="rider-grid">
      {riders.map((rider) => (
        <RiderCard
          key={rider.id}
          rider={rider}
          isSaved={savedRiderIds.includes(rider.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

export default RiderList;