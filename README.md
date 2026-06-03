RideCircle

RideCircle is a biker community React app built for discovering riders, joining group rides, exploring routes, and creating real biker connections.

The idea behind the project is simple:

Find your next ride, not just your next match.

RideCircle is not designed as a normal dating app. It focuses on biker friendships, riding compatibility, group rides, routes, and optional connection modes such as friends, group rides, or maybe dating.

Live Demo

https://sonkata.github.io/ride-circle/

GitHub Repository

https://github.com/Sonkata/ride-circle

Features
Discover biker profiles
Search riders by name, city, or bike
Filter riders by bike type
Filter riders by connection mode
Save riders to LocalStorage
Saved riders page
Dynamic rider profile pages
Rider compatibility score
User profile page
Edit profile page
My Garage section
Browse upcoming rides
Search rides by title, city, route, or meeting point
Filter rides by pace and difficulty
Join and leave rides
Joined rides page
Create new rides
Edit user-created rides
Delete user-created rides
Confirmation modal before deleting
Dynamic ride details pages
Ride safety rules section
Routes page with route cards
Search and filter routes
Mock messages page
Responsive mobile navbar
LocalStorage persistence
Dark biker-style UI
GitHub Pages deployment
Tech Stack
React
Vite
React Router
JavaScript
CSS
LocalStorage
Git
GitHub Pages
Main Pages
Home

The landing page introduces the RideCircle concept, shows app stats, featured riders, rides, and routes.

Discover

The Discover page allows users to find riders by search, bike type, and connection mode.

Rider Details

Each rider has a dynamic profile page with bike information, connection mode, riding style, and compatibility score.

Saved Riders

Users can save riders and view them later from the Saved Riders page.

Rides

The Rides page shows upcoming group rides with search, pace filters, difficulty filters, join buttons, and ride details links.

Ride Details

Each ride has a detailed page with route, meeting point, pace, difficulty, joined riders, allowed bike types, and safety rules.

Create Ride

Users can create their own rides. Created rides are saved in LocalStorage and automatically appear in the Rides page.

Edit Ride

User-created rides can be edited. Default demo rides are read-only.

Joined Rides

Users can view all rides they have joined.

Routes

The Routes page shows biker route ideas with distance, difficulty, road type, best time, recommended pace, and highlights.

Profile

The Profile page shows the user's biker identity, saved riders, joined rides, created rides, and garage information.

Edit Profile

Users can edit their name, city, bike, bike type, experience, riding style, connection mode, availability, bio, and garage details.

Messages

A mock messages page showing how future biker conversations could look.

What I Learned

While building RideCircle, I practiced:

React component structure
React Router setup
Dynamic routes with URL parameters
Controlled forms
Search and filter logic
Conditional rendering
LocalStorage persistence
Reusable components
Custom hooks
CRUD-style logic
Responsive layout
Mobile navigation
GitHub Pages deployment
Building a larger portfolio-ready React project
Project Structure
src/
  components/
    BikerRouteCard.jsx
    BikerRouteList.jsx
    ConfirmModal.jsx
    FilterButtons.jsx
    Footer.jsx
    Layout.jsx
    Navbar.jsx
    RideCard.jsx
    RideList.jsx
    RiderCard.jsx
    RiderList.jsx
    SearchBox.jsx

  data/
    defaultProfile.js
    riders.js
    rides.js
    routes.js

  hooks/
    useLocalStorage.js

  pages/
    About.jsx
    BikerRoutes.jsx
    CreateRide.jsx
    Discover.jsx
    EditProfile.jsx
    EditRide.jsx
    Home.jsx
    JoinedRides.jsx
    Messages.jsx
    NotFound.jsx
    Profile.jsx
    RideDetails.jsx
    RiderDetails.jsx
    Rides.jsx
    SavedRiders.jsx

  utils/
    calculateCompatibility.js

  App.jsx
  App.css
  main.jsx
Future Improvements
Real authentication
Real database with Supabase or Firebase
Real-time chat
User image uploads
Map integration
Ride location pins
Route saving
Private/public ride settings
User-created route system
Real matching algorithm
Notifications
Mobile app version with React Native
Status

This is a portfolio-ready intermediate React project.

The current version uses mock data and LocalStorage to simulate real app behavior.