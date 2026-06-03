import RideCard from "./RideCard";

function RideList({ rides, joinedRideIds, onToggleJoin, onDeleteRide }) {
  return (
    <div className="ride-grid">
      {rides.map((ride) => (
        <RideCard
          key={ride.id}
          ride={ride}
          isJoined={joinedRideIds.includes(ride.id)}
          onToggleJoin={onToggleJoin}
          onDeleteRide={onDeleteRide}
        />
      ))}
    </div>
  );
}

export default RideList;