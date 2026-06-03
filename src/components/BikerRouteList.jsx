import BikerRouteCard from "./BikerRouteCard";

function BikerRouteList({ routes = [] }) {
  return (
    <div className="biker-route-grid">
      {routes.map((route) => (
        <BikerRouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}

export default BikerRouteList;