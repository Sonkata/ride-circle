import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Rides from "./pages/Rides";
import RideDetails from "./pages/RideDetails";
import JoinedRides from "./pages/JoinedRides";
import CreateRide from "./pages/CreateRide";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RiderDetails from "./pages/RiderDetails";
import SavedRiders from "./pages/SavedRiders";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/discover" element={<Discover />} />
        <Route path="/riders/:riderId" element={<RiderDetails />} />
        <Route path="/saved-riders" element={<SavedRiders />} />

        <Route path="/rides" element={<Rides />} />
        <Route path="/rides/:rideId" element={<RideDetails />} />
        <Route path="/joined-rides" element={<JoinedRides />} />
        <Route path="/create-ride" element={<CreateRide />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;