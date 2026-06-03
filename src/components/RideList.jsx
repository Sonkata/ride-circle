import RideCard from "./RideCard";

function RideList({ rides, joinedRideIds, onToggleJoin }) {
  return (
    <div className="ride-grid">
      {rides.map((ride) => (
        <RideCard
          key={ride.id}
          ride={ride}
          isJoined={joinedRideIds.includes(ride.id)}
          onToggleJoin={onToggleJoin}
        />
      ))}
    </div>
  );
}

export default RideList;