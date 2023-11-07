import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/main';
// import UserDashboard from './UserDashboard'; // Import the UserDashboard component

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        {/* Add a route for the UserDashboard */}
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
